package com.roadwise.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.roadwise.dto.ErrorResponse;
import com.roadwise.repository.UserRepository;
import java.time.Instant;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import org.springframework.http.*;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.web.cors.*;

@Configuration
public class SecurityConfig {
    @Bean PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }

    @Bean UserDetailsService userDetailsService(UserRepository users) {
        return username -> users.findByUsername(username)
            .map(u -> User.withUsername(u.getUsername()).password(u.getPasswordHash()).roles(u.getRole().name()).build())
            .orElseThrow(() -> new UsernameNotFoundException("Unknown user"));
    }

    private void json(jakarta.servlet.http.HttpServletRequest req, jakarta.servlet.http.HttpServletResponse res, ObjectMapper om, HttpStatus s, String msg) throws java.io.IOException {
        res.setStatus(s.value()); res.setContentType(MediaType.APPLICATION_JSON_VALUE);
        om.writeValue(res.getWriter(), new ErrorResponse(Instant.now(), s.value(), s.getReasonPhrase(), msg, req.getRequestURI(), null));
    }

    @Bean SecurityFilterChain filterChain(HttpSecurity http, ObjectMapper om) throws Exception {
        http.csrf(c -> c.disable())   // stateless API with HTTP Basic: no cookies, so no CSRF risk
            .cors(Customizer.withDefaults())
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(a -> a
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/quizzes/submit", "/api/pledges").permitAll()
                .requestMatchers("/error").permitAll()
                .anyRequest().denyAll())
            .httpBasic(h -> h.authenticationEntryPoint((req, res, e) -> { res.setHeader("WWW-Authenticate", "Basic realm=\"RoadWise Admin\""); json(req, res, om, HttpStatus.UNAUTHORIZED, "Login required"); }))
            .exceptionHandling(e -> e.accessDeniedHandler((req, res, ex) -> json(req, res, om, HttpStatus.FORBIDDEN, "You do not have permission")));
        return http.build();
    }

    @Bean CorsConfigurationSource corsConfigurationSource(@Value("${roadwise.cors.allowed-origins}") List<String> origins) {
        CorsConfiguration c = new CorsConfiguration();
        c.setAllowedOrigins(origins); c.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        c.setAllowedHeaders(List.of("Authorization", "Content-Type")); c.setMaxAge(3600L);
        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource(); src.registerCorsConfiguration("/api/**", c); return src;
    }
}
