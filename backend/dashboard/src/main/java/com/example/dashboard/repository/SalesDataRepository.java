package com.example.dashboard.repository;

import com.example.dashboard.model.SalesData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesDataRepository extends JpaRepository<SalesData, Long> {
    List<SalesData> findByRegion(String region);
}
