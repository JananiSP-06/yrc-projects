package com.roadwise.repository;

import com.roadwise.entity.AwarenessCampaign;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AwarenessCampaignRepository extends JpaRepository<AwarenessCampaign, Long> {
    List<AwarenessCampaign> findAllByOrderByStartDateDesc();
    List<AwarenessCampaign> findByStartDateGreaterThanEqualOrderByStartDateAsc(LocalDate date);
}
