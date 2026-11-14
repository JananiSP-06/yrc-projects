package com.roadwise.repository;

import com.roadwise.entity.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrafficSignRepository extends JpaRepository<TrafficSign, Long> {
    List<TrafficSign> findAllByOrderByNameAsc();
    List<TrafficSign> findByCategoryOrderByNameAsc(SignCategory category);
    List<TrafficSign> findByNameContainingIgnoreCaseOrderByNameAsc(String name);
    List<TrafficSign> findByCategoryAndNameContainingIgnoreCaseOrderByNameAsc(SignCategory category, String name);
    boolean existsByNameIgnoreCase(String name);
    boolean existsByNameIgnoreCaseAndIdNot(String name, Long id);
}
