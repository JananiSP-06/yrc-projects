package com.roadwise.dto;

import jakarta.validation.constraints.*;

public record TipRequest(
    @NotBlank @Size(max = 120) String title,
    @NotBlank @Size(max = 500) String description,
    @NotBlank String category,
    @Size(max = 255) @Pattern(regexp = "^[A-Za-z0-9/_.\\-]*$", message = "must be a simple file path") String imagePath) { }
