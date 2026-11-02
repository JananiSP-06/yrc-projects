package org.yrc.firstaid;

import static org.hamcrest.Matchers.contains;
import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.stream.Collectors;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.yrc.firstaid.model.QuizQuestion;
import org.yrc.firstaid.service.ContentService;

@SpringBootTest
@AutoConfigureMockMvc
class ApiTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    ContentService content;

    @Test
    void listsSixGuidesWithFiveStepsEach() throws Exception {
        mvc.perform(get("/api/guides"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(6)))
                .andExpect(jsonPath("$[*].id", contains("burns", "bleeding", "choking", "fainting", "snake-bites", "fractures")))
                .andExpect(jsonPath("$[0].steps", hasSize(5)))
                .andExpect(jsonPath("$[0].steps[1].id").value("burns-2"));
    }

    @Test
    void returnsOneGuide() throws Exception {
        mvc.perform(get("/api/guides/choking"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Choking"));
    }

    @Test
    void unknownGuideIs404() throws Exception {
        mvc.perform(get("/api/guides/nope")).andExpect(status().isNotFound());
    }

    @Test
    void returnsTwelveQuizQuestions() throws Exception {
        mvc.perform(get("/api/quiz"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(12)))
                .andExpect(jsonPath("$[0].options", hasSize(4)));
    }

    @Test
    void scoresAPerfectSubmission() throws Exception {
        String answers = content.questions().stream()
                .map(q -> "{\"questionId\":\"" + q.id() + "\",\"selected\":" + q.correct() + "}")
                .collect(Collectors.joining(","));
        mvc.perform(post("/api/quiz/submit").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"answers\":[" + answers + "]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(12))
                .andExpect(jsonPath("$.total").value(12))
                .andExpect(jsonPath("$.topicsToReview", hasSize(0)));
    }

    @Test
    void reportsTopicsToReviewForWrongAnswers() throws Exception {
        QuizQuestion q = content.questions().get(0);
        int wrong = (q.correct() + 1) % 4;
        mvc.perform(post("/api/quiz/submit").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"answers\":[{\"questionId\":\"" + q.id() + "\",\"selected\":" + wrong + "}]}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.score").value(0))
                .andExpect(jsonPath("$.topicsToReview[0]").value(q.topic()));
    }

    @Test
    void rejectsBadSubmissions() throws Exception {
        mvc.perform(post("/api/quiz/submit").contentType(MediaType.APPLICATION_JSON).content("{\"answers\":[]}"))
                .andExpect(status().isBadRequest());
        mvc.perform(post("/api/quiz/submit").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"answers\":[{\"questionId\":\"nope\",\"selected\":1}]}"))
                .andExpect(status().isBadRequest());
        mvc.perform(post("/api/quiz/submit").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"answers\":[{\"questionId\":\"q-burns-1\",\"selected\":9}]}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void healthEndpointWorks() throws Exception {
        mvc.perform(get("/api/health")).andExpect(status().isOk()).andExpect(jsonPath("$.status").value("ok"));
    }
}
