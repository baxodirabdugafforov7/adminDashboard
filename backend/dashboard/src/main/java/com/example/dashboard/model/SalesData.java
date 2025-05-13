package com.example.dashboard.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SalesData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String region;
    private String product;
    private int quantity;
    private double revenue;
    private LocalDate date;


    public SalesData() {}

    public SalesData(Long id, String region, String product, int quantity, double revenue, LocalDate date) {
        this.id = id;
        this.region = region;
        this.product = product;
        this.quantity = quantity;
        this.revenue = revenue;
        this.date = date;
    }


    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getRegion() { return region; }

    public void setRegion(String region) { this.region = region; }

    public String getProduct() { return product; }

    public void setProduct(String product) { this.product = product; }

    public int getQuantity() { return quantity; }

    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getRevenue() { return revenue; }

    public void setRevenue(double revenue) { this.revenue = revenue; }

    public LocalDate getDate() { return date; }

    public void setDate(LocalDate date) { this.date = date; }
}
