package com.vitalapp.persistence.entity;

import java.time.LocalDate;
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "activity_type", nullable = false, length = 50)
    private ActivityType activityType;
    
    @Column(name = "related_entity_id", nullable = false)
    private Long relatedEntityId;
    
    @Column(name = "duration_seconds", nullable = false)
    private Integer durationSeconds;
    
    @Column(name = "exercise_count", nullable = false)
    private Integer exerciseCount;
    
    @Column(name = "completed_at", nullable = false)
    private LocalDateTime completedAt;

    @Column(name = "activity_date", nullable = false)
    private LocalDate activityDate;
    
    @PrePersist
    protected void onCreate() {
        completedAt = LocalDateTime.now();
        if (activityDate == null) {
            activityDate = completedAt.toLocalDate();
        }
    }
    
    // Constructors
    public UserActivityLogEntity() {}
    
    public UserActivityLogEntity(UserEntity user,
                                ActivityType activityType,
                                Long relatedEntityId,
                                Integer durationSeconds,
                                Integer exerciseCount) {
        this.user = user;
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
        this.durationSeconds = durationSeconds;
        this.exerciseCount = exerciseCount;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public UserEntity getUser() {
        return user;
    }
    
    public void setUser(UserEntity user) {
        this.user = user;
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
    
    public Integer getDurationSeconds() {
        return durationSeconds;
    }
    
    public void setDurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }
    
    public Integer getExerciseCount() {
        return exerciseCount;
    }
    
    public void setExerciseCount(Integer exerciseCount) {
        this.exerciseCount = exerciseCount;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }

    public LocalDate getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(LocalDate activityDate) {
        this.activityDate = activityDate;
    }
    
    // Enum for activity types
    public enum ActivityType {
        ROUTINE_COMPLETED
    }
}
