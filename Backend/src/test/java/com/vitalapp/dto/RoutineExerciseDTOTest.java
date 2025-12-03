package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitalapp.presentation.dto.RoutineExerciseDTO;

@ExtendWith(MockitoExtension.class)
public class RoutineExerciseDTOTest {
    
    @Test
    public void testDefaultConstructor() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        assertNotNull(dto);
        assertNull(dto.getExerciseId());
        assertNull(dto.getExerciseName());
        assertNull(dto.getDescription());
        assertNull(dto.getInstructions());
        assertNull(dto.getImageUrl());
        assertNull(dto.getVideoUrl());
        assertNull(dto.getExerciseOrder());
        assertNull(dto.getDurationSeconds());
        assertNull(dto.getRepetitions());
        assertNull(dto.getSets());
        assertNull(dto.getRestSeconds());
        assertNull(dto.getCategory());
        assertNull(dto.getIntensity());
        assertNull(dto.getExerciseType());
        assertNull(dto.getBenefits());
        assertNull(dto.getSafetyTips());
        assertNull(dto.getModifications());
    }
    
    @Test
    public void testParameterizedConstructor() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO(
            1L, "Push-ups", "A basic upper body exercise",
            "Start in plank position", "https://example.com/pushup.jpg",
            "https://example.com/pushup.mp4", 1, 60, 20, 3, 30,
            "Strength", "Moderate", "Bodyweight", "Builds upper body strength",
            "Keep back straight", "Knee push-ups for beginners"
        );
        
        assertEquals(1L, dto.getExerciseId());
        assertEquals("Push-ups", dto.getExerciseName());
        assertEquals("A basic upper body exercise", dto.getDescription());
        assertEquals("Start in plank position", dto.getInstructions());
        assertEquals("https://example.com/pushup.jpg", dto.getImageUrl());
        assertEquals("https://example.com/pushup.mp4", dto.getVideoUrl());
        assertEquals(1, dto.getExerciseOrder());
        assertEquals(60, dto.getDurationSeconds());
        assertEquals(20, dto.getRepetitions());
        assertEquals(3, dto.getSets());
        assertEquals(30, dto.getRestSeconds());
        assertEquals("Strength", dto.getCategory());
        assertEquals("Moderate", dto.getIntensity());
        assertEquals("Bodyweight", dto.getExerciseType());
        assertEquals("Builds upper body strength", dto.getBenefits());
        assertEquals("Keep back straight", dto.getSafetyTips());
        assertEquals("Knee push-ups for beginners", dto.getModifications());
    }
    
    @Test
    public void testSettersAndGetters() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setExerciseId(2L);
        dto.setExerciseName("Squats");
        dto.setDescription("Lower body exercise");
        dto.setInstructions("Stand with feet shoulder-width apart");
        dto.setImageUrl("https://example.com/squat.jpg");
        dto.setVideoUrl("https://example.com/squat.mp4");
        dto.setExerciseOrder(2);
        dto.setDurationSeconds(90);
        dto.setRepetitions(15);
        dto.setSets(4);
        dto.setRestSeconds(45);
        dto.setCategory("Strength");
        dto.setIntensity("High");
        dto.setExerciseType("Bodyweight");
        dto.setBenefits("Strengthens legs and glutes");
        dto.setSafetyTips("Keep knees behind toes");
        dto.setModifications("Wall squats for beginners");
        
        assertEquals(2L, dto.getExerciseId());
        assertEquals("Squats", dto.getExerciseName());
        assertEquals("Lower body exercise", dto.getDescription());
        assertEquals("Stand with feet shoulder-width apart", dto.getInstructions());
        assertEquals("https://example.com/squat.jpg", dto.getImageUrl());
        assertEquals("https://example.com/squat.mp4", dto.getVideoUrl());
        assertEquals(2, dto.getExerciseOrder());
        assertEquals(90, dto.getDurationSeconds());
        assertEquals(15, dto.getRepetitions());
        assertEquals(4, dto.getSets());
        assertEquals(45, dto.getRestSeconds());
        assertEquals("Strength", dto.getCategory());
        assertEquals("High", dto.getIntensity());
        assertEquals("Bodyweight", dto.getExerciseType());
        assertEquals("Strengthens legs and glutes", dto.getBenefits());
        assertEquals("Keep knees behind toes", dto.getSafetyTips());
        assertEquals("Wall squats for beginners", dto.getModifications());
    }
    
    @Test
    public void testStrengthCategory() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setCategory("Strength");
        
        assertEquals("Strength", dto.getCategory());
    }
    
    @Test
    public void testCardioCategory() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setCategory("Cardio");
        
        assertEquals("Cardio", dto.getCategory());
    }
    
    @Test
    public void testFlexibilityCategory() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setCategory("Flexibility");
        
        assertEquals("Flexibility", dto.getCategory());
    }
    
    @Test
    public void testLowIntensity() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setIntensity("Low");
        
        assertEquals("Low", dto.getIntensity());
    }
    
    @Test
    public void testModerateIntensity() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setIntensity("Moderate");
        
        assertEquals("Moderate", dto.getIntensity());
    }
    
    @Test
    public void testHighIntensity() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setIntensity("High");
        
        assertEquals("High", dto.getIntensity());
    }
    
    @Test
    public void testBodyweightExercise() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setExerciseType("Bodyweight");
        
        assertEquals("Bodyweight", dto.getExerciseType());
    }
    
    @Test
    public void testWeightedExercise() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setExerciseType("Weighted");
        
        assertEquals("Weighted", dto.getExerciseType());
    }
    
    @Test
    public void testNullableFields() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setExerciseId(1L);
        dto.setExerciseName("Test Exercise");
        dto.setDescription(null);
        dto.setInstructions(null);
        dto.setImageUrl(null);
        dto.setVideoUrl(null);
        dto.setBenefits(null);
        dto.setSafetyTips(null);
        dto.setModifications(null);
        
        assertEquals(1L, dto.getExerciseId());
        assertEquals("Test Exercise", dto.getExerciseName());
        assertNull(dto.getDescription());
        assertNull(dto.getInstructions());
        assertNull(dto.getImageUrl());
        assertNull(dto.getVideoUrl());
        assertNull(dto.getBenefits());
        assertNull(dto.getSafetyTips());
        assertNull(dto.getModifications());
    }
    
    @Test
    public void testExerciseOrderSequence() {
        RoutineExerciseDTO dto1 = new RoutineExerciseDTO();
        dto1.setExerciseOrder(1);
        
        RoutineExerciseDTO dto2 = new RoutineExerciseDTO();
        dto2.setExerciseOrder(2);
        
        RoutineExerciseDTO dto3 = new RoutineExerciseDTO();
        dto3.setExerciseOrder(3);
        
        assertTrue(dto1.getExerciseOrder() < dto2.getExerciseOrder());
        assertTrue(dto2.getExerciseOrder() < dto3.getExerciseOrder());
    }
    
    @Test
    public void testDurationRange() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setDurationSeconds(30);
        assertEquals(30, dto.getDurationSeconds());
        
        dto.setDurationSeconds(300);
        assertEquals(300, dto.getDurationSeconds());
    }
    
    @Test
    public void testRepetitionRange() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setRepetitions(10);
        assertEquals(10, dto.getRepetitions());
        
        dto.setRepetitions(50);
        assertEquals(50, dto.getRepetitions());
    }
    
    @Test
    public void testSetsRange() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setSets(1);
        assertEquals(1, dto.getSets());
        
        dto.setSets(5);
        assertEquals(5, dto.getSets());
    }
    
    @Test
    public void testRestSecondsRange() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        
        dto.setRestSeconds(30);
        assertEquals(30, dto.getRestSeconds());
        
        dto.setRestSeconds(120);
        assertEquals(120, dto.getRestSeconds());
    }
    
    @Test
    public void testLongInstructions() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        String longInstructions = "A".repeat(500);
        dto.setInstructions(longInstructions);
        
        assertEquals(longInstructions, dto.getInstructions());
        assertEquals(500, dto.getInstructions().length());
    }
    
    @Test
    public void testLongBenefits() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        String longBenefits = "Improves cardiovascular health, builds muscle strength, enhances flexibility, boosts mental health";
        dto.setBenefits(longBenefits);
        
        assertEquals(longBenefits, dto.getBenefits());
    }
    
    @Test
    public void testImageAndVideoUrls() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO();
        dto.setImageUrl("https://cdn.example.com/exercises/123.jpg");
        dto.setVideoUrl("https://cdn.example.com/exercises/123.mp4");
        
        assertTrue(dto.getImageUrl().startsWith("https://"));
        assertTrue(dto.getVideoUrl().startsWith("https://"));
        assertTrue(dto.getImageUrl().endsWith(".jpg"));
        assertTrue(dto.getVideoUrl().endsWith(".mp4"));
    }
    
    @Test
    public void testCompleteExercise() {
        RoutineExerciseDTO dto = new RoutineExerciseDTO(
            5L, "Plank", "Core strengthening exercise",
            "Hold position with body straight", "https://example.com/plank.jpg",
            "https://example.com/plank.mp4", 5, 120, null, 3, 60,
            "Core", "Moderate", "Bodyweight", "Strengthens core muscles",
            "Keep body in straight line", "Elbow plank variation"
        );
        
        assertNotNull(dto.getExerciseId());
        assertNotNull(dto.getExerciseName());
        assertNotNull(dto.getDescription());
        assertNotNull(dto.getInstructions());
        assertNotNull(dto.getImageUrl());
        assertNotNull(dto.getVideoUrl());
        assertNotNull(dto.getExerciseOrder());
        assertNotNull(dto.getDurationSeconds());
        assertNull(dto.getRepetitions()); // Time-based, no reps
        assertNotNull(dto.getSets());
        assertNotNull(dto.getRestSeconds());
    }
}
