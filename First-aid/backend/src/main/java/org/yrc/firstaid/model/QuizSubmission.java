package org.yrc.firstaid.model;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/** What the browser sends when a learner finishes the quiz. */
public record QuizSubmission(@NotEmpty @Valid List<Answer> answers) {

    public record Answer(@NotBlank String questionId, @Min(0) @Max(3) int selected) {
    }
}
