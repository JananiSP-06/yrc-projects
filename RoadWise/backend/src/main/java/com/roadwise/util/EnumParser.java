package com.roadwise.util;

import com.roadwise.exception.BadRequestException;
import java.util.Arrays;

public final class EnumParser {
    private EnumParser() { }

    /** Accepts "traffic rules", "traffic-rules" or "TRAFFIC_RULES". Returns null for null input. */
    public static <E extends Enum<E>> E parse(Class<E> type, String raw) {
        if (raw == null) return null;
        String key = raw.trim().toUpperCase().replace('-', '_').replace(' ', '_');
        for (E e : type.getEnumConstants()) if (e.name().equals(key)) return e;
        throw new BadRequestException("Invalid value '" + raw + "'. Allowed values: " + Arrays.toString(type.getEnumConstants()));
    }
    public static <E extends Enum<E>> E require(Class<E> type, String raw) {
        if (raw == null || raw.isBlank()) throw new BadRequestException("A value is required. Allowed values: " + Arrays.toString(type.getEnumConstants()));
        return parse(type, raw);
    }
}
