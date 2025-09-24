package com.vitalapp.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.UserSubscriptionEntity;

@Repository
public interface UserSubscriptionRepository extends JpaRepository<UserSubscriptionEntity, Long> {
    
    List<UserSubscriptionEntity> findByUserId(Long userId);
    
    @Query("SELECT us FROM UserSubscriptionEntity us WHERE us.user.id = :userId " +
           "AND us.status = 'ACTIVE' AND us.endDate > :currentDate")
    List<UserSubscriptionEntity> findActiveSubscriptionsByUserId(@Param("userId") Long userId, 
                                                                @Param("currentDate") LocalDateTime currentDate);
    
    @Query("SELECT us FROM UserSubscriptionEntity us WHERE us.user.id = :userId " +
           "AND us.status = 'ACTIVE' AND us.endDate > :currentDate " +
           "AND us.plan.name = :planName")
    Optional<UserSubscriptionEntity> findActiveSubscriptionByUserIdAndPlanName(@Param("userId") Long userId,
                                                                              @Param("planName") String planName,
                                                                              @Param("currentDate") LocalDateTime currentDate);
}
