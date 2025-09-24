package com.vitalapp.persistence.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.SubscriptionPlanEntity;

@Repository
public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlanEntity, Long> {
    
    List<SubscriptionPlanEntity> findByIsActiveTrue();
    
    Optional<SubscriptionPlanEntity> findByNameIgnoreCase(String name);
}
