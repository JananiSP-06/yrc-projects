package com.roadwise.entity;

import jakarta.persistence.*;

@Entity @Table(name = "quiz_options")
public class QuizOption {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY, optional = false) @JoinColumn(name = "question_id", nullable = false) private QuizQuestion question;
    @Column(nullable = false) private int position;
    @Column(name = "option_text", nullable = false, length = 200) private String text;

    protected QuizOption() { }
    public QuizOption(QuizQuestion question, int position, String text) { this.question = question; this.position = position; this.text = text; }
    public Long getId() { return id; }
    public int getPosition() { return position; }
    public String getText() { return text; } public void setText(String v) { text = v; }
}
