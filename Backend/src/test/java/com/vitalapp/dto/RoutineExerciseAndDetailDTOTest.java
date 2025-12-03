package com.vitalapp.dto;

import com.vitalapp.presentation.dto.RoutineExerciseDTO;
import com.vitalapp.presentation.dto.ExerciseDetailDTO;
import com.vitalapp.presentation.dto.ExerciseSummaryDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoutineExerciseAndDetailDTOTest {

    @Test
    void testRoutineExerciseDTO_DefaultConstructor() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        assertNotNull(dto);
    }

    @Test
    void testRoutineExerciseDTO_FullConstructor() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO(
            1L, "Push-up", "Upper body exercise", "Instructions here",
            "image.jpg", "video.mp4", 1, 30, 10, 3, 60,
            "Strength", "Moderate", "Bodyweight", "Benefits", "Safety tips", "Modifications"
        );

        assertEquals(1L, dto.getExerciseId());
        assertEquals("Push-up", dto.getExerciseName());
        assertEquals("Upper body exercise", dto.getDescription());
        assertEquals(1, dto.getExerciseOrder());
        assertEquals(30, dto.getDurationSeconds());
        assertEquals(10, dto.getRepetitions());
        assertEquals(3, dto.getSets());
        assertEquals(60, dto.getRestSeconds());
    }

    @Test
    void testExerciseDetailDTO_DefaultConstructor() {
        ExerciseDetailDTO dto = new ExerciseDetailDTO();
        assertNotNull(dto);
    }

    @Test
    void testExerciseDetailDTO_FullConstructor() {
        ExerciseDetailDTO dto = new ExerciseDetailDTO(
            1L, "Squat", "Lower body", "Stand with feet apart",
            "Keep back straight", "Use lighter weight", "Builds leg strength",
            "Strength", "High", "Compound", "GYM", 45, 12, 4, "video.mp4", "image.jpg"
        );

        assertEquals(1L, dto.getId());
        assertEquals("Squat", dto.getName());
        assertEquals("Lower body", dto.getDescription());
        assertEquals("Stand with feet apart", dto.getInstructions());
        assertEquals("Keep back straight", dto.getSafetyTips());
        assertEquals(45, dto.getDurationSeconds());
        assertEquals(12, dto.getRepetitions());
        assertEquals(4, dto.getSets());
    }

    @Test
    void testExerciseSummaryDTO_DefaultConstructor() {
        ExerciseSummaryDTO dto = new ExerciseSummaryDTO();
        assertNotNull(dto);
    }

    @Test
    void testExerciseSummaryDTO_FullConstructor() {
        ExerciseSummaryDTO dto = new ExerciseSummaryDTO(
            1L, "Plank", "Core exercise", "Strength", "Moderate", "Isometric",
            "HOME", 60, 1, 3, "image.jpg", "video.mp4", "Don't sag hips", "Core stability"
        );

        assertEquals(1L, dto.getId());
        assertEquals("Plank", dto.getName());
        assertEquals("Core exercise", dto.getDescription());
        assertEquals("Strength", dto.getCategoryName());
        assertEquals("Moderate", dto.getIntensityName());
        assertEquals("HOME", dto.getLocationType());
        assertEquals(60, dto.getDurationSeconds());
    }

    @Test
    void testRoutineExerciseDTO_SettersAndGetters() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setExerciseId(10L);
        dto.setExerciseName("Burpee");
        dto.setExerciseOrder(2);
        dto.setDurationSeconds(45);
        dto.setRepetitions(15);
        dto.setSets(4);
        dto.setRestSeconds(90);
        dto.setCategory("Cardio");
        dto.setIntensity("High");

        assertEquals(10L, dto.getExerciseId());
        assertEquals("Burpee", dto.getExerciseName());
        assertEquals(2, dto.getExerciseOrder());
        assertEquals(45, dto.getDurationSeconds());
        assertEquals("Cardio", dto.getCategory());
        assertEquals("High", dto.getIntensity());
    }

    @Test
    void testExerciseDetailDTO_NullableFields() {
        ExerciseDetailDTO dto = new ExerciseDetailDTO();
        
        dto.setModifications(null);
        dto.setSafetyTips(null);
        dto.setBenefits(null);

        assertNull(dto.getModifications());
        assertNull(dto.getSafetyTips());
        assertNull(dto.getBenefits());
    }
}