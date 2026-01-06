package com.moodmart.backend.controller;

import com.moodmart.backend.model.Order;
import com.moodmart.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000") // Frontend erişimi için
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    /**
     * Yeni bir sipariş oluşturur.
     * Frontend Checkout butonuna basıldığında buraya POST isteği atılır.
     */
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        order.setOrderDate(LocalDateTime.now()); // Sipariş zamanını sunucu belirler
        order.setStatus("COMPLETED"); // Başlangıç durumu

        // OrderItems zaten Order nesnesinin içinde List olarak geldiği için
        // CascadeType.ALL sayesinde otomatik olarak kaydedilecektir.
        Order savedOrder = orderRepository.save(order);
        return ResponseEntity.ok(savedOrder);
    }

    /**
     * Belirli bir kullanıcının geçmiş siparişlerini getirir.
     * Profil sayfasında kullanılır.
     */
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }

    /**
     * Sistemdeki tüm siparişleri getirir.
     * Admin paneli için raporlama amaçlı kullanılır.
     */
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PatchMapping("/{orderId}/status")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long orderId, @RequestBody String newStatus) {
        Order order = orderRepository.findById(orderId).orElseThrow();
        order.setStatus(newStatus.replace("\"", ""));
        return ResponseEntity.ok(orderRepository.save(order));
    }
}