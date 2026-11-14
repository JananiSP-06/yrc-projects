package com.roadwise.service;

import com.roadwise.dto.*;
import com.roadwise.entity.*;
import com.roadwise.exception.*;
import com.roadwise.repository.QuizQuestionRepository;
import com.roadwise.util.*;
import java.util.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Transactional(readOnly = true)
public class QuizService {
    private final QuizQuestionRepository repo;
    public QuizService(QuizQuestionRepository repo) { this.repo = repo; }

    /** Questions for visitors. Optional filters and a random sample of "limit" questions. */
    public List<QuizQuestionDto> list(String category, String difficulty, Integer limit) {
        QuizCategory c = EnumParser.parse(QuizCategory.class, category); Difficulty d = EnumParser.parse(Difficulty.class, difficulty);
        if (limit != null && (limit < 1 || limit > 50)) throw new BadRequestException("limit must be between 1 and 50");
        List<QuizQuestion> all = c != null && d != null ? repo.findByCategoryAndDifficulty(c, d) : c != null ? repo.findByCategory(c) : d != null ? repo.findByDifficulty(d) : repo.findAll();
        List<QuizQuestion> pool = new ArrayList<>(all);
        if (limit != null) { Collections.shuffle(pool); pool = pool.subList(0, Math.min(limit, pool.size())); }
        return pool.stream().map(QuizQuestionDto::from).toList();
    }
    public QuizQuestionDto get(Long id) { return QuizQuestionDto.from(find(id)); }

    /** Marks the answers on the server. The answer key is only revealed here, after the visitor submits. */
    public QuizResultDto submit(QuizSubmission sub) {
        List<Long> ids = sub.answers().stream().map(QuizSubmission.Answer::questionId).toList();
        if (new HashSet<>(ids).size() != ids.size()) throw new BadRequestException("Each question can be answered only once");
        Map<Long, QuizQuestion> byId = new HashMap<>();
        repo.findAllWithOptionsByIdIn(ids).forEach(q -> byId.put(q.getId(), q));
        List<Long> missing = ids.stream().filter(i -> !byId.containsKey(i)).toList();
        if (!missing.isEmpty()) throw new BadRequestException("Unknown question ids: " + missing);
        List<QuizResultDto.Detail> details = new ArrayList<>(); int correct = 0;
        for (QuizSubmission.Answer a : sub.answers()) {
            QuizQuestion q = byId.get(a.questionId());
            if (a.selectedOption() >= q.getOptions().size()) throw new BadRequestException("Question " + q.getId() + " has only " + q.getOptions().size() + " options");
            boolean ok = a.selectedOption() == q.getCorrectOption(); if (ok) correct++;
            details.add(new QuizResultDto.Detail(q.getId(), a.selectedOption(), ok, q.getCorrectOption(), q.getExplanation()));
        }
        int total = details.size(), pct = ScoreCalculator.percentage(correct, total);
        return new QuizResultDto(total, correct, total - correct, pct, ScoreCalculator.message(pct), details);
    }

    public QuizAdminDto adminGet(Long id) { return QuizAdminDto.from(find(id)); }
    public List<QuizAdminDto> adminList() { return repo.findAll().stream().map(QuizAdminDto::from).toList(); }
    @Transactional public QuizAdminDto create(QuizRequest r) { QuizQuestion q = new QuizQuestion(); apply(q, r); return QuizAdminDto.from(repo.save(q)); }
    @Transactional public QuizAdminDto update(Long id, QuizRequest r) { QuizQuestion q = find(id); apply(q, r); return QuizAdminDto.from(repo.save(q)); }
    @Transactional public void delete(Long id) { repo.delete(find(id)); }

    private QuizQuestion find(Long id) { return repo.findWithOptionsById(id).orElseThrow(() -> new ResourceNotFoundException("Quiz question", id)); }
    private void apply(QuizQuestion q, QuizRequest r) {
        if (r.correctOption() >= r.options().size()) throw new BadRequestException("correctOption must be a position between 0 and " + (r.options().size() - 1));
        if (new HashSet<>(r.options().stream().map(String::trim).toList()).size() != r.options().size()) throw new BadRequestException("Options must be different from each other");
        q.setQuestionText(r.question().trim()); q.setCategory(EnumParser.require(QuizCategory.class, r.category()));
        q.setDifficulty(EnumParser.require(Difficulty.class, r.difficulty())); q.setCorrectOption(r.correctOption());
        q.setExplanation(r.explanation().trim()); q.replaceOptions(r.options().stream().map(String::trim).toList());
    }
}
