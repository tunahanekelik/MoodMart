package com.moodmart.backend.repository;

import com.moodmart.backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId); // important for user finding
    // only finds the users order
    List<Order> findByUserEmail(String email);
}