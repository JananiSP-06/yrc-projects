package com.roadwise.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity @Table(name = "users")
public class AppUser {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, unique = true, length = 50) private String username;
    @Column(name = "password_hash", nullable = false, length = 100) private String passwordHash;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 10) private Role role;
    @Column(name = "created_at", nullable = false) private LocalDateTime createdAt;

    protected AppUser() { }
    public AppUser(String username, String passwordHash, Role role) { this.username = username; this.passwordHash = passwordHash; this.role = role; this.createdAt = LocalDateTime.now(); }
    public Long getId() { return id; }
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public Role getRole() { return role; }
}
