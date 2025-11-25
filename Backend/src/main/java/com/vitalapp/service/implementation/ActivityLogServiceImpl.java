package com.vitalapp.service.implementation;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.UserActivityLogEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.persistence.repository.UserActivityLogRepository;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import com.vitalapp.service.interfaces.ActivityLogService;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {
    
    private static final Logger log = LoggerFactory.getLogger(ActivityLogServiceImpl.class);
    
    @Autowired
    private UserActivityLogRepository activityLogRepository;
    
    @Autowired
    private RoutineRepository routineRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public ActivityLogConfirmationDTO logActivity(ActivityLogRequestDTO requestDTO, Long userId) {
        log.info("===== ActivityLogService.logActivity =====");
        log.info("Received userId parameter: {}", userId);
        log.info("Activity type: {}", requestDTO.getActivityType());
        log.info("Related entity ID: {}", requestDTO.getRelatedEntityId());
        
        try {
            // Validar que la rutina existe
            Optional<RoutineEntity> routineOpt = routineRepository.findById(requestDTO.getRelatedEntityId());
            if (!routineOpt.isPresent()) {
                throw new RuntimeException("Routine not found with id: " + requestDTO.getRelatedEntityId());
            }
            
            // Crear el log de actividad con el tiempo real del usuario
            UserActivityLogEntity activityLog = new UserActivityLogEntity(
                    userId,
                    UserActivityLogEntity.ActivityType.valueOf(requestDTO.getActivityType()),
                    requestDTO.getRelatedEntityId(),
                    requestDTO.getActualDurationMinutes() // Tiempo real que tomó el usuario
            );
            
            log.info("Before save - activityLog.userId: {}", activityLog.getUserId());
            UserActivityLogEntity savedActivity = activityLogRepository.save(activityLog);
            log.info("===== AFTER SAVE =====");
            log.info("Saved activity ID: {}", savedActivity.getId());
            log.info("Saved activity userId: {}", savedActivity.getUserId());
            log.info("======================");
            log.info("Activity saved successfully");
            log.info("==========================================");
            
            // Por ahora, retornamos una confirmación simple
            // En el futuro aquí se pueden calcular logros/medallas
            return new ActivityLogConfirmationDTO("success", "Actividad registrada correctamente.");
            
        } catch (Exception e) {
            log.error("Error saving activity", e);
            return new ActivityLogConfirmationDTO("error", "Error al registrar la actividad: " + e.getMessage());
        }
    }

    @Override
    public WeeklyStatsDTO getWeeklyStats(Long userId) {
        try {
            // Calcular fecha de inicio de la semana (últimos 7 días)
            LocalDateTime endDate = LocalDateTime.now();
            LocalDateTime startDate = endDate.minusDays(6).toLocalDate().atStartOfDay();

            // Obtener actividades del usuario en la última semana
            List<UserActivityLogEntity> activities = activityLogRepository.findByUserIdAndCompletedAtAfter(userId, startDate);

            // Agrupar por fecha
            Map<LocalDate, List<UserActivityLogEntity>> activitiesByDate = activities.stream()
                .collect(Collectors.groupingBy(activity -> activity.getCompletedAt().toLocalDate()));

            // Crear lista de días con estadísticas
            List<WeeklyStatsDTO.DayStatsDTO> dayStats = new ArrayList<>();

            for (int i = 6; i >= 0; i--) {
                LocalDate date = LocalDate.now().minusDays(i);
                String dateStr = date.toString(); // YYYY-MM-DD format

                List<UserActivityLogEntity> dayActivities = activitiesByDate.getOrDefault(date, new ArrayList<>());
                int sessions = dayActivities.size();
                
                // Sumar el tiempo real que cada usuario tomó en cada actividad
                int totalMinutes = dayActivities.stream()
                    .mapToInt(activity -> activity.getActualDurationMinutes() != null ? activity.getActualDurationMinutes() : 0)
                    .sum();

                dayStats.add(new WeeklyStatsDTO.DayStatsDTO(dateStr, sessions, totalMinutes));
            }

            int totalSessions = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getSessions).sum();
            int totalMinutes = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getTotalMinutes).sum();
            int currentStreak = calculateCurrentStreak(userId);

            List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(activities);

            return new WeeklyStatsDTO(totalSessions, totalMinutes, currentStreak, dayStats, breakdown);

        } catch (Exception e) {
            List<WeeklyStatsDTO.DayStatsDTO> emptyDays = new ArrayList<>();
            for (int i = 6; i >= 0; i--) {
                LocalDate date = LocalDate.now().minusDays(i);
                emptyDays.add(new WeeklyStatsDTO.DayStatsDTO(date.toString(), 0, 0));
            }
            return new WeeklyStatsDTO(0, 0, 0, emptyDays, java.util.Collections.emptyList());
        }
    }

    @Override
    public WeeklyStatsDTO getWeeklyStats(Long userId, String startDateIso, Integer days) {
        try {
            int daysRange = (days != null && days > 0) ? days : 7;
            LocalDate startDate = (startDateIso != null && !startDateIso.isBlank())
                ? LocalDate.parse(startDateIso)
                : LocalDate.now().minusDays(daysRange - 1);

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = startDate.plusDays(daysRange).atStartOfDay();

            List<UserActivityLogEntity> activities = activityLogRepository
                .findByUserIdAndCompletedAtAfter(userId, startDateTime)
                .stream()
                .filter(a -> a.getCompletedAt().isBefore(endDateTime))
                .collect(Collectors.toList());

            Map<LocalDate, List<UserActivityLogEntity>> activitiesByDate = activities.stream()
                .collect(Collectors.groupingBy(activity -> activity.getCompletedAt().toLocalDate()));

            List<WeeklyStatsDTO.DayStatsDTO> dayStats = new ArrayList<>();

            for (int i = 0; i < daysRange; i++) {
                LocalDate date = startDate.plusDays(i);
                String dateStr = date.toString();

                List<UserActivityLogEntity> dayActivities = activitiesByDate.getOrDefault(date, new ArrayList<>());
                int sessions = dayActivities.size();
                
                // Sumar el tiempo real que cada usuario tomó en cada actividad
                int totalMinutes = dayActivities.stream()
                    .mapToInt(activity -> activity.getActualDurationMinutes() != null ? activity.getActualDurationMinutes() : 0)
                    .sum();

                dayStats.add(new WeeklyStatsDTO.DayStatsDTO(dateStr, sessions, totalMinutes));
            }

            int totalSessions = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getSessions).sum();
            int totalMinutes = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getTotalMinutes).sum();
            int currentStreak = calculateCurrentStreak(userId);

            List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(activities);

            return new WeeklyStatsDTO(totalSessions, totalMinutes, currentStreak, dayStats, breakdown);

        } catch (Exception e) {
            e.printStackTrace();
            List<WeeklyStatsDTO.DayStatsDTO> emptyDays = new ArrayList<>();
            int daysRange = (days != null && days > 0) ? days : 7;
            LocalDate startDate = LocalDate.now().minusDays(daysRange - 1);
            for (int i = 0; i < daysRange; i++) {
                LocalDate date = startDate.plusDays(i);
                emptyDays.add(new WeeklyStatsDTO.DayStatsDTO(date.toString(), 0, 0));
            }
            return new WeeklyStatsDTO(0, 0, 0, emptyDays, java.util.Collections.emptyList());
        }
    }

    private int calculateCurrentStreak(Long userId) {
        try {
            LocalDate today = LocalDate.now();
            int streak = 0;

            for (int i = 0; i < 365; i++) {
                LocalDate checkDate = today.minusDays(i);
                LocalDateTime startOfDay = checkDate.atStartOfDay();
                LocalDateTime endOfDay = checkDate.plusDays(1).atStartOfDay();

                List<UserActivityLogEntity> dayActivities = activityLogRepository
                    .findByUserIdAndCompletedAtAfter(userId, startOfDay)
                    .stream()
                    .filter(a -> a.getCompletedAt().isBefore(endOfDay))
                    .filter(a -> a.getCompletedAt().toLocalDate().equals(checkDate))
                    .collect(Collectors.toList());

                if (dayActivities.isEmpty()) {
                    break;
                }

                streak++;
            }

            return streak;

        } catch (Exception e) {
            return 0;
        }
    }
}
