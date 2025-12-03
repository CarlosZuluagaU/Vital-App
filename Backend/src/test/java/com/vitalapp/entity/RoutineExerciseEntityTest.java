package com.vitalapp.entity;

import com.vitalapp.persistence.entity.RoutineExerciseEntity;
import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.ExerciseEntity;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class RoutineExerciseEntityTest {

    @Test
    void testRoutineExerciseEntity_DefaultConstructor() {
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity();
        assertNotNull(routineExercise);
        assertNull(routineExercise.getId());
    }

    @Test
    void testRoutineExerciseEntity_ParameterizedConstructor() {
        RoutineEntity routine = new RoutineEntity();
        routine.setId(1L);
        
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setId(1L);
        exercise.setName("Push Up");
        
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity(routine, exercise, 1);
        
        assertEquals(routine, routineExercise.getRoutine());
        assertEquals(exercise, routineExercise.getExercise());
        assertEquals(1, routineExercise.getExerciseOrder());
    }

    @Test
    void testRoutineExerciseEntity_SettersAndGetters() {
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity();
        
        routineExercise.setId(1L);
        routineExercise.setExerciseOrder(2);
        routineExercise.setDurationSeconds(60);
        routineExercise.setRepetitions(15);
        routineExercise.setSets(3);
        routineExercise.setRestSeconds(30);
        
        assertEquals(1L, routineExercise.getId());
        assertEquals(2, routineExercise.getExerciseOrder());
        assertEquals(60, routineExercise.getDurationSeconds());
        assertEquals(15, routineExercise.getRepetitions());
        assertEquals(3, routineExercise.getSets());
        assertEquals(30, routineExercise.getRestSeconds());
    }

    @Test
    void testRoutineExerciseEntity_Timestamps() {
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity();
        LocalDateTime now = LocalDateTime.now();
        
        routineExercise.setCreatedAt(now);
        
        assertEquals(now, routineExercise.getCreatedAt());
    }

    @Test
    void testRoutineExerciseEntity_Relationships() {
        RoutineEntity routine = new RoutineEntity();
        ExerciseEntity exercise = new ExerciseEntity();
        
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity();
        routineExercise.setRoutine(routine);
        routineExercise.setExercise(exercise);
        
        assertEquals(routine, routineExercise.getRoutine());
        assertEquals(exercise, routineExercise.getExercise());
    }

    @Test
    void testRoutineExerciseEntity_NullableFields() {
        RoutineExerciseEntity routineExercise = new RoutineExerciseEntity();
        
        routineExercise.setDurationSeconds(null);
        routineExercise.setRepetitions(null);
        routineExercise.setSets(null);
        routineExercise.setRestSeconds(null);
        
        assertNull(routineExercise.getDurationSeconds());
        assertNull(routineExercise.getRepetitions());
        assertNull(routineExercise.getSets());
        assertNull(routineExercise.getRestSeconds());
    }
}
