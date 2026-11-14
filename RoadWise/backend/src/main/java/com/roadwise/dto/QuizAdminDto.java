package com.roadwise.dto;

import com.roadwise.entity.*;
import java.util.List;

/** Admin-only view that includes the answer key. */
public record QuizAdminDto(Long id, String question, QuizCategory category, Difficulty difficulty, List<String> options, int correctOption, String explanation) {
    public static QuizAdminDto from(QuizQuestion q) {
        return new QuizAdminDto(q.getId(), q.getQuestionText(), q.getCategory(), q.getDifficulty(), q.getOptions().stream().map(QuizOption::getText).toList(), q.getCorrectOption(), q.getExplanation());
    }
}
