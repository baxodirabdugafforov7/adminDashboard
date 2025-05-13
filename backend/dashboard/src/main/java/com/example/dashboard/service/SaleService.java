package com.example.dashboard.service;

import com.example.dashboard.model.Sale;
import com.example.dashboard.repository.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SaleService {
    @Autowired
    private SaleRepository saleRepository;

    public List<Sale> getAllSales() {
        return saleRepository.findAll();
    }

    public Optional<Sale> getSaleById(Long id) {
        return saleRepository.findById(id);
    }

    public Sale createSale(Sale sale) {
        return saleRepository.save(sale);
    }

    public Sale updateSale(Long id, Sale updatedSale) {
        return saleRepository.findById(id).map(sale -> {
            sale.setProductName(updatedSale.getProductName());
            sale.setQuantity(updatedSale.getQuantity());
            sale.setRevenue(updatedSale.getRevenue());
            sale.setRegion(updatedSale.getRegion());
            sale.setDate(updatedSale.getDate());
            sale.setFlagged(updatedSale.isFlagged());
            sale.setNotes(updatedSale.getNotes());
            return saleRepository.save(sale);
        }).orElse(null);
    }

    public void deleteSale(Long id) {
        saleRepository.deleteById(id);
    }
}