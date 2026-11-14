package com.roadwise.dto;

import java.time.LocalDateTime;

public record PledgeResponse(String visitorId, LocalDateTime pledgedAt, boolean alreadyPledged, long totalPledges) { }
