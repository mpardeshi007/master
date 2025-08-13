package com.bny.jwt.init;

import com.bny.jwt.model.Role;
import com.bny.jwt.model.User;
import com.bny.jwt.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            logger.info("Initializing default users...");

            // Create regular user
            User user = new User("user", passwordEncoder.encode("password"));
            user.setRoles(Set.of(Role.USER));
            userRepository.save(user);
            logger.info("Created user: {}", user.getUsername());

            // Create admin user
            User admin = new User("admin", passwordEncoder.encode("password"));
            admin.setRoles(Set.of(Role.ADMIN, Role.USER));
            userRepository.save(admin);
            logger.info("Created admin: {}", admin.getUsername());

            // Create server user for server-to-server communication
            User server = new User("server", passwordEncoder.encode("server"));
            server.setRoles(Set.of(Role.SERVER));
            userRepository.save(server);
            logger.info("Created server: {}", server.getUsername());

            logger.info("Data initialization completed");
        } else {
            logger.info("Users already exist, skipping initialization");
        }
    }
}
