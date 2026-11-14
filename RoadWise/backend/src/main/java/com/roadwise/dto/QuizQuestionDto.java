package com.roadwise.dto;

import com.roadwise.entity.*;
import java.util.List;

/** Public view of a question. It deliberately has no correct answer and no explanation. */
public record QuizQuestionDto(Long id, String question, QuizCategory category, Difficulty difficulty, List<String> options) {
    public static QuizQuestionDto from(QuizQuestion q) {
        return new QuizQuestionDto(q.getId(), q.getQuestionText(), q.getCategory(), q.getDifficulty(), q.getOptions().stream().map(QuizOption::getText).toList());
    }
}
