package com.vitalapp.service;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.UserActivityLogEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.persistence.repository.UserActivityLogRepository;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import com.vitalapp.service.implementation.ActivityLogServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ActivityLogServiceImplTest {

    @Mock
    private UserActivityLogRepository activityLogRepository;

    @Mock
    private RoutineRepository routineRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ActivityLogServiceImpl activityLogService;

    private UserEntity testUser;
    private RoutineEntity testRoutine;
    private ActivityLogRequestDTO requestDTO;

    @BeforeEach
    void setUp() {
        testUser = new UserEntity();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");

        testRoutine = new RoutineEntity();
        testRoutine.setId(1L);
        testRoutine.setTitle("Test Routine");

        requestDTO = new ActivityLogRequestDTO();
        requestDTO.setActivityType("ROUTINE_COMPLETED");
        requestDTO.setRelatedEntityId(1L);
        requestDTO.setDurationSeconds(600);
        requestDTO.setExerciseCount(5);
    }

    @Test
    void testLogActivity_Success() {
        // Arrange
        when(routineRepository.findById(1L)).thenReturn(Optional.of(testRoutine));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        
        UserActivityLogEntity savedLog = new UserActivityLogEntity();
        savedLog.setId(1L);
        savedLog.setUser(testUser);
        savedLog.setDurationSeconds(600);
        
        when(activityLogRepository.save(any(UserActivityLogEntity.class))).thenReturn(savedLog);

        // Act
        ActivityLogConfirmationDTO result = activityLogService.logActivity(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("success", result.getStatus());
        assertEquals("Actividad registrada correctamente.", result.getMessage());
        verify(activityLogRepository, times(1)).save(any(UserActivityLogEntity.class));
    }

    @Test
    void testLogActivity_RoutineNotFound() {
        // Arrange
        when(routineRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ActivityLogConfirmationDTO result = activityLogService.logActivity(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("error", result.getStatus());
        assertTrue(result.getMessage().contains("Error al registrar la actividad"));
        verify(activityLogRepository, never()).save(any(UserActivityLogEntity.class));
    }

    @Test
    void testLogActivity_UserNotFound() {
        // Arrange
        when(routineRepository.findById(1L)).thenReturn(Optional.of(testRoutine));
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        ActivityLogConfirmationDTO result = activityLogService.logActivity(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("error", result.getStatus());
        verify(activityLogRepository, never()).save(any(UserActivityLogEntity.class));
    }

    @Test
    void testLogActivity_InvalidDuration() {
        // Arrange
        requestDTO.setDurationSeconds(0);
        when(routineRepository.findById(1L)).thenReturn(Optional.of(testRoutine));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        // Act
        ActivityLogConfirmationDTO result = activityLogService.logActivity(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("error", result.getStatus());
        verify(activityLogRepository, never()).save(any(UserActivityLogEntity.class));
    }

    @Test
    void testGetWeeklyStats_WithActivities() {
        // Arrange
        List<UserActivityLogEntity> activities = new ArrayList<>();
        
        UserActivityLogEntity activity1 = new UserActivityLogEntity();
        activity1.setUser(testUser);
        activity1.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        activity1.setDurationSeconds(600);
        activity1.setCompletedAt(LocalDateTime.now());
        activity1.setActivityDate(LocalDate.now());
        activities.add(activity1);

        UserActivityLogEntity activity2 = new UserActivityLogEntity();
        activity2.setUser(testUser);
        activity2.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        activity2.setDurationSeconds(900);
        activity2.setCompletedAt(LocalDateTime.now().minusDays(1));
        activity2.setActivityDate(LocalDate.now().minusDays(1));
        activities.add(activity2);

        when(activityLogRepository.findByUserIdAndCompletedAtAfter(anyLong(), any(LocalDateTime.class)))
            .thenReturn(activities);

        // Act
        WeeklyStatsDTO result = activityLogService.getWeeklyStats(1L);

        // Assert
        assertNotNull(result);
        assertEquals(2, result.getTotalSessions());
        assertTrue(result.getTotalMinutes() > 0);
        assertEquals(7, result.getDays().size());
        assertTrue(result.getCurrentStreak() >= 0);
    }

    @Test
    void testGetWeeklyStats_NoActivities() {
        // Arrange
        when(activityLogRepository.findByUserIdAndCompletedAtAfter(anyLong(), any(LocalDateTime.class)))
            .thenReturn(new ArrayList<>());

        // Act
        WeeklyStatsDTO result = activityLogService.getWeeklyStats(1L);

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getTotalSessions());
        assertEquals(0, result.getTotalMinutes());
        assertEquals(0, result.getCurrentStreak());
        assertEquals(7, result.getDays().size());
    }

    @Test
    void testGetWeeklyStats_WithDateRange() {
        // Arrange
        String startDate = LocalDate.now().minusDays(6).toString();
        List<UserActivityLogEntity> activities = new ArrayList<>();
        
        when(activityLogRepository.findByUserIdAndCompletedAtAfter(anyLong(), any(LocalDateTime.class)))
            .thenReturn(activities);

        // Act
        WeeklyStatsDTO result = activityLogService.getWeeklyStats(1L, startDate, 7);

        // Assert
        assertNotNull(result);
        assertEquals(0, result.getTotalSessions());
        assertEquals(7, result.getDays().size());
    }

    @Test
    void testLogActivity_WithActivityDate() {
        // Arrange
        requestDTO.setActivityDate("2025-11-22");
        when(routineRepository.findById(1L)).thenReturn(Optional.of(testRoutine));
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        
        UserActivityLogEntity savedLog = new UserActivityLogEntity();
        savedLog.setId(1L);
        savedLog.setActivityDate(LocalDate.parse("2025-11-22"));
        
        when(activityLogRepository.save(any(UserActivityLogEntity.class))).thenReturn(savedLog);

        // Act
        ActivityLogConfirmationDTO result = activityLogService.logActivity(requestDTO, 1L);

        // Assert
        assertNotNull(result);
        assertEquals("success", result.getStatus());
    }

    @Test
    void testGetWeeklyStats_CalculatesStreakCorrectly() {
        // Arrange
        List<UserActivityLogEntity> activities = new ArrayList<>();
        
        // Actividades de los últimos 3 días consecutivos
        for (int i = 0; i < 3; i++) {
            UserActivityLogEntity activity = new UserActivityLogEntity();
            activity.setUser(testUser);
            activity.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
            activity.setDurationSeconds(600);
            activity.setCompletedAt(LocalDateTime.now().minusDays(i));
            activity.setActivityDate(LocalDate.now().minusDays(i));
            activities.add(activity);
        }

        when(activityLogRepository.findByUserIdAndCompletedAtAfter(anyLong(), any(LocalDateTime.class)))
            .thenReturn(activities);

        // Act
        WeeklyStatsDTO result = activityLogService.getWeeklyStats(1L);

        // Assert
        assertNotNull(result);
        assertTrue(result.getCurrentStreak() >= 0, "Streak should be calculated");
        assertEquals(3, result.getTotalSessions());
    }
}
