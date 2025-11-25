package com.vitalapp.persistence.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_activity_log")
public class UserActivityLogEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    // TEMPORALMENTE cambiado de ManyToOne a Long directo para debug
    @Column(name = "user_id", nullable = false)
    private Long userId;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false, length = 50)
    private ActivityType activityType;
    
    @Column(name = "related_entity_id", nullable = false)
    private Long relatedEntityId;
    
    @Column(name = "actual_duration_minutes")
    private Integer actualDurationMinutes; // Tiempo real que tomó el usuario
    
    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;
    
    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
    }
    
    // Constructors
    public UserActivityLogEntity() {}
    
    public UserActivityLogEntity(Long userId, ActivityType activityType, Long relatedEntityId) {
        this.userId = userId;
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
    }
    
    public UserActivityLogEntity(Long userId, ActivityType activityType, Long relatedEntityId, Integer actualDurationMinutes) {
        this.userId = userId;
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
        this.actualDurationMinutes = actualDurationMinutes;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getUserId() {
        return userId;
    }
    
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    
    public ActivityType getActivityType() {
        return activityType;
    }
    
    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }
    
    public Long getRelatedEntityId() {
        return relatedEntityId;
    }
    
    public void setRelatedEntityId(Long relatedEntityId) {
        this.relatedEntityId = relatedEntityId;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
    
    public Integer getActualDurationMinutes() {
        return actualDurationMinutes;
    }
    
    public void setActualDurationMinutes(Integer actualDurationMinutes) {
        this.actualDurationMinutes = actualDurationMinutes;
    }
    
    // Enum for activity types
    public enum ActivityType {
        ROUTINE_COMPLETED
    }
}
