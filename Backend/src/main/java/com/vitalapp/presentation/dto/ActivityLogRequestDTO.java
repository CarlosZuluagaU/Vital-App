package com.vitalapp.presentation.dto;

public class ActivityLogRequestDTO {
    
    private String activityType;
    private Long relatedEntityId;
    private Integer durationSeconds;
    private Integer exerciseCount;
    private String activityDate; // YYYY-MM-DD enviado por el cliente (zona local)
    
    // Constructors
    public ActivityLogRequestDTO() {}
    
    public ActivityLogRequestDTO(String activityType,
                                 Long relatedEntityId,
                                 Integer durationSeconds,
                                 Integer exerciseCount,
                                 String activityDate) {
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
        this.durationSeconds = durationSeconds;
        this.exerciseCount = exerciseCount;
        this.activityDate = activityDate;
    }
    
    // Getters and Setters
    public String getActivityType() {
        return activityType;
    }
    
    public void setActivityType(String activityType) {
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

    public String getActivityDate() {
        return activityDate;
    }

    public void setActivityDate(String activityDate) {
        this.activityDate = activityDate;
    }
}
