package com.roadwise.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "pledges")
public class Pledge {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "visitor_id", nullable = false, unique = true, length = 36) private String visitorId;
    @Column(name = "pledged_at", nullable = false) private LocalDateTime pledgedAt;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 10) private PledgeStatus status = PledgeStatus.TAKEN;

    protected Pledge() { }
    public Pledge(String visitorId, LocalDateTime pledgedAt) { this.visitorId = visitorId; this.pledgedAt = pledgedAt; }
    public Long getId() { return id; }
    public String getVisitorId() { return visitorId; }
    public LocalDateTime getPledgedAt() { return pledgedAt; }
    public PledgeStatus getStatus() { return status; }
}
