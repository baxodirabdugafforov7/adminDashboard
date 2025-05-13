package com.example.dashboard.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Sale {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private Integer quantity;
    private Double revenue;
    private String region;
    private LocalDate date;

    private boolean flagged;
    private String notes;


    public Sale() {
    }


    public Sale(Long id, String productName, Integer quantity, Double revenue,
                String region, LocalDate date, boolean flagged, String notes) {
        this.id = id;
        this.productName = productName;
        this.quantity = quantity;
        this.revenue = revenue;
        this.region = region;
        this.date = date;
        this.flagged = flagged;
        this.notes = notes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getRevenue() { return revenue; }
    public void setRevenue(Double revenue) { this.revenue = revenue; }

    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public boolean isFlagged() { return flagged; }
    public void setFlagged(boolean flagged) { this.flagged = flagged; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
