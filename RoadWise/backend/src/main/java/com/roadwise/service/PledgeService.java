package com.roadwise.service;

import com.roadwise.dto.PledgeResponse;
import com.roadwise.entity.Pledge;
import com.roadwise.repository.PledgeRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

@Service
public class PledgeService {
    private final PledgeRepository repo;
    public PledgeService(PledgeRepository repo) { this.repo = repo; }

    /** Records one pledge per anonymous visitor id. Sending the same id again is safe and returns the original pledge. */
    public PledgeResponse take(String visitorId) {
        String id = (visitorId == null || visitorId.isBlank()) ? UUID.randomUUID().toString() : visitorId.toLowerCase();
        Optional<Pledge> existing = repo.findByVisitorId(id);
        if (existing.isPresent()) return respond(existing.get(), true);
        try { return respond(repo.saveAndFlush(new Pledge(id, LocalDateTime.now())), false); }
        catch (DataIntegrityViolationException race) { return respond(repo.findByVisitorId(id).orElseThrow(() -> race), true); }
    }
    public long count() { return repo.count(); }
    private PledgeResponse respond(Pledge p, boolean again) { return new PledgeResponse(p.getVisitorId(), p.getPledgedAt(), again, repo.count()); }
}
