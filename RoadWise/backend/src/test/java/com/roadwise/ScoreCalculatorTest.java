package com.roadwise;

import static org.junit.jupiter.api.Assertions.*;

import com.roadwise.util.ScoreCalculator;
import org.junit.jupiter.api.Test;

class ScoreCalculatorTest {
    @Test void percentageRoundsAndHandlesZero() {
        assertEquals(0, ScoreCalculator.percentage(0, 0)); assertEquals(100, ScoreCalculator.percentage(5, 5));
        assertEquals(67, ScoreCalculator.percentage(2, 3)); assertEquals(0, ScoreCalculator.percentage(0, 4));
    }
    @Test void messagesFollowThresholds() {
        assertTrue(ScoreCalculator.message(90).startsWith("Road Safety Champion")); assertTrue(ScoreCalculator.message(70).startsWith("Great"));
        assertTrue(ScoreCalculator.message(50).startsWith("Good start")); assertTrue(ScoreCalculator.message(49).startsWith("Keep learning"));
    }
}
