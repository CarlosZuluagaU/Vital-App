package com.vitalapp.presentation.dto;

public class ActivityLogRequestDTO {
    
    private String activityType;
    private Long relatedEntityId;
    private Integer actualDurationMinutes; // Tiempo real que tomó el usuario
    
    // Constructors
    public ActivityLogRequestDTO() {}
    
    public ActivityLogRequestDTO(String activityType, Long relatedEntityId) {
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
    }
    
    public ActivityLogRequestDTO(String activityType, Long relatedEntityId, Integer actualDurationMinutes) {
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
        this.actualDurationMinutes = actualDurationMinutes;
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
    
    public Integer getActualDurationMinutes() {
        return actualDurationMinutes;
    }
    
    public void setActualDurationMinutes(Integer actualDurationMinutes) {
        this.actualDurationMinutes = actualDurationMinutes;
    }
}
