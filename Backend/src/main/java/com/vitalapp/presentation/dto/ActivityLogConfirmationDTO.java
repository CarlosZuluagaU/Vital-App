package com.vitalapp.presentation.dto;

import java.util.List;

public class ActivityLogConfirmationDTO {
    
    private String status;
    private String message;
    private List<AchievementDTO> newAchievements;
    
    // Constructors
    public ActivityLogConfirmationDTO() {}
    
    public ActivityLogConfirmationDTO(String status, String message) {
        this.status = status;
        this.message = message;
    }
    
    public ActivityLogConfirmationDTO(String status, String message, List<AchievementDTO> newAchievements) {
        this.status = status;
        this.message = message;
        this.newAchievements = newAchievements;
    }
    
    // Getters and Setters
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public List<AchievementDTO> getNewAchievements() {
        return newAchievements;
    }
    
    public void setNewAchievements(List<AchievementDTO> newAchievements) {
        this.newAchievements = newAchievements;
    }
    
    // Inner class for Achievement
    public static class AchievementDTO {
        private Long id;
        private String name;
        private String description;
        private String iconUrl;
        
        public AchievementDTO() {}
        
        public AchievementDTO(Long id, String name, String description, String iconUrl) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.iconUrl = iconUrl;
        }
        
        // Getters and Setters
        public Long getId() {
            return id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getDescription() {
            return description;
        }
        
        public void setDescription(String description) {
            this.description = description;
        }
        
        public String getIconUrl() {
            return iconUrl;
        }
        
        public void setIconUrl(String iconUrl) {
            this.iconUrl = iconUrl;
        }
    }
}
