package com.roadwise.dto;

import jakarta.validation.constraints.Pattern;

/** The body is optional. If visitorId is missing the server creates one and returns it. */
public record PledgeRequest(@Pattern(regexp = "^[0-9a-fA-F-]{36}$", message = "must be a UUID") String visitorId) { }
