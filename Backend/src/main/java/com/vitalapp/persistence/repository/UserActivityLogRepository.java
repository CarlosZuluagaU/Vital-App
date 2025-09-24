package com.vitalapp.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.UserActivityLogEntity;

@Repository
public interface UserActivityLogRepository extends JpaRepository<UserActivityLogEntity, Long> {
    
    List<UserActivityLogEntity> findByUserId(Long userId);
    
    @Query("SELECT COUNT(u) FROM UserActivityLogEntity u WHERE u.user.id = :userId")
    Long countActivitiesByUserId(@Param("userId") Long userId);
    
    @Query("SELECT u FROM UserActivityLogEntity u WHERE u.user.id = :userId AND u.completedAt >= :startDate")
    List<UserActivityLogEntity> findByUserIdAndCompletedAtAfter(@Param("userId") Long userId, 
                                                               @Param("startDate") LocalDateTime startDate);
}
