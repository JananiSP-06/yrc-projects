package com.roadwise.service;

import com.roadwise.dto.*;
import com.roadwise.entity.*;
import com.roadwise.exception.*;
import com.roadwise.repository.SafetyTipRepository;
import com.roadwise.util.EnumParser;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Transactional(readOnly = true)
public class TipService {
    private final SafetyTipRepository repo;
    public TipService(SafetyTipRepository repo) { this.repo = repo; }

    public List<TipDto> list(String category) {
        TipCategory c = EnumParser.parse(TipCategory.class, category);
        return (c == null ? repo.findAllByOrderByIdAsc() : repo.findByCategoryOrderByIdAsc(c)).stream().map(TipDto::from).toList();
    }
    public TipDto random() {
        long n = repo.count(); if (n == 0) throw new ResourceNotFoundException("No safety tips are available yet");
        return repo.findAll(PageRequest.of((int) ThreadLocalRandom.current().nextLong(n), 1, Sort.by("id"))).stream().findFirst().map(TipDto::from).orElseThrow(() -> new ResourceNotFoundException("No safety tips are available yet"));
    }
    @Transactional public TipDto create(TipRequest r) { SafetyTip t = new SafetyTip(); apply(t, r); return TipDto.from(repo.save(t)); }
    @Transactional public TipDto update(Long id, TipRequest r) { SafetyTip t = find(id); apply(t, r); return TipDto.from(repo.save(t)); }
    @Transactional public void delete(Long id) { repo.delete(find(id)); }

    private SafetyTip find(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Safety tip", id)); }
    private void apply(SafetyTip t, TipRequest r) {
        t.setTitle(r.title().trim()); t.setDescription(r.description().trim()); t.setCategory(EnumParser.require(TipCategory.class, r.category()));
        t.setImagePath(r.imagePath() == null || r.imagePath().isBlank() ? null : r.imagePath().trim());
    }
}
