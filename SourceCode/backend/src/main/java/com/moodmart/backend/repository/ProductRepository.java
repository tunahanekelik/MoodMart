package com.moodmart.backend.repository;

import com.moodmart.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByMoodIgnoreCase(String mood);
}
