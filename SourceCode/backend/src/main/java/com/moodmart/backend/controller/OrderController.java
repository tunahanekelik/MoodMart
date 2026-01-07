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
@CrossOrigin(origins = "http://localhost:3000") // connect to frontend
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // create new order
    @PostMapping("/create")
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        order.setOrderDate(LocalDateTime.now()); // set server time
        order.setStatus("PLACED"); // start from the very first step
        return ResponseEntity.ok(orderRepository.save(order));
    }

    // handle next step and tracking number logic
    @PatchMapping("/{orderId}/next-step")
    public ResponseEntity<Order> nextStep(@PathVariable Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // force uppercase to match frontend stepper expectations
        String currentStatus = order.getStatus().toUpperCase();

        if (currentStatus.equals("PLACED")) {
            order.setStatus("PREPARING");
        }
        else if (currentStatus.equals("PREPARING")) {
            order.setStatus("SHIPPED");
            // set tracking only once
            if (order.getTrackingNumber() == null) {
                order.setTrackingNumber("MM-" + (int)(Math.random() * 900000 + 100000));
            }
        }
        else if (currentStatus.equals("SHIPPED")) {
            order.setStatus("ON_WAY"); // matches "On Way" step
        }
        else if (currentStatus.equals("ON_WAY")) {
            order.setStatus("ARRIVED"); // matches "Arrived" step
        }

        return ResponseEntity.ok(orderRepository.save(order));
    }

    // delete order
    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        orderRepository.deleteById(orderId);
        return ResponseEntity.ok("Order deleted");
    }

    // get user specific orders
    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(@PathVariable Long userId) {
        return orderRepository.findByUserId(userId);
    }

    // get all for admin
    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}