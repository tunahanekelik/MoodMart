package com.moodmart.backend.controller;

import com.moodmart.backend.model.User;
import com.moodmart.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registers a new user and assigns a default "user" role.
     */
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        user.setRole("user"); // Set default role to user
        return userRepository.save(user);
    }

    /**
     * Handles user login by checking both email and username.
     * Compares the password in plain text (Note: Use BCrypt for production).
     */
    @PostMapping("/login")
    public String login(@RequestBody User loginData) {
        // Since the frontend sends 'identifier' (mapped to email/username field),
        // we check both columns in the database using the value provided.
        Optional<User> foundUser = userRepository.findByEmailOrUsername(loginData.getEmail(), loginData.getEmail());

        if (foundUser.isPresent()) {
            User user = foundUser.get();
            // Verify if the password matches
            if (user.getPassword().equals(loginData.getPassword())) {
                return user.getRole(); // Return the role (admin or user) on success
            }
        }

        return "fail"; // Return fail if user not found or password incorrect
    }
}