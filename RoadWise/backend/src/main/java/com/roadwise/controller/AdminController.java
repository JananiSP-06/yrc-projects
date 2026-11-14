package com.roadwise.controller;

import com.roadwise.repository.*;
import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

@RestController @RequestMapping("/api/admin")
public class AdminController {
    private final TrafficSignRepository signs; private final QuizQuestionRepository quizzes; private final SafetyTipRepository tips;
    private final AwarenessCampaignRepository campaigns; private final PledgeRepository pledges;
    public AdminController(TrafficSignRepository s, QuizQuestionRepository q, SafetyTipRepository t, AwarenessCampaignRepository c, PledgeRepository p) { signs = s; quizzes = q; tips = t; campaigns = c; pledges = p; }

    /** Lets the admin screen check that the login works. */
    @GetMapping("/me") public Map<String, Object> me(Principal p) { return Map.of("username", p.getName(), "role", "ADMIN"); }

    @GetMapping("/stats") public Map<String, Long> stats() {
        Map<String, Long> m = new LinkedHashMap<>();
        m.put("signs", signs.count()); m.put("quizQuestions", quizzes.count()); m.put("tips", tips.count()); m.put("campaigns", campaigns.count()); m.put("pledges", pledges.count());
        return m;
    }
}
