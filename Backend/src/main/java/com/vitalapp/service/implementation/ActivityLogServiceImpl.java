package com.vitalapp.service.implementation;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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
    
    @Autowired
    private UserActivityLogRepository activityLogRepository;
    
    @Autowired
    private RoutineRepository routineRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public ActivityLogConfirmationDTO logActivity(ActivityLogRequestDTO requestDTO, Long userId) {
        try {
            System.out.println("[ActivityLogService] Registrando actividad para usuario: " + userId);
            System.out.println("[ActivityLogService] Datos recibidos: " + requestDTO);
            
            // Validar que la rutina existe
            Optional<RoutineEntity> routineOpt = routineRepository.findById(requestDTO.getRelatedEntityId());
            if (!routineOpt.isPresent()) {
                throw new RuntimeException("Routine not found with id: " + requestDTO.getRelatedEntityId());
            }
            
            // Obtener el usuario de la base de datos
            Optional<UserEntity> userOpt = userRepository.findById(userId);
            if (!userOpt.isPresent()) {
                throw new RuntimeException("User not found with id: " + userId);
            }
            
            UserEntity user = userOpt.get();
            
            if (requestDTO.getDurationSeconds() == null || requestDTO.getDurationSeconds() <= 0) {
                throw new IllegalArgumentException("durationSeconds must be greater than 0");
            }
            if (requestDTO.getExerciseCount() == null || requestDTO.getExerciseCount() < 0) {
                throw new IllegalArgumentException("exerciseCount must be 0 or greater");
            }
            
            // Crear el log de actividad
            UserActivityLogEntity activityLog = new UserActivityLogEntity(
                user,
                UserActivityLogEntity.ActivityType.valueOf(requestDTO.getActivityType()),
                requestDTO.getRelatedEntityId(),
                requestDTO.getDurationSeconds(),
                requestDTO.getExerciseCount()
            );

            // Ajustar activityDate si llega desde el cliente
            if (requestDTO.getActivityDate() != null && !requestDTO.getActivityDate().isBlank()) {
                try {
                    LocalDate clientDate = LocalDate.parse(requestDTO.getActivityDate());
                    activityLog.setActivityDate(clientDate);
                    System.out.println("[ActivityLogService] Fecha de actividad ajustada a: " + clientDate);
                } catch (DateTimeParseException ex) {
                    System.out.println("[ActivityLogService] Error parseando fecha, usando fecha actual");
                }
            }

            UserActivityLogEntity saved = activityLogRepository.save(activityLog);
            System.out.println("[ActivityLogService] Actividad guardada con ID: " + saved.getId() + 
                             " para usuario: " + userId + 
                             " en fecha: " + saved.getActivityDate() +
                             " duración: " + saved.getDurationSeconds() + "s");
            
            return new ActivityLogConfirmationDTO("success", "Actividad registrada correctamente.");
            
        } catch (Exception e) {
            System.err.println("[ActivityLogService] Error registrando actividad: " + e.getMessage());
            e.printStackTrace();
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
                .collect(Collectors.groupingBy(activity -> {
                    LocalDate d = activity.getActivityDate();
                    return d != null ? d : activity.getCompletedAt().toLocalDate();
                }));
            
            // Crear lista de días con estadísticas
            List<WeeklyStatsDTO.DayStatsDTO> dayStats = new ArrayList<>();
            
                for (int i = 6; i >= 0; i--) {
                LocalDate date = LocalDate.now().minusDays(i);
                String dateStr = date.toString(); // YYYY-MM-DD format

                List<UserActivityLogEntity> dayActivities = activitiesByDate.getOrDefault(date, new ArrayList<>());
                int sessions = dayActivities.size();
                int totalSecondsDay = dayActivities.stream()
                    .mapToInt(log -> log.getDurationSeconds() != null ? log.getDurationSeconds() : 0)
                    .sum();
                // Usar ceil para no perder sesiones cortas (<60s) y garantizar mínimo 1 min si hubo actividad.
                int totalMinutes = (sessions > 0 && totalSecondsDay > 0)
                    ? (int) Math.ceil(totalSecondsDay / 60.0)
                    : 0;

                dayStats.add(new WeeklyStatsDTO.DayStatsDTO(dateStr, sessions, totalMinutes));
                }

                // Calcular totales a partir de dayStats para consistencia (suma de minutos y sesiones)
                int totalSessions = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getSessions).sum();
                int totalMinutes = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getTotalMinutes).sum();
                
                // Calcular racha de días consecutivos (desde hoy hacia atrás)
                int currentStreak = calculateCurrentStreak(userId);

                List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(activities);
                return new WeeklyStatsDTO(totalSessions, totalMinutes, currentStreak, dayStats, breakdown);
            
        } catch (Exception e) {
            // En caso de error, devolver datos vacíos
            List<WeeklyStatsDTO.DayStatsDTO> emptyDays = new ArrayList<>();
            for (int i = 6; i >= 0; i--) {
                LocalDate date = LocalDate.now().minusDays(i);
                emptyDays.add(new WeeklyStatsDTO.DayStatsDTO(date.toString(), 0, 0));
            }
            return new WeeklyStatsDTO(0, 0, 0, emptyDays, java.util.Collections.emptyList());
        }
    }
    
    /**
     * Calcula la racha de días consecutivos desde hoy hacia atrás.
     * Un día cuenta si tiene al menos 1 sesión de ejercicio.
     */
    private int calculateCurrentStreak(Long userId) {
        try {
            LocalDate today = LocalDate.now();
            int streak = 0;
            
            // Verificar desde hoy hacia atrás, día por día
            for (int i = 0; i < 365; i++) { // Máximo 365 días hacia atrás
                LocalDate checkDate = today.minusDays(i);
                LocalDateTime startOfDay = checkDate.atStartOfDay();
                LocalDateTime endOfDay = checkDate.plusDays(1).atStartOfDay();
                
                // Buscar actividades en este día específico
                List<UserActivityLogEntity> dayActivities = activityLogRepository
                    .findByUserIdAndCompletedAtAfter(userId, startOfDay)
                    .stream()
                    .filter(a -> a.getCompletedAt().isBefore(endOfDay))
                    .filter(a -> {
                        LocalDate actDate = a.getActivityDate() != null ? a.getActivityDate() : a.getCompletedAt().toLocalDate();
                        return actDate.equals(checkDate);
                    })
                    .collect(Collectors.toList());
                
                if (dayActivities.isEmpty()) {
                    // No hay actividad este día, la racha se rompe
                    break;
                }
                
                // Hay actividad, incrementar racha
                streak++;
            }
            
            System.out.println("[ActivityLogService] Racha calculada para usuario " + userId + ": " + streak + " días");
            return streak;
            
        } catch (Exception e) {
            System.err.println("[ActivityLogService] Error calculando racha: " + e.getMessage());
            return 0;
        }
    }

    @Override
    public WeeklyStatsDTO getWeeklyStats(Long userId, String startDateIso, Integer days) {
        try {
            System.out.println("[ActivityLogService] Obteniendo estadísticas para usuario: " + userId + 
                             ", inicio: " + startDateIso + ", días: " + days);
            
            int rangeDays = (days != null && days > 0 && days <= 31) ? days : 7;
            LocalDate startDateLocal;
            if (startDateIso != null && !startDateIso.isBlank()) {
                try { startDateLocal = LocalDate.parse(startDateIso); }
                catch (Exception ex) { startDateLocal = LocalDate.now().with(java.time.DayOfWeek.MONDAY); }
            } else {
                startDateLocal = LocalDate.now().with(java.time.temporal.TemporalAdjusters.previousOrSame(java.time.DayOfWeek.MONDAY));
            }

            LocalDateTime startDateTime = startDateLocal.atStartOfDay();
            LocalDateTime endExclusive = startDateLocal.plusDays(rangeDays).atStartOfDay();

            System.out.println("[ActivityLogService] Buscando actividades entre " + startDateTime + " y " + endExclusive);

            List<UserActivityLogEntity> activities = activityLogRepository.findByUserIdAndCompletedAtAfter(userId, startDateTime)
                .stream()
                .filter(a -> a.getCompletedAt().isBefore(endExclusive))
                .collect(Collectors.toList());

            System.out.println("[ActivityLogService] Actividades encontradas: " + activities.size());

            Map<LocalDate, List<UserActivityLogEntity>> activitiesByDate = activities.stream()
                .collect(Collectors.groupingBy(a -> a.getActivityDate() != null ? a.getActivityDate() : a.getCompletedAt().toLocalDate()));

            List<WeeklyStatsDTO.DayStatsDTO> dayStats = new ArrayList<>();
            for (int i = 0; i < rangeDays; i++) {
                LocalDate date = startDateLocal.plusDays(i);
                String dateStr = date.toString();
                List<UserActivityLogEntity> dayActivities = activitiesByDate.getOrDefault(date, new ArrayList<>());
                int sessions = dayActivities.size();
                int totalSecondsDay = dayActivities.stream()
                    .mapToInt(log -> log.getDurationSeconds() != null ? log.getDurationSeconds() : 0)
                    .sum();
                int totalMinutes = (sessions > 0 && totalSecondsDay > 0) ? (int) Math.ceil(totalSecondsDay / 60.0) : 0;
                dayStats.add(new WeeklyStatsDTO.DayStatsDTO(dateStr, sessions, totalMinutes));
            }

            int totalSessions = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getSessions).sum();
            int totalMinutes = dayStats.stream().mapToInt(WeeklyStatsDTO.DayStatsDTO::getTotalMinutes).sum();
            
            // Calcular racha de días consecutivos (desde hoy hacia atrás)
            int currentStreak = calculateCurrentStreak(userId);

            System.out.println("[ActivityLogService] Estadísticas calculadas - Sesiones: " + totalSessions + ", Minutos: " + totalMinutes + ", Racha: " + currentStreak);

            List<WeeklyStatsDTO.ActivityTypeBreakdownDTO> breakdown = WeeklyStatsDTO.buildBreakdown(activities);
            return new WeeklyStatsDTO(totalSessions, totalMinutes, currentStreak, dayStats, breakdown);
        } catch (Exception e) {
            System.err.println("[ActivityLogService] Error obteniendo estadísticas: " + e.getMessage());
            e.printStackTrace();
            List<WeeklyStatsDTO.DayStatsDTO> empty = new ArrayList<>();
            for (int i = 0; i < (days != null && days > 0 ? days : 7); i++) {
                LocalDate date = LocalDate.now().minusDays((days != null && days > 0 ? days : 7) - 1 - i);
                empty.add(new WeeklyStatsDTO.DayStatsDTO(date.toString(), 0, 0));
            }
            return new WeeklyStatsDTO(0, 0, 0, empty, java.util.Collections.emptyList());
        }
    }
}
