package com.roadwise.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity @Table(name = "awareness_campaigns")
public class AwarenessCampaign {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 150) private String title;
    @Column(nullable = false, length = 1000) private String description;
    @Column(name = "start_date", nullable = false) private LocalDate startDate;
    @Column(name = "end_date", nullable = false) private LocalDate endDate;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 30) private CampaignCategory category;
    @Column(name = "poster_path", length = 255) private String posterPath;

    public Long getId() { return id; }
    public String getTitle() { return title; } public void setTitle(String v) { title = v; }
    public String getDescription() { return description; } public void setDescription(String v) { description = v; }
    public LocalDate getStartDate() { return startDate; } public void setStartDate(LocalDate v) { startDate = v; }
    public LocalDate getEndDate() { return endDate; } public void setEndDate(LocalDate v) { endDate = v; }
    public CampaignCategory getCategory() { return category; } public void setCategory(CampaignCategory v) { category = v; }
    public String getPosterPath() { return posterPath; } public void setPosterPath(String v) { posterPath = v; }
}
