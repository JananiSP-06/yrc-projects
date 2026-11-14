package com.roadwise.dto;

import jakarta.validation.constraints.*;
import java.util.List;

public record QuizRequest(
    @NotBlank @Size(max = 500) String question,
    @NotBlank String category,
    @NotBlank String difficulty,
    @NotNull @Size(min = 2, max = 6, message = "must have 2 to 6 options") List<@NotBlank @Size(max = 200) String> options,
    @NotNull @Min(0) Integer correctOption,
    @NotBlank @Size(max = 500) String explanation) { }
