package com.vitalapp.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.RoutineEntity;

@Repository
public interface RoutineRepository extends JpaRepository<RoutineEntity, Long> {
    
    @Query("SELECT r FROM RoutineEntity r WHERE " +
           "(:categoryId IS NULL OR r.category.id = :categoryId) AND " +
           "(:intensityId IS NULL OR r.intensity.id = :intensityId)")
    List<RoutineEntity> findByFilters(@Param("categoryId") Long categoryId, 
                                    @Param("intensityId") Long intensityId);
    
    List<RoutineEntity> findByCategoryId(Long categoryId);
    
    List<RoutineEntity> findByIntensityId(Long intensityId);
}
