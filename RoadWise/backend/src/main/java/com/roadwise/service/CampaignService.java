package com.roadwise.service;

import com.roadwise.dto.*;
import com.roadwise.entity.*;
import com.roadwise.exception.*;
import com.roadwise.repository.AwarenessCampaignRepository;
import com.roadwise.util.EnumParser;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service @Transactional(readOnly = true)
public class CampaignService {
    private final AwarenessCampaignRepository repo;
    public CampaignService(AwarenessCampaignRepository repo) { this.repo = repo; }

    public List<CampaignDto> list() { LocalDate t = LocalDate.now(); return repo.findAllByOrderByStartDateDesc().stream().map(c -> CampaignDto.from(c, t)).toList(); }
    public List<CampaignDto> upcoming() { LocalDate t = LocalDate.now(); return repo.findByStartDateGreaterThanEqualOrderByStartDateAsc(t).stream().map(c -> CampaignDto.from(c, t)).toList(); }
    @Transactional public CampaignDto create(CampaignRequest r) { AwarenessCampaign c = new AwarenessCampaign(); apply(c, r); return CampaignDto.from(repo.save(c), LocalDate.now()); }
    @Transactional public CampaignDto update(Long id, CampaignRequest r) { AwarenessCampaign c = find(id); apply(c, r); return CampaignDto.from(repo.save(c), LocalDate.now()); }
    @Transactional public void delete(Long id) { repo.delete(find(id)); }

    private AwarenessCampaign find(Long id) { return repo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Campaign", id)); }
    private void apply(AwarenessCampaign c, CampaignRequest r) {
        if (r.endDate().isBefore(r.startDate())) throw new BadRequestException("endDate cannot be before startDate");
        c.setTitle(r.title().trim()); c.setDescription(r.description().trim()); c.setStartDate(r.startDate()); c.setEndDate(r.endDate());
        c.setCategory(EnumParser.require(CampaignCategory.class, r.category())); c.setPosterPath(r.posterPath() == null || r.posterPath().isBlank() ? null : r.posterPath().trim());
    }
}
