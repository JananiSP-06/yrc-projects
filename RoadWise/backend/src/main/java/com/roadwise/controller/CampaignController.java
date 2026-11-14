package com.roadwise.controller;

import com.roadwise.dto.*;
import com.roadwise.service.CampaignService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api")
public class CampaignController {
    private final CampaignService service;
    public CampaignController(CampaignService service) { this.service = service; }

    @GetMapping("/campaigns") public List<CampaignDto> all() { return service.list(); }
    @GetMapping("/campaigns/upcoming") public List<CampaignDto> upcoming() { return service.upcoming(); }

    @PostMapping("/admin/campaigns") @ResponseStatus(HttpStatus.CREATED) public CampaignDto create(@Valid @RequestBody CampaignRequest r) { return service.create(r); }
    @PutMapping("/admin/campaigns/{id}") public CampaignDto update(@PathVariable Long id, @Valid @RequestBody CampaignRequest r) { return service.update(id, r); }
    @DeleteMapping("/admin/campaigns/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
