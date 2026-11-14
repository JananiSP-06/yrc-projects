package com.roadwise.config;

import com.roadwise.entity.*;
import com.roadwise.repository.UserRepository;
import java.security.SecureRandom;
import java.util.Base64;
import javax.sql.DataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/** On the very first start (no users yet) this loads the sample data and creates the admin account. */
@Component
public class DatabaseInitializer implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);
    private final UserRepository users; private final PasswordEncoder encoder; private final DataSource dataSource;
    @Value("${roadwise.seed.enabled:true}") private boolean seed;
    @Value("${roadwise.admin.username:admin}") private String adminUser;
    @Value("${roadwise.admin.password:}") private String adminPassword;

    public DatabaseInitializer(UserRepository users, PasswordEncoder encoder, DataSource dataSource) { this.users = users; this.encoder = encoder; this.dataSource = dataSource; }

    @Override public void run(ApplicationArguments args) {
        if (users.count() > 0) return;
        if (seed) {
            ResourceDatabasePopulator p = new ResourceDatabasePopulator(new ClassPathResource("db/seed.sql")); p.setSqlScriptEncoding("UTF-8"); p.execute(dataSource);
            log.info("Sample data loaded");
        }
        String pw = adminPassword;
        boolean generated = pw == null || pw.isBlank();
        if (generated) { byte[] b = new byte[12]; new SecureRandom().nextBytes(b); pw = Base64.getUrlEncoder().withoutPadding().encodeToString(b); }
        else if (pw.length() < 8) throw new IllegalStateException("ADMIN_PASSWORD must be at least 8 characters");
        users.save(new AppUser(adminUser, encoder.encode(pw), Role.ADMIN));
        if (generated) log.warn("Created admin user '{}' with generated password: {}  (save it now, it is shown only once; set ADMIN_PASSWORD to choose your own)", adminUser, pw);
        else log.info("Created admin user '{}'", adminUser);
    }
}
