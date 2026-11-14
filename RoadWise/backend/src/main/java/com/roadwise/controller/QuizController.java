package com.roadwise.controller;

import com.roadwise.dto.*;
import com.roadwise.service.QuizService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api")
public class QuizController {
    private final QuizService service;
    public QuizController(QuizService service) { this.service = service; }

    @GetMapping("/quizzes") public List<QuizQuestionDto> all(@RequestParam(required = false) String category, @RequestParam(required = false) String difficulty, @RequestParam(required = false) Integer limit) { return service.list(category, difficulty, limit); }
    @GetMapping("/quizzes/{id}") public QuizQuestionDto one(@PathVariable Long id) { return service.get(id); }
    @GetMapping("/quizzes/category/{category}") public List<QuizQuestionDto> byCategory(@PathVariable String category, @RequestParam(required = false) String difficulty, @RequestParam(required = false) Integer limit) { return service.list(category, difficulty, limit); }
    @PostMapping("/quizzes/submit") public QuizResultDto submit(@Valid @RequestBody QuizSubmission body) { return service.submit(body); }

    @GetMapping("/admin/quizzes") public List<QuizAdminDto> adminAll() { return service.adminList(); }
    @GetMapping("/admin/quizzes/{id}") public QuizAdminDto adminOne(@PathVariable Long id) { return service.adminGet(id); }
    @PostMapping("/admin/quizzes") @ResponseStatus(HttpStatus.CREATED) public QuizAdminDto create(@Valid @RequestBody QuizRequest r) { return service.create(r); }
    @PutMapping("/admin/quizzes/{id}") public QuizAdminDto update(@PathVariable Long id, @Valid @RequestBody QuizRequest r) { return service.update(id, r); }
    @DeleteMapping("/admin/quizzes/{id}") @ResponseStatus(HttpStatus.NO_CONTENT) public void delete(@PathVariable Long id) { service.delete(id); }
}
