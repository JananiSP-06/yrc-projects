package com.roadwise.dto;

import jakarta.validation.constraints.*;

public record SignRequest(
    @NotBlank @Size(max = 80) String name,
    @NotBlank String category,
    @NotBlank @Size(max = 500) String description,
    @NotBlank @Size(max = 255) @Pattern(regexp = "^[A-Za-z0-9/_.\\-]+$", message = "must be a simple file path") String imagePath,
    @NotBlank @Size(max = 500) String safetyInstruction) { }
