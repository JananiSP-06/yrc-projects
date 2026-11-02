package org.yrc.firstaid.model;

import java.util.List;

/** One first aid topic, such as burns, with its illustrated steps. */
public record Guide(
        String id,
        String title,
        String tagline,
        String description,
        String duration,
        String level,
        String accent,
        String tint,
        String cover,
        String coverAlt,
        List<Step> steps,
        List<String> keyActions,
        List<String> seekHelp) {

    /** A single illustrated action. The id also names the illustration the frontend draws. */
    public record Step(String id, String title, String text, String warning, String tip, String alt) {
    }
}
