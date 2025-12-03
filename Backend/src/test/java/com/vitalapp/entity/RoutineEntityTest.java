package com.vitalapp.entity;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.CategoryEntity;
import com.vitalapp.persistence.entity.IntensityEntity;
import com.vitalapp.persistence.entity.ExerciseEntity;
import com.vitalapp.persistence.entity.RoutineExerciseEntity;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class RoutineEntityTest {

    @Test
    void testRoutineEntity_DefaultConstructor() {
        RoutineEntity routine = new RoutineEntity();
        assertNotNull(routine);
        assertNull(routine.getId());
        assertNull(routine.getTitle());
    }

    @Test
    void testRoutineEntity_ParameterizedConstructor() {
        CategoryEntity category = new CategoryEntity("Cardio", "Cardio exercises");
        IntensityEntity intensity = new IntensityEntity();
        intensity.setName("High");
        
        RoutineEntity routine = new RoutineEntity(
            "Morning Cardio", 
            "Start your day with cardio", 
            30, 
            "video.mp4", 
            category, 
            intensity
        );
        
        assertEquals("Morning Cardio", routine.getTitle());
        assertEquals("Start your day with cardio", routine.getDescription());
        assertEquals(30, routine.getDurationMinutes());
        assertEquals("video.mp4", routine.getVideoUrl());
        assertEquals(category, routine.getCategory());
        assertEquals(intensity, routine.getIntensity());
    }

    @Test
    void testRoutineEntity_SettersAndGetters() {
        RoutineEntity routine = new RoutineEntity();
        routine.setId(1L);
        routine.setTitle("Full Body Workout");
        routine.setDescription("Complete workout for all muscle groups");
        routine.setDurationMinutes(45);
        routine.setVideoUrl("workout.mp4");
        routine.setThumbnailUrl("thumb.jpg");
        routine.setIsPremium(true);

        assertEquals(1L, routine.getId());
        assertEquals("Full Body Workout", routine.getTitle());
        assertEquals("Complete workout for all muscle groups", routine.getDescription());
        assertEquals(45, routine.getDurationMinutes());
        assertEquals("workout.mp4", routine.getVideoUrl());
        assertEquals("thumb.jpg", routine.getThumbnailUrl());
        assertTrue(routine.getIsPremium());
    }

    @Test
    void testRoutineEntity_TimestampsSettersAndGetters() {
        RoutineEntity routine = new RoutineEntity();
        LocalDateTime now = LocalDateTime.now();
        
        routine.setCreatedAt(now);
        routine.setUpdatedAt(now);
        
        assertEquals(now, routine.getCreatedAt());
        assertEquals(now, routine.getUpdatedAt());
    }

    @Test
    void testRoutineEntity_Relationships() {
        CategoryEntity category = new CategoryEntity();
        IntensityEntity intensity = new IntensityEntity();
        
        RoutineEntity routine = new RoutineEntity();
        routine.setCategory(category);
        routine.setIntensity(intensity);
        
        assertEquals(category, routine.getCategory());
        assertEquals(intensity, routine.getIntensity());
    }

    @Test
    void testRoutineEntity_RoutineExercisesList() {
        RoutineEntity routine = new RoutineEntity();
        routine.setRoutineExercises(new ArrayList<>());
        
        assertNotNull(routine.getRoutineExercises());
        assertTrue(routine.getRoutineExercises().isEmpty());
    }

    @Test
    void testRoutineEntity_AddExercise() {
        RoutineEntity routine = new RoutineEntity();
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setId(1L);
        exercise.setName("Push Up");
        
        routine.addExercise(exercise, 1);
        
        assertNotNull(routine.getRoutineExercises());
        assertEquals(1, routine.getRoutineExercises().size());
        assertEquals(exercise, routine.getRoutineExercises().get(0).getExercise());
        assertEquals(1, routine.getRoutineExercises().get(0).getExerciseOrder());
    }

    @Test
    void testRoutineEntity_RemoveExercise() {
        RoutineEntity routine = new RoutineEntity();
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setId(1L);
        exercise.setName("Push Up");
        
        routine.addExercise(exercise, 1);
        assertEquals(1, routine.getRoutineExercises().size());
        
        routine.removeExercise(exercise);
        assertTrue(routine.getRoutineExercises().isEmpty());
    }

    @Test
    void testRoutineEntity_DefaultValues() {
        RoutineEntity routine = new RoutineEntity();
        routine.setIsPremium(false);
        
        assertFalse(routine.getIsPremium());
    }
}
