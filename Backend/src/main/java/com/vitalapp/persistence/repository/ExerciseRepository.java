package com.vitalapp.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.ExerciseEntity;
import com.vitalapp.persistence.entity.ExerciseTypeEntity;

@Repository
public interface ExerciseRepository extends JpaRepository<ExerciseEntity, Long> {
    
    @Query("SELECT e FROM ExerciseEntity e WHERE e.isActive = true AND " +
           "(:categoryId IS NULL OR e.category.id = :categoryId) AND " +
           "(:intensityId IS NULL OR e.intensity.id = :intensityId) AND " +
           "(:exerciseTypeId IS NULL OR e.exerciseType.id = :exerciseTypeId) AND " +
           "(:locationType IS NULL OR e.exerciseType.locationType = :locationType)")
    List<ExerciseEntity> findByFilters(@Param("categoryId") Long categoryId,
                                     @Param("intensityId") Long intensityId,
                                     @Param("exerciseTypeId") Long exerciseTypeId,
                                     @Param("locationType") ExerciseTypeEntity.LocationType locationType);
    
    List<ExerciseEntity> findByCategoryIdAndIsActive(Long categoryId, Boolean isActive);
    
    List<ExerciseEntity> findByExerciseTypeIdAndIsActive(Long exerciseTypeId, Boolean isActive);
    
    List<ExerciseEntity> findByExerciseType_LocationTypeAndIsActive(
            ExerciseTypeEntity.LocationType locationType, Boolean isActive);
    
    @Query("SELECT e FROM ExerciseEntity e WHERE e.isActive = true AND " +
           "e.exerciseType.locationType = :locationType AND e.category.id = :categoryId")
    List<ExerciseEntity> findByLocationTypeAndCategory(@Param("locationType") ExerciseTypeEntity.LocationType locationType,
                                                     @Param("categoryId") Long categoryId);
}
