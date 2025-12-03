package com.vitalapp.entity;

import com.vitalapp.persistence.entity.ExerciseEntity;
import com.vitalapp.persistence.entity.CategoryEntity;
import com.vitalapp.persistence.entity.IntensityEntity;
import com.vitalapp.persistence.entity.ExerciseTypeEntity;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class ExerciseEntityTest {

    @Test
    void testExerciseEntity_DefaultConstructor() {
        ExerciseEntity exercise = new ExerciseEntity();
        assertNotNull(exercise);
        assertNull(exercise.getId());
        assertNull(exercise.getName());
    }

    @Test
    void testExerciseEntity_ParameterizedConstructor() {
        CategoryEntity category = new CategoryEntity("Strength", "Strength training");
        IntensityEntity intensity = new IntensityEntity();
        intensity.setName("Moderate");
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        type.setName("Bodyweight");
        
        ExerciseEntity exercise = new ExerciseEntity("Push Up", "Upper body exercise", type, category, intensity);
        
        assertEquals("Push Up", exercise.getName());
        assertEquals("Upper body exercise", exercise.getDescription());
        assertEquals(category, exercise.getCategory());
        assertEquals(intensity, exercise.getIntensity());
        assertEquals(type, exercise.getExerciseType());
    }

    @Test
    void testExerciseEntity_SettersAndGetters() {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setId(1L);
        exercise.setName("Squat");
        exercise.setDescription("Lower body exercise");
        exercise.setInstructions("Stand with feet shoulder-width apart");
        exercise.setSafetyTips("Keep your back straight");
        exercise.setModifications("Use a chair for support");
        exercise.setBenefits("Strengthens legs and glutes");
        exercise.setDurationSeconds(60);
        exercise.setRepetitions(15);
        exercise.setSets(3);
        exercise.setVideoUrl("video.mp4");
        exercise.setImageUrl("image.jpg");
        exercise.setIsActive(true);
        exercise.setIsPremium(false);

        assertEquals(1L, exercise.getId());
        assertEquals("Squat", exercise.getName());
        assertEquals("Lower body exercise", exercise.getDescription());
        assertEquals("Stand with feet shoulder-width apart", exercise.getInstructions());
        assertEquals("Keep your back straight", exercise.getSafetyTips());
        assertEquals("Use a chair for support", exercise.getModifications());
        assertEquals("Strengthens legs and glutes", exercise.getBenefits());
        assertEquals(60, exercise.getDurationSeconds());
        assertEquals(15, exercise.getRepetitions());
        assertEquals(3, exercise.getSets());
        assertEquals("video.mp4", exercise.getVideoUrl());
        assertEquals("image.jpg", exercise.getImageUrl());
        assertTrue(exercise.getIsActive());
        assertFalse(exercise.getIsPremium());
    }

    @Test
    void testExerciseEntity_TimestampsSettersAndGetters() {
        ExerciseEntity exercise = new ExerciseEntity();
        LocalDateTime now = LocalDateTime.now();
        
        exercise.setCreatedAt(now);
        exercise.setUpdatedAt(now);
        
        assertEquals(now, exercise.getCreatedAt());
        assertEquals(now, exercise.getUpdatedAt());
    }

    @Test
    void testExerciseEntity_Relationships() {
        CategoryEntity category = new CategoryEntity();
        IntensityEntity intensity = new IntensityEntity();
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setCategory(category);
        exercise.setIntensity(intensity);
        exercise.setExerciseType(type);
        
        assertEquals(category, exercise.getCategory());
        assertEquals(intensity, exercise.getIntensity());
        assertEquals(type, exercise.getExerciseType());
    }

    @Test
    void testExerciseEntity_BooleanDefaults() {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setIsActive(true);
        exercise.setIsPremium(false);
        
        assertTrue(exercise.getIsActive());
        assertFalse(exercise.getIsPremium());
    }

    @Test
    void testExerciseEntity_NullableFields() {
        ExerciseEntity exercise = new ExerciseEntity();
        exercise.setSafetyTips(null);
        exercise.setModifications(null);
        exercise.setBenefits(null);
        exercise.setDurationSeconds(null);
        exercise.setRepetitions(null);
        exercise.setSets(null);
        
        assertNull(exercise.getSafetyTips());
        assertNull(exercise.getModifications());
        assertNull(exercise.getBenefits());
        assertNull(exercise.getDurationSeconds());
        assertNull(exercise.getRepetitions());
        assertNull(exercise.getSets());
    }
}
