package com.roadwise.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity @Table(name = "quiz_questions")
public class QuizQuestion {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(name = "question_text", nullable = false, length = 500) private String questionText;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 30) private QuizCategory category;
    @Enumerated(EnumType.STRING) @Column(nullable = false, length = 10) private Difficulty difficulty;
    @Column(name = "correct_option", nullable = false) private int correctOption;
    @Column(nullable = false, length = 500) private String explanation;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position ASC")
    private List<QuizOption> options = new ArrayList<>();

    public Long getId() { return id; }
    public String getQuestionText() { return questionText; } public void setQuestionText(String v) { questionText = v; }
    public QuizCategory getCategory() { return category; } public void setCategory(QuizCategory v) { category = v; }
    public Difficulty getDifficulty() { return difficulty; } public void setDifficulty(Difficulty v) { difficulty = v; }
    public int getCorrectOption() { return correctOption; } public void setCorrectOption(int v) { correctOption = v; }
    public String getExplanation() { return explanation; } public void setExplanation(String v) { explanation = v; }
    public List<QuizOption> getOptions() { return options; }

    /** Replaces option texts in place so the unique (question, position) key is never violated. */
    public void replaceOptions(List<String> texts) {
        for (int i = 0; i < texts.size(); i++) {
            if (i < options.size()) options.get(i).setText(texts.get(i));
            else options.add(new QuizOption(this, i, texts.get(i)));
        }
        while (options.size() > texts.size()) options.remove(options.size() - 1);
    }
}
