package com.moodmart.backend.controller;

import com.moodmart.backend.model.Product;
import com.moodmart.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // this fixes the red responseentity error
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000") // connect to frontend
public class ProductController {

    @Autowired
    private ProductRepository repository; // your variable name is repository

    @GetMapping
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @GetMapping("/mood/{mood}")
    public List<Product> getProductsByMood(@PathVariable String mood) {
        return repository.findByMoodIgnoreCase(mood);
    }

    // admin: add new product to database
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        // we use 'repository' to save the product
        Product savedProduct = repository.save(product);
        return ResponseEntity.ok(savedProduct);
    }

    // image uploading
    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        try {
            // defined a path where images will be stored (frontend public folder)
            // Get the absolute path to your frontend/public/images folder
            String uploadDir = System.getProperty("user.dir") + "/frontend/public/images/";
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            java.nio.file.Path path = java.nio.file.Paths.get(uploadDir + fileName);

            java.nio.file.Files.copy(file.getInputStream(), path, java.nio.file.StandardCopyOption.REPLACE_EXISTING);

            // return the path that frontend can use
            return ResponseEntity.ok("/images/" + fileName);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("file upload failed");
        }
    }

    // admin: delete product from inventory
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        repository.deleteById(id);
        return ResponseEntity.ok("product deleted successfully");
    }
}