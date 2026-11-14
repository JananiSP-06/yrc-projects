package com.roadwise.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record CampaignRequest(
    @NotBlank @Size(max = 150) String title,
    @NotBlank @Size(max = 1000) String description,
    @NotNull LocalDate startDate,
    @NotNull LocalDate endDate,
    @NotBlank String category,
    @Size(max = 255) @Pattern(regexp = "^[A-Za-z0-9/_.\\-]*$", message = "must be a simple file path") String posterPath) { }
