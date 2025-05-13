package com.example.dashboard.controller;

import com.example.dashboard.model.SalesData;
import com.example.dashboard.repository.SalesDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*") // allow all origins for now
public class SalesDataController {

    @Autowired
    private SalesDataRepository repository;

    @GetMapping
    public List<SalesData> getAllSales() {
        return repository.findAll();
    }

    @PostMapping
    public SalesData createSale(@RequestBody SalesData sale) {
        return repository.save(sale);
    }

    @GetMapping("/region/{region}")
    public List<SalesData> getByRegion(@PathVariable String region) {
        return repository.findByRegion(region);
    }
}
