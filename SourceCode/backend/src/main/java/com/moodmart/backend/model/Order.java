package com.moodmart.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data // generates getters and setters automatically
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // id of the user who placed the order
    private Long userId;

    // date and time when the order was created
    private LocalDateTime orderDate;

    // total price of the order
    private Double totalAmount;

    // order status like preparing, shipped or completed
    private String status;

    // unique tracking number for shipping (fixes controller error)
    private String trackingNumber;

    // relation for order products
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    // relation to user to filter orders correctly
    @ManyToOne
    @JoinColumn(name = "user_link_id")
    private User user;
}