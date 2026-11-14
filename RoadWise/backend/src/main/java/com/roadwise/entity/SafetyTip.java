package com.roadwise.entity;

import jakarta.persistence.*;

@Entity @Table(name = "safety_tips")
public class SafetyTip {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 120) private String title;
    @Column(nullable = false, length = 500) private String description;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private TipCategory category;
    @Column(name = "image_path", length = 255) private String imagePath;

    public Long getId() { return id; }
    public String getTitle() { return title; } public void setTitle(String v) { title = v; }
    public String getDescription() { return description; } public void setDescription(String v) { description = v; }
    public TipCategory getCategory() { return category; } public void setCategory(TipCategory v) { category = v; }
    public String getImagePath() { return imagePath; } public void setImagePath(String v) { imagePath = v; }
}
