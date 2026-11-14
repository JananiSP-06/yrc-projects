package com.roadwise.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record QuizSubmission(@NotEmpty @Size(max = 50) List<@Valid Answer> answers) {
    public record Answer(@NotNull Long questionId, @NotNull @Min(0) Integer selectedOption) { }
}
