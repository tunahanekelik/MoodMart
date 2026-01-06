package com.moodmart.backend.repository;
import com.moodmart.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email); // Giriş yaparken e-postadan bulmak için
}