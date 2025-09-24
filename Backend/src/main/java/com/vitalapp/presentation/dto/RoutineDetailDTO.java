package com.vitalapp.presentation.dto;

public class RoutineDetailDTO {
    
    private Long id;
    private String title;
    private String description;
    private Integer durationMinutes;
    private String intensityName;
    private String categoryName;
    private String videoUrl;
    
    // Constructors
    public RoutineDetailDTO() {}
    
    public RoutineDetailDTO(Long id, String title, String description, Integer durationMinutes, 
                          String intensityName, String categoryName, String videoUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.durationMinutes = durationMinutes;
        this.intensityName = intensityName;
        this.categoryName = categoryName;
        this.videoUrl = videoUrl;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Integer getDurationMinutes() {
        return durationMinutes;
    }
    
    public void setDurationMinutes(Integer durationMinutes) {
        this.durationMinutes = durationMinutes;
    }
    
    public String getIntensityName() {
        return intensityName;
    }
    
    public void setIntensityName(String intensityName) {
        this.intensityName = intensityName;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
}
