package com.example.dashboard.seeder;

import com.example.dashboard.model.SalesData;
import com.example.dashboard.repository.SalesDataRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class DataSeeder implements CommandLineRunner {

    private final SalesDataRepository repository;

    public DataSeeder(SalesDataRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        repository.save(new SalesData(null, "Europe", "Product A", 100, 10000.0, LocalDate.of(2024, 12, 1)));
        repository.save(new SalesData(null, "Asia", "Product B", 150, 12000.0, LocalDate.of(2024, 12, 5)));
        repository.save(new SalesData(null, "North America", "Product C", 200, 18000.0, LocalDate.of(2024, 12, 10)));
    }
}
