package com.roadwise.controller;

import com.roadwise.dto.*;
import com.roadwise.service.SignService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api")
public class SignController {
    private final SignService service;
    public SignController(SignService service) { this.service = service; }

    @GetMapping("/signs") public List<SignDto> all(@RequestParam(required = false) String category, @RequestParam(required = false) String search) { return service.list(category, search); }
    @GetMapping("/signs/{id}") public SignDto one(@PathVariable Long id) { return service.get(id); }
    @GetMapping("/signs/category/{category}") public List<SignDto> byCategory(@PathVariable String category) { return service.list(category, null); }

    @PostMapping("/admin/signs") @ResponseStatus(HttpStatus.CREATED) public SignDto create(@Valid @RequestBody SignRequest r) { return service.create(r); }
    @PutMapping("/admin/signs/{id}") public SignDto update(@PathVariable Long id, @Valid @RequestBody SignRequest r) { return service.update(id, r); }
    @DeleteMapping("/admin/signs/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
