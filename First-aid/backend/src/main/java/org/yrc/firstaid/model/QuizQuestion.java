package org.yrc.firstaid.model;

import java.util.List;

public record QuizQuestion(
        String id,
        String topic,
        String scenario,
        String scene,
        List<String> options,
        int correct,
        String explanation,
        String feedbackScene) {
}
