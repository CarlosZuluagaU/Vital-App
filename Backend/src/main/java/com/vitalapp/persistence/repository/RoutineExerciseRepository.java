package com.vitalapp.persistence.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.RoutineExerciseEntity;

@Repository
public interface RoutineExerciseRepository extends JpaRepository<RoutineExerciseEntity, Long> {
    
    @Query("SELECT re FROM RoutineExerciseEntity re " +
           "JOIN FETCH re.exercise e " +
           "JOIN FETCH e.category " +
           "JOIN FETCH e.intensity " +
           "JOIN FETCH e.exerciseType " +
           "WHERE re.routine.id = :routineId " +
           "ORDER BY re.exerciseOrder ASC")
    List<RoutineExerciseEntity> findByRoutineIdWithExercises(@Param("routineId") Long routineId);
    
    List<RoutineExerciseEntity> findByRoutineIdOrderByExerciseOrder(Long routineId);
    
    @Query("SELECT re FROM RoutineExerciseEntity re " +
           "WHERE re.routine.id = :routineId " +
           "ORDER BY re.exerciseOrder ASC")
    List<RoutineExerciseEntity> findByRoutineId(@Param("routineId") Long routineId);
}