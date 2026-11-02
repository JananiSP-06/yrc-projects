package org.yrc.firstaid.controller;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.yrc.firstaid.model.QuizQuestion;
import org.yrc.firstaid.model.QuizResult;
import org.yrc.firstaid.model.QuizSubmission;
import org.yrc.firstaid.service.ContentService;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final ContentService content;

    public QuizController(ContentService content) {
        this.content = content;
    }

    @GetMapping
    public List<QuizQuestion> questions() {
        return content.questions();
    }

    @PostMapping("/submit")
    public QuizResult submit(@Valid @RequestBody QuizSubmission submission) {
        return content.score(submission);
    }
}
