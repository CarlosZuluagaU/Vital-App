package com.vitalapp.presentation.dto;

public class RoutineSummaryDTO {
    
    private Long id;
    private String title;
    private Integer durationMinutes;
    private String intensityName;
    private String categoryName;
    private String thumbnailUrl;
    
    // Constructors
    public RoutineSummaryDTO() {}
    
    public RoutineSummaryDTO(Long id, String title, Integer durationMinutes, 
                           String intensityName, String categoryName, String thumbnailUrl) {
        this.id = id;
        this.title = title;
        this.durationMinutes = durationMinutes;
        this.intensityName = intensityName;
        this.categoryName = categoryName;
        this.thumbnailUrl = thumbnailUrl;
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
    
    public String getThumbnailUrl() {
        return thumbnailUrl;
    }
    
    public void setThumbnailUrl(String thumbnailUrl) {
        this.thumbnailUrl = thumbnailUrl;
    }
}
