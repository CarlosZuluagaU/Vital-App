package com.vitalapp.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.ExerciseTypeEntity;

@Repository
public interface ExerciseTypeRepository extends JpaRepository<ExerciseTypeEntity, Long> {
    
    List<ExerciseTypeEntity> findByLocationType(ExerciseTypeEntity.LocationType locationType);
    
    ExerciseTypeEntity findByName(String name);
}
