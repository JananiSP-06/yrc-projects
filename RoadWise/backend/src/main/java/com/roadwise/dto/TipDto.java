package com.roadwise.dto;

import com.roadwise.entity.*;

public record TipDto(Long id, String title, String description, TipCategory category, String imagePath) {
    public static TipDto from(SafetyTip t) { return new TipDto(t.getId(), t.getTitle(), t.getDescription(), t.getCategory(), t.getImagePath()); }
}
