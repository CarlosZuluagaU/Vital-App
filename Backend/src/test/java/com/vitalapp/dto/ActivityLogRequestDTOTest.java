package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitalapp.presentation.dto.ActivityLogRequestDTO;

@ExtendWith(MockitoExtension.class)
public class ActivityLogRequestDTOTest {
    
    @Test
    public void testDefaultConstructor() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        
        assertNotNull(dto);
        assertNull(dto.getActivityType());
        assertNull(dto.getRelatedEntityId());
        assertNull(dto.getDurationSeconds());
        assertNull(dto.getExerciseCount());
        assertNull(dto.getActivityDate());
    }
    
    @Test
    public void testParameterizedConstructor() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO(
            "ROUTINE_COMPLETION", 
            123L, 
            1800, 
            10, 
            "2024-12-02"
        );
        
        assertEquals("ROUTINE_COMPLETION", dto.getActivityType());
        assertEquals(123L, dto.getRelatedEntityId());
        assertEquals(1800, dto.getDurationSeconds());
        assertEquals(10, dto.getExerciseCount());
        assertEquals("2024-12-02", dto.getActivityDate());
    }
    
    @Test
    public void testSettersAndGetters() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        
        dto.setActivityType("EXERCISE_COMPLETION");
        dto.setRelatedEntityId(456L);
        dto.setDurationSeconds(600);
        dto.setExerciseCount(5);
        dto.setActivityDate("2024-11-30");
        
        assertEquals("EXERCISE_COMPLETION", dto.getActivityType());
        assertEquals(456L, dto.getRelatedEntityId());
        assertEquals(600, dto.getDurationSeconds());
        assertEquals(5, dto.getExerciseCount());
        assertEquals("2024-11-30", dto.getActivityDate());
    }
    
    @Test
    public void testRoutineCompletion() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setActivityType("ROUTINE_COMPLETION");
        dto.setRelatedEntityId(1L);
        dto.setDurationSeconds(3600);
        dto.setExerciseCount(15);
        dto.setActivityDate("2024-12-01");
        
        assertEquals("ROUTINE_COMPLETION", dto.getActivityType());
        assertEquals(3600, dto.getDurationSeconds()); // 1 hour
        assertEquals(15, dto.getExerciseCount());
    }
    
    @Test
    public void testExerciseCompletion() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setActivityType("EXERCISE_COMPLETION");
        dto.setRelatedEntityId(2L);
        dto.setDurationSeconds(300);
        dto.setExerciseCount(1);
        dto.setActivityDate("2024-12-02");
        
        assertEquals("EXERCISE_COMPLETION", dto.getActivityType());
        assertEquals(300, dto.getDurationSeconds()); // 5 minutes
        assertEquals(1, dto.getExerciseCount());
    }
    
    @Test
    public void testNullActivityType() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO(null, 1L, 100, 1, "2024-12-02");
        
        assertNull(dto.getActivityType());
    }
    
    @Test
    public void testNullRelatedEntityId() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO("ROUTINE_COMPLETION", null, 100, 1, "2024-12-02");
        
        assertNull(dto.getRelatedEntityId());
    }
    
    @Test
    public void testNullDurationSeconds() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO("ROUTINE_COMPLETION", 1L, null, 1, "2024-12-02");
        
        assertNull(dto.getDurationSeconds());
    }
    
    @Test
    public void testNullExerciseCount() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO("ROUTINE_COMPLETION", 1L, 100, null, "2024-12-02");
        
        assertNull(dto.getExerciseCount());
    }
    
    @Test
    public void testNullActivityDate() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO("ROUTINE_COMPLETION", 1L, 100, 1, null);
        
        assertNull(dto.getActivityDate());
    }
    
    @Test
    public void testZeroDuration() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setDurationSeconds(0);
        
        assertEquals(0, dto.getDurationSeconds());
    }
    
    @Test
    public void testZeroExerciseCount() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setExerciseCount(0);
        
        assertEquals(0, dto.getExerciseCount());
    }
    
    @Test
    public void testLongDuration() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setDurationSeconds(7200); // 2 hours
        
        assertEquals(7200, dto.getDurationSeconds());
    }
    
    @Test
    public void testManyExercises() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setExerciseCount(50);
        
        assertEquals(50, dto.getExerciseCount());
    }
    
    @Test
    public void testDateFormat() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setActivityDate("2024-12-31");
        
        assertEquals("2024-12-31", dto.getActivityDate());
    }
    
    @Test
    public void testLongActivityType() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        String longType = "A".repeat(100);
        dto.setActivityType(longType);
        
        assertEquals(longType, dto.getActivityType());
        assertEquals(100, dto.getActivityType().length());
    }
    
    @Test
    public void testNegativeEntityId() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setRelatedEntityId(-1L);
        
        assertEquals(-1L, dto.getRelatedEntityId());
    }
    
    @Test
    public void testNegativeDuration() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setDurationSeconds(-100);
        
        assertEquals(-100, dto.getDurationSeconds());
    }
}
