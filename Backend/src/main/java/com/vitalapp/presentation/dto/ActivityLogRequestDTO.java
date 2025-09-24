package com.vitalapp.presentation.dto;

public class ActivityLogRequestDTO {
    
    private String activityType;
    private Long relatedEntityId;
    
    // Constructors
    public ActivityLogRequestDTO() {}
    
    public ActivityLogRequestDTO(String activityType, Long relatedEntityId) {
        this.activityType = activityType;
        this.relatedEntityId = relatedEntityId;
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
}
