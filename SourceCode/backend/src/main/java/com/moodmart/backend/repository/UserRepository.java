package com.moodmart.backend.repository;

import com.moodmart.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finds a user by either their email or their username.
     * This allows the login logic to be flexible for the identifier field.
     */
    Optional<User> findByEmailOrUsername(String email, String username);

    // Keep the old one if other services still specifically require only email lookups
    User findByEmail(String email);
}