package com.roadwise.controller;

import com.roadwise.dto.*;
import com.roadwise.service.PledgeService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/pledges")
public class PledgeController {
    private final PledgeService service;
    public PledgeController(PledgeService service) { this.service = service; }

    @PostMapping public ResponseEntity<PledgeResponse> take(@Valid @RequestBody(required = false) PledgeRequest body) {
        PledgeResponse r = service.take(body == null ? null : body.visitorId());
        return ResponseEntity.status(r.alreadyPledged() ? HttpStatus.OK : HttpStatus.CREATED).body(r);
    }
    @GetMapping("/count") public Map<String, Long> count() { return Map.of("total", service.count()); }
}
