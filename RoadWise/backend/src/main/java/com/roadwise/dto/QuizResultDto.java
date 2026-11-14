package com.roadwise.dto;

import java.util.List;

public record QuizResultDto(int total, int correct, int incorrect, int percentage, String message, List<Detail> details) {
    public record Detail(Long questionId, int selectedOption, boolean correct, int correctOption, String explanation) { }
}
