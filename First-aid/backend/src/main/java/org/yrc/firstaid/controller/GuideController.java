package org.yrc.firstaid.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.yrc.firstaid.model.Guide;
import org.yrc.firstaid.service.ContentService;

@RestController
@RequestMapping("/api/guides")
public class GuideController {

    private final ContentService content;

    public GuideController(ContentService content) {
        this.content = content;
    }

    @GetMapping
    public List<Guide> all() {
        return content.guides();
    }

    @GetMapping("/{id}")
    public Guide one(@PathVariable String id) {
        return content.guide(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No guide called " + id));
    }
}
