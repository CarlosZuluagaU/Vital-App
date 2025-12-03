package com.vitalapp.dto;

import com.vitalapp.persistence.entity.UserActivityLogEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class WeeklyStatsDTOTest {

    @Test
    void testWeeklyStatsDTO_DefaultConstructor() {
        WeeklyStatsDTO dto = new WeeklyStatsDTO();
        assertNotNull(dto);
    }

    @Test
    void testWeeklyStatsDTO_ThreeParamConstructor() {
        List<WeeklyStatsDTO.DayStatsDTO> days = new ArrayList<>();
        days.add(new WeeklyStatsDTO.DayStatsDTO("2025-11-22", 2, 30));
        
        WeeklyStatsDTO dto = new WeeklyStatsDTO(10, 150, days);
        
        assertEquals(10, dto.getTotalSessions());
        assertEquals(150, dto.getTotalMinutes());
        assertEquals(0, dto.getCurrentStreak());
        assertEquals(1, dto.getDays().size());
    }

    @Test
    void testWeeklyStatsDTO_FourParamConstructor() {
        List<WeeklyStatsDTO.DayStatsDTO> days = new ArrayList<>();
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = new ArrayList<>();
        
        WeeklyStatsDTO dto = new WeeklyStatsDTO(10, 150, days, breakdown);
        
        assertEquals(10, dto.getTotalSessions());
        assertEquals(150, dto.getTotalMinutes());
        assertNotNull(dto.getDays());
        assertNotNull(dto.getBreakdown());
    }

    @Test
    void testWeeklyStatsDTO_FiveParamConstructor() {
        List<WeeklyStatsDTO.DayStatsDTO> days = new ArrayList<>();
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = new ArrayList<>();
        
        WeeklyStatsDTO dto = new WeeklyStatsDTO(10, 150, 5, days, breakdown);
        
        assertEquals(10, dto.getTotalSessions());
        assertEquals(150, dto.getTotalMinutes());
        assertEquals(5, dto.getCurrentStreak());
        assertNotNull(dto.getDays());
        assertNotNull(dto.getBreakdown());
    }

    @Test
    void testDayStatsDTO_DefaultConstructor() {
        WeeklyStatsDTO.DayStatsDTO dto = new WeeklyStatsDTO.DayStatsDTO();
        assertNotNull(dto);
    }

    @Test
    void testDayStatsDTO_ParameterizedConstructor() {
        WeeklyStatsDTO.DayStatsDTO dto = new WeeklyStatsDTO.DayStatsDTO("2025-11-22", 3, 45);
        
        assertEquals("2025-11-22", dto.getDate());
        assertEquals(3, dto.getSessions());
        assertEquals(45, dto.getTotalMinutes());
    }

    @Test
    void testDayStatsDTO_Setters() {
        WeeklyStatsDTO.DayStatsDTO dto = new WeeklyStatsDTO.DayStatsDTO();
        dto.setDate("2025-11-23");
        dto.setSessions(5);
        dto.setTotalMinutes(60);
        
        assertEquals("2025-11-23", dto.getDate());
        assertEquals(5, dto.getSessions());
        assertEquals(60, dto.getTotalMinutes());
    }

    @Test
    void testActivityTypeBreakdownDTO_DefaultConstructor() {
        WeeklyStatsDTO.ActivityTypeBreakdownDTO dto = new WeeklyStatsDTO.ActivityTypeBreakdownDTO();
        assertNotNull(dto);
    }

    @Test
    void testActivityTypeBreakdownDTO_ParameterizedConstructor() {
        WeeklyStatsDTO.ActivityTypeBreakdownDTO dto = 
            new WeeklyStatsDTO.ActivityTypeBreakdownDTO("ROUTINE_COMPLETED", 10, 150);
        
        assertEquals("ROUTINE_COMPLETED", dto.getActivityType());
        assertEquals(10, dto.getSessions());
        assertEquals(150, dto.getTotalMinutes());
    }

    @Test
    void testActivityTypeBreakdownDTO_Setters() {
        WeeklyStatsDTO.ActivityTypeBreakdownDTO dto = new WeeklyStatsDTO.ActivityTypeBreakdownDTO();
        dto.setActivityType("EXERCISE_COMPLETED");
        dto.setSessions(5);
        dto.setTotalMinutes(75);
        
        assertEquals("EXERCISE_COMPLETED", dto.getActivityType());
        assertEquals(5, dto.getSessions());
        assertEquals(75, dto.getTotalMinutes());
    }

    @Test
    void testBuildBreakdown_WithActivities() {
        List<UserActivityLogEntity> logs = new ArrayList<>();
        
        UserEntity user = new UserEntity();
        user.setId(1L);
        
        UserActivityLogEntity log1 = new UserActivityLogEntity();
        log1.setUser(user);
        log1.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        log1.setDurationSeconds(600);
        log1.setCompletedAt(LocalDateTime.now());
        log1.setActivityDate(LocalDate.now());
        logs.add(log1);
        
        UserActivityLogEntity log2 = new UserActivityLogEntity();
        log2.setUser(user);
        log2.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        log2.setDurationSeconds(900);
        log2.setCompletedAt(LocalDateTime.now());
        log2.setActivityDate(LocalDate.now());
        logs.add(log2);
        
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(logs);
        
        assertNotNull(breakdown);
        assertEquals(1, breakdown.size());
        assertEquals("ROUTINE_COMPLETED", breakdown.get(0).getActivityType());
        assertEquals(2, breakdown.get(0).getSessions());
        assertTrue(breakdown.get(0).getTotalMinutes() > 0);
    }

    @Test
    void testBuildBreakdown_EmptyList() {
        List<UserActivityLogEntity> logs = new ArrayList<>();
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(logs);
        
        assertNotNull(breakdown);
        assertEquals(0, breakdown.size());
    }

    @Test
    void testBuildBreakdown_WithNullDuration() {
        List<UserActivityLogEntity> logs = new ArrayList<>();
        
        UserEntity user = new UserEntity();
        user.setId(1L);
        
        UserActivityLogEntity log = new UserActivityLogEntity();
        log.setUser(user);
        log.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        log.setDurationSeconds(null);
        log.setCompletedAt(LocalDateTime.now());
        logs.add(log);
        
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(logs);
        
        assertNotNull(breakdown);
        assertEquals(1, breakdown.size());
        assertEquals(0, breakdown.get(0).getTotalMinutes());
    }

    @Test
    void testWeeklyStatsDTO_SetBreakdown() {
        WeeklyStatsDTO dto = new WeeklyStatsDTO();
        List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = new ArrayList<>();
        breakdown.add(new WeeklyStatsDTO.ActivityTypeBreakdownDTO("TEST", 1, 10));
        
        dto.setBreakdown(breakdown);
        
        assertNotNull(dto.getBreakdown());
        assertEquals(1, dto.getBreakdown().size());
    }

    @Test
    void testWeeklyStatsDTO_SetDays() {
        WeeklyStatsDTO dto = new WeeklyStatsDTO();
        List<WeeklyStatsDTO.DayStatsDTO> days = new ArrayList<>();
        days.add(new WeeklyStatsDTO.DayStatsDTO("2025-11-22", 1, 10));
        
        dto.setDays(days);
        
        assertNotNull(dto.getDays());
        assertEquals(1, dto.getDays().size());
    }
}
