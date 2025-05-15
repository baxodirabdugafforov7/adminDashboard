package com.example.dashboard.seeder;

import com.example.dashboard.model.Sale;
import com.example.dashboard.repository.SaleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataSeeder {

    @Bean
    public CommandLineRunner loadData(SaleRepository saleRepository) {
        return args -> {
            saleRepository.save(new Sale("Laptop", 10, 1500.0, "North", LocalDate.of(2024, 3, 10), false, "Top seller"));
            saleRepository.save(new Sale("Monitor", 5, 700.0, "East", LocalDate.of(2024, 3, 12), true, "Check quality"));
            saleRepository.save(new Sale("Keyboard", 20, 40.0, "West", LocalDate.of(2024, 3, 15), false, "Sold in bundle"));
        };
    }
}
