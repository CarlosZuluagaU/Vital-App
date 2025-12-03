package com.vitalapp.dto;

import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.*;

class ActivityLogDTOTest {

    @Test
    void testActivityLogRequestDTO_SettersAndGetters() {
        ActivityLogRequestDTO dto = new ActivityLogRequestDTO();
        dto.setActivityType("ROUTINE_COMPLETED");
        dto.setRelatedEntityId(1L);
        dto.setDurationSeconds(600);
        dto.setExerciseCount(5);
        dto.setActivityDate("2025-11-22");

        assertEquals("ROUTINE_COMPLETED", dto.getActivityType());
        assertEquals(1L, dto.getRelatedEntityId());
        assertEquals(600, dto.getDurationSeconds());
        assertEquals(5, dto.getExerciseCount());
        assertEquals("2025-11-22", dto.getActivityDate());
    }

    @Test
    void testActivityLogConfirmationDTO_Constructor() {
        ActivityLogConfirmationDTO dto = new ActivityLogConfirmationDTO("success", "Activity logged");
        
        assertEquals("success", dto.getStatus());
        assertEquals("Activity logged", dto.getMessage());
    }

    @Test
    void testWeeklyStatsDTO_SettersAndGetters() {
        WeeklyStatsDTO dto = new WeeklyStatsDTO();
        dto.setTotalSessions(10);
        dto.setTotalMinutes(150);
        dto.setCurrentStreak(5);
        dto.setDays(new ArrayList<>());

        assertEquals(10, dto.getTotalSessions());
        assertEquals(150, dto.getTotalMinutes());
        assertEquals(5, dto.getCurrentStreak());
        assertNotNull(dto.getDays());
    }

    @Test
    void testWeeklyStatsDayDTO_SettersAndGetters() {
        WeeklyStatsDTO.DayStatsDTO dto = new WeeklyStatsDTO.DayStatsDTO("2025-11-22", 2, 30);
        
        assertEquals("2025-11-22", dto.getDate());
        assertEquals(2, dto.getSessions());
        assertEquals(30, dto.getTotalMinutes());
    }
}
