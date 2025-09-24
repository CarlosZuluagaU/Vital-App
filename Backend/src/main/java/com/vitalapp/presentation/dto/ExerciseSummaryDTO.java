package com.vitalapp.presentation.dto;

public class ExerciseSummaryDTO {
    
    private Long id;
    private String name;
    private String description;
    private String categoryName;
    private String intensityName;
    private String exerciseTypeName;
    private String locationType;
    private Integer durationSeconds;
    private Integer repetitions;
    private Integer sets;
    private String imageUrl;
    private String videoUrl;
    private String safetyTips;
    private String benefitsDescription;
    
    // Constructors
    public ExerciseSummaryDTO() {}
    
    public ExerciseSummaryDTO(Long id, String name, String description, String categoryName,
                            String intensityName, String exerciseTypeName, String locationType,
                            Integer durationSeconds, Integer repetitions, Integer sets, String imageUrl,
                            String videoUrl, String safetyTips, String benefitsDescription) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.categoryName = categoryName;
        this.intensityName = intensityName;
        this.exerciseTypeName = exerciseTypeName;
        this.locationType = locationType;
        this.durationSeconds = durationSeconds;
        this.repetitions = repetitions;
        this.sets = sets;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.safetyTips = safetyTips;
        this.benefitsDescription = benefitsDescription;
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
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public String getIntensityName() {
        return intensityName;
    }
    
    public void setIntensityName(String intensityName) {
        this.intensityName = intensityName;
    }
    
    public String getExerciseTypeName() {
        return exerciseTypeName;
    }
    
    public void setExerciseTypeName(String exerciseTypeName) {
        this.exerciseTypeName = exerciseTypeName;
    }
    
    public String getLocationType() {
        return locationType;
    }
    
    public void setLocationType(String locationType) {
        this.locationType = locationType;
    }
    
    public Integer getDurationSeconds() {
        return durationSeconds;
    }
    
    public void setDurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }
    
    public Integer getRepetitions() {
        return repetitions;
    }
    
    public void setRepetitions(Integer repetitions) {
        this.repetitions = repetitions;
    }
    
    public Integer getSets() {
        return sets;
    }
    
    public void setSets(Integer sets) {
        this.sets = sets;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getSafetyTips() {
        return safetyTips;
    }
    
    public void setSafetyTips(String safetyTips) {
        this.safetyTips = safetyTips;
    }
    
    public String getBenefitsDescription() {
        return benefitsDescription;
    }
    
    public void setBenefitsDescription(String benefitsDescription) {
        this.benefitsDescription = benefitsDescription;
    }
}
