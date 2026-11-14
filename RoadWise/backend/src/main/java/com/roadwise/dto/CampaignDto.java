package com.roadwise.dto;

import com.roadwise.entity.*;
import java.time.LocalDate;

public record CampaignDto(Long id, String title, String description, LocalDate startDate, LocalDate endDate, CampaignCategory category, String posterPath, String status) {
    /** Status is worked out from the dates so it can never go stale. */
    public static CampaignDto from(AwarenessCampaign c, LocalDate today) {
        String status = today.isBefore(c.getStartDate()) ? "UPCOMING" : today.isAfter(c.getEndDate()) ? "COMPLETED" : "ONGOING";
        return new CampaignDto(c.getId(), c.getTitle(), c.getDescription(), c.getStartDate(), c.getEndDate(), c.getCategory(), c.getPosterPath(), status);
    }
}
