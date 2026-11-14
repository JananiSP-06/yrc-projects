package com.roadwise.repository;

import com.roadwise.entity.Pledge;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PledgeRepository extends JpaRepository<Pledge, Long> {
    Optional<Pledge> findByVisitorId(String visitorId);
}
