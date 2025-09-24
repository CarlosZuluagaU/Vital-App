package com.vitalapp.presentation.dto;

public class ExerciseDetailDTO {
    
    private Long id;
    private String name;
    private String description;
    private String instructions;
    private String safetyTips;
    private String modifications;
    private String benefits;
    private String categoryName;
    private String intensityName;
    private String exerciseTypeName;
    private String locationType;
    private Integer durationSeconds;
    private Integer repetitions;
    private Integer sets;
    private String videoUrl;
    private String imageUrl;
    
    // Constructors
    public ExerciseDetailDTO() {}
    
    public ExerciseDetailDTO(Long id, String name, String description, String instructions,
                           String safetyTips, String modifications, String benefits,
                           String categoryName, String intensityName, String exerciseTypeName,
                           String locationType, Integer durationSeconds, Integer repetitions,
                           Integer sets, String videoUrl, String imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.instructions = instructions;
        this.safetyTips = safetyTips;
        this.modifications = modifications;
        this.benefits = benefits;
        this.categoryName = categoryName;
        this.intensityName = intensityName;
        this.exerciseTypeName = exerciseTypeName;
        this.locationType = locationType;
        this.durationSeconds = durationSeconds;
        this.repetitions = repetitions;
        this.sets = sets;
        this.videoUrl = videoUrl;
        this.imageUrl = imageUrl;
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
    
    public String getInstructions() {
        return instructions;
    }
    
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    
    public String getSafetyTips() {
        return safetyTips;
    }
    
    public void setSafetyTips(String safetyTips) {
        this.safetyTips = safetyTips;
    }
    
    public String getModifications() {
        return modifications;
    }
    
    public void setModifications(String modifications) {
        this.modifications = modifications;
    }
    
    public String getBenefits() {
        return benefits;
    }
    
    public void setBenefits(String benefits) {
        this.benefits = benefits;
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
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
