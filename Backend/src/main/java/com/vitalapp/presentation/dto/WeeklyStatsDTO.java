package com.vitalapp.presentation.dto;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class WeeklyStatsDTO {
    
    private int totalSessions;
    private int totalMinutes;
    private int currentStreak; // Racha de días consecutivos
    private List<DayStatsDTO> days;
    private List<ActivityTypeBreakdownDTO> breakdown;
    
    // Constructors
    public WeeklyStatsDTO() {}
    
    public WeeklyStatsDTO(int totalSessions, int totalMinutes, List<DayStatsDTO> days) {
        this.totalSessions = totalSessions;
        this.totalMinutes = totalMinutes;
        this.currentStreak = 0;
        this.days = days;
    }

    public WeeklyStatsDTO(int totalSessions, int totalMinutes, List<DayStatsDTO> days, List<ActivityTypeBreakdownDTO> breakdown) {
        this.totalSessions = totalSessions;
        this.totalMinutes = totalMinutes;
        this.currentStreak = 0;
        this.days = days;
        this.breakdown = breakdown;
    }

    public WeeklyStatsDTO(int totalSessions, int totalMinutes, int currentStreak, List<DayStatsDTO> days, List<ActivityTypeBreakdownDTO> breakdown) {
        this.totalSessions = totalSessions;
        this.totalMinutes = totalMinutes;
        this.currentStreak = currentStreak;
        this.days = days;
        this.breakdown = breakdown;
    }
    
    // Getters and Setters
    public int getTotalSessions() {
        return totalSessions;
    }
    
    public void setTotalSessions(int totalSessions) {
        this.totalSessions = totalSessions;
    }
    
    public int getTotalMinutes() {
        return totalMinutes;
    }
    
    public void setTotalMinutes(int totalMinutes) {
        this.totalMinutes = totalMinutes;
    }
    
    public int getCurrentStreak() {
        return currentStreak;
    }
    
    public void setCurrentStreak(int currentStreak) {
        this.currentStreak = currentStreak;
    }
    
    public List<DayStatsDTO> getDays() {
        return days;
    }
    
    public void setDays(List<DayStatsDTO> days) {
        this.days = days;
    }
    
    public List<ActivityTypeBreakdownDTO> getBreakdown() {
        return breakdown;
    }
    
    public void setBreakdown(List<ActivityTypeBreakdownDTO> breakdown) {
        this.breakdown = breakdown;
    }
    
    // Inner class for daily stats
    public static class DayStatsDTO {
        private String date; // YYYY-MM-DD format
        private int sessions;
        private int totalMinutes; // Por ahora será 0, lo expandiremos después
        
        public DayStatsDTO() {}
        
        public DayStatsDTO(String date, int sessions, int totalMinutes) {
            this.date = date;
            this.sessions = sessions;
            this.totalMinutes = totalMinutes;
        }
        
        // Getters and Setters
        public String getDate() {
            return date;
        }
        
        public void setDate(String date) {
            this.date = date;
        }
        
        public int getSessions() {
            return sessions;
        }
        
        public void setSessions(int sessions) {
            this.sessions = sessions;
        }
        
        public int getTotalMinutes() {
            return totalMinutes;
        }
        
        public void setTotalMinutes(int totalMinutes) {
            this.totalMinutes = totalMinutes;
        }
    }

    // Breakdown por tipo de actividad
    public static class ActivityTypeBreakdownDTO {
        private String activityType;
        private int sessions;
        private int totalMinutes;

        public ActivityTypeBreakdownDTO() {}
        public ActivityTypeBreakdownDTO(String activityType, int sessions, int totalMinutes) {
            this.activityType = activityType;
            this.sessions = sessions;
            this.totalMinutes = totalMinutes;
        }
        public String getActivityType() { return activityType; }
        public void setActivityType(String activityType) { this.activityType = activityType; }
        public int getSessions() { return sessions; }
        public void setSessions(int sessions) { this.sessions = sessions; }
        public int getTotalMinutes() { return totalMinutes; }
        public void setTotalMinutes(int totalMinutes) { this.totalMinutes = totalMinutes; }
    }

    // Helper estático para construir breakdown desde lista de logs
    public static List<ActivityTypeBreakdownDTO> buildBreakdown(List<? extends com.vitalapp.persistence.entity.UserActivityLogEntity> logs) {
        Map<String, List<com.vitalapp.persistence.entity.UserActivityLogEntity>> byType = logs.stream()
            .collect(Collectors.groupingBy(l -> l.getActivityType() != null ? l.getActivityType().name() : "UNKNOWN"));
        return byType.entrySet().stream()
            .map(e -> {
                int sessions = e.getValue().size();
                int totalSeconds = e.getValue().stream().mapToInt(l -> l.getDurationSeconds() != null ? l.getDurationSeconds() : 0).sum();
                int totalMinutes = sessions > 0 && totalSeconds > 0 ? (int) Math.ceil(totalSeconds / 60.0) : 0;
                return new ActivityTypeBreakdownDTO(e.getKey(), sessions, totalMinutes);
            })
            .sorted((a,b) -> b.getSessions() - a.getSessions())
            .collect(Collectors.toList());
    }
}