package com.roadwise.util;

/** Pure scoring helpers, kept free of Spring so they are easy to unit test. */
public final class ScoreCalculator {
    private ScoreCalculator() { }

    public static int percentage(int correct, int total) { return total <= 0 ? 0 : Math.round(correct * 100f / total); }

    public static String message(int percentage) {
        if (percentage >= 90) return "Road Safety Champion! Superb work.";
        if (percentage >= 70) return "Great job! You know your road safety.";
        if (percentage >= 50) return "Good start. Review the lessons and try again.";
        return "Keep learning. Every try makes you safer.";
    }
}
