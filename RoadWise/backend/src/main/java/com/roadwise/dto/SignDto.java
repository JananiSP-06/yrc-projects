package com.roadwise.dto;

import com.roadwise.entity.*;

public record SignDto(Long id, String name, SignCategory category, String description, String imagePath, String safetyInstruction) {
    public static SignDto from(TrafficSign s) { return new SignDto(s.getId(), s.getName(), s.getCategory(), s.getDescription(), s.getImagePath(), s.getSafetyInstruction()); }
}
