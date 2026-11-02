package org.yrc.firstaid.model;

import java.util.List;

public record QuizResult(int score, int total, List<String> topicsToReview) {
}
