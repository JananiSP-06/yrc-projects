package com.roadwise.repository;

import com.roadwise.entity.*;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SafetyTipRepository extends JpaRepository<SafetyTip, Long> {
    List<SafetyTip> findAllByOrderByIdAsc();
    List<SafetyTip> findByCategoryOrderByIdAsc(TipCategory category);
}
