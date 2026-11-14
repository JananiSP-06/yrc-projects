package com.roadwise.service;

import com.roadwise.dto.*;
import com.roadwise.entity.*;
import com.roadwise.exception.*;
import com.roadwise.repository.TrafficSignRepository;
import com.roadwise.util.EnumParser;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Transactional(readOnly = true)
public class SignService {
    private final TrafficSignRepository repo;
    public SignService(TrafficSignRepository repo) { this.repo = repo; }

    public List<SignDto> list(String category, String search) {
        SignCategory c = EnumParser.parse(SignCategory.class, category);
        boolean hasSearch = search != null && !search.isBlank();
        List<TrafficSign> r = c != null && hasSearch ? repo.findByCategoryAndNameContainingIgnoreCaseOrderByNameAsc(c, search.trim())
            : c != null ? repo.findByCategoryOrderByNameAsc(c)
            : hasSearch ? repo.findByNameContainingIgnoreCaseOrderByNameAsc(search.trim()) : repo.findAllByOrderByNameAsc();
        return r.stream().map(SignDto::from).toList();
    }
    public SignDto get(Long id) { return SignDto.from(find(id)); }

    @Transactional public SignDto create(SignRequest r) {
        if (repo.existsByNameIgnoreCase(r.name().trim())) throw new ConflictException("A sign named '" + r.name() + "' already exists");
        TrafficSign s = new TrafficSign(); apply(s, r); return SignDto.from(repo.save(s));
    }
    @Transactional public SignDto update(Long id, SignRequest r) {
        TrafficSign s = find(id);
        if (repo.existsByNameIgnoreCaseAndIdNot(r.name().trim(), id)) throw new ConflictException("A sign named '" + r.name() + "' already exists");
        apply(s, r); return SignDto.from(repo.save(s));
    }
    @Transactional public void delete(Long id) { repo.delete(find(id)); }

    private TrafficSign find(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Traffic sign", id)); }
    private void apply(TrafficSign s, SignRequest r) {
        s.setName(r.name().trim()); s.setCategory(EnumParser.require(SignCategory.class, r.category())); s.setDescription(r.description().trim());
        s.setImagePath(r.imagePath().trim()); s.setSafetyInstruction(r.safetyInstruction().trim());
    }
}
