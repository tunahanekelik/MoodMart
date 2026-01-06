package com.moodmart.backend.controller;

import com.moodmart.backend.model.Product;
import com.moodmart.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/mood/{mood}")
    public List<Product> getProductsByMood(@PathVariable String mood) {
        return repository.findByMoodIgnoreCase(mood);
    }
}
