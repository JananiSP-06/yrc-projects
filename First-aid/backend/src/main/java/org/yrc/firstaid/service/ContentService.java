package org.yrc.firstaid.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.yrc.firstaid.model.Guide;
import org.yrc.firstaid.model.QuizQuestion;
import org.yrc.firstaid.model.QuizResult;
import org.yrc.firstaid.model.QuizSubmission;

/**
 * Loads the guides and quiz from JSON files on the classpath (src/main/resources/data)
 * and scores quiz submissions. Edit the JSON files to change the content.
 */
@Service
public class ContentService {

    private final List<Guide> guides;
    private final Map<String, Guide> guidesById = new LinkedHashMap<>();
    private final List<QuizQuestion> questions;
    private final Map<String, QuizQuestion> questionsById = new LinkedHashMap<>();

    public ContentService(ObjectMapper mapper) throws IOException {
        this.guides = read(mapper, "data/guides.json", new TypeReference<List<Guide>>() { });
        this.questions = read(mapper, "data/quiz.json", new TypeReference<List<QuizQuestion>>() { });
        guides.forEach(g -> guidesById.put(g.id(), g));
        questions.forEach(q -> questionsById.put(q.id(), q));
        validate();
    }

    private static <T> T read(ObjectMapper mapper, String path, TypeReference<T> type) throws IOException {
        try (InputStream in = new ClassPathResource(path).getInputStream()) {
            return mapper.readValue(in, type);
        }
    }

    /** Fails fast at start-up if the content files contain mistakes. */
    private void validate() {
        for (Guide g : guides) {
            if (g.steps() == null || g.steps().isEmpty()) {
                throw new IllegalStateException("Guide " + g.id() + " has no steps");
            }
        }
        for (QuizQuestion q : questions) {
            if (q.options() == null || q.options().size() != 4) {
                throw new IllegalStateException("Question " + q.id() + " must have exactly 4 options");
            }
            if (q.correct() < 0 || q.correct() >= q.options().size()) {
                throw new IllegalStateException("Question " + q.id() + " has an invalid correct index");
            }
            if (!guidesById.containsKey(q.topic())) {
                throw new IllegalStateException("Question " + q.id() + " refers to unknown topic " + q.topic());
            }
        }
    }

    public List<Guide> guides() {
        return guides;
    }

    public Optional<Guide> guide(String id) {
        return Optional.ofNullable(guidesById.get(id));
    }

    public List<QuizQuestion> questions() {
        return questions;
    }

    /**
     * Scores a submission. Throws IllegalArgumentException for unknown or duplicate question ids.
     */
    public QuizResult score(QuizSubmission submission) {
        Set<String> seen = new HashSet<>();
        Set<String> missedTopics = new LinkedHashSet<>();
        int score = 0;
        for (QuizSubmission.Answer a : submission.answers()) {
            QuizQuestion q = questionsById.get(a.questionId());
            if (q == null) {
                throw new IllegalArgumentException("Unknown question: " + a.questionId());
            }
            if (!seen.add(a.questionId())) {
                throw new IllegalArgumentException("Duplicate answer for question: " + a.questionId());
            }
            if (q.correct() == a.selected()) {
                score++;
            } else {
                missedTopics.add(q.topic());
            }
        }
        return new QuizResult(score, submission.answers().size(), new ArrayList<>(missedTopics));
    }
}
