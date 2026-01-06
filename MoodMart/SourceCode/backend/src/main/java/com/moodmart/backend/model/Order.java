package com.moodmart.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
@Data // Getter, Setter ve ToString'i otomatik oluşturur
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Siparişi veren kullanıcının ID'si
    private Long userId;

    // Siparişin verildiği tarih ve saat
    private LocalDateTime orderDate;

    // Siparişin toplam tutarı
    private Double totalAmount;

    // Sipariş durumu (Örn: PENDING, COMPLETED)
    private String status;

    // Bir siparişin içinde birden fazla ürün olabilir
    // Bu ilişki için OrderItem sınıfını kullanacağız
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;
}