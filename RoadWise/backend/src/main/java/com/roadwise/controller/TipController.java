package com.roadwise.controller;

import com.roadwise.dto.*;
import com.roadwise.service.TipService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api")
public class TipController {
    private final TipService service;
    public TipController(TipService service) { this.service = service; }

    @GetMapping("/tips") public List<TipDto> all(@RequestParam(required = false) String category) { return service.list(category); }
    @GetMapping("/tips/random") public TipDto random() { return service.random(); }
    @GetMapping("/tips/category/{category}") public List<TipDto> byCategory(@PathVariable String category) { return service.list(category); }

    @PostMapping("/admin/tips") @ResponseStatus(HttpStatus.CREATED) public TipDto create(@Valid @RequestBody TipRequest r) { return service.create(r); }
    @PutMapping("/admin/tips/{id}") public TipDto update(@PathVariable Long id, @Valid @RequestBody TipRequest r) { return service.update(id, r); }
    @DeleteMapping("/admin/tips/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
