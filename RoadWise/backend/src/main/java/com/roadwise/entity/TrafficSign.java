package com.roadwise.entity;

import jakarta.persistence.*;

@Entity @Table(name = "traffic_signs")
public class TrafficSign {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 80) private String name;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 20) private SignCategory category;
    @Column(nullable = false, length = 500) private String description;
    @Column(name = "image_path", nullable = false, length = 255) private String imagePath;
    @Column(name = "safety_instruction", nullable = false, length = 500) private String safetyInstruction;

    public Long getId() { return id; }
    public String getName() { return name; } public void setName(String v) { name = v; }
    public SignCategory getCategory() { return category; } public void setCategory(SignCategory v) { category = v; }
    public String getDescription() { return description; } public void setDescription(String v) { description = v; }
    public String getImagePath() { return imagePath; } public void setImagePath(String v) { imagePath = v; }
    public String getSafetyInstruction() { return safetyInstruction; } public void setSafetyInstruction(String v) { safetyInstruction = v; }
}
