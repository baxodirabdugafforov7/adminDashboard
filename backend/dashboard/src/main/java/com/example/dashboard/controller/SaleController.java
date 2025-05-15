package com.example.dashboard.controller;

import com.example.dashboard.model.Sale;
import com.example.dashboard.repository.SaleRepository;
import com.example.dashboard.service.SaleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleRepository saleRepository;

    public SaleController(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    @GetMapping
    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    @PostMapping
    public Sale createSale(@RequestBody Sale sale) {
        return saleRepository.save(sale);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sale> updateSale(@PathVariable Long id, @RequestBody Sale saleDetails) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found with id " + id));

        // Update fields
        sale.setProductName(saleDetails.getProductName());
        sale.setQuantity(saleDetails.getQuantity());
        sale.setRevenue(saleDetails.getRevenue());
        sale.setRegion(saleDetails.getRegion());
        sale.setSaleDate(saleDetails.getSaleDate());
        sale.setReturned(saleDetails.isReturned());
        sale.setNotes(saleDetails.getNotes());

        Sale updatedSale = saleRepository.save(sale);
        return ResponseEntity.ok(updatedSale);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSale(@PathVariable Long id) {
        Sale sale = saleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sale not found with id " + id));
        saleRepository.delete(sale);
        return ResponseEntity.noContent().build();
    }
}

