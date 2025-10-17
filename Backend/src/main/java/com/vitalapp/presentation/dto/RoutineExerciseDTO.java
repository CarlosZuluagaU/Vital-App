package com.vitalapp.presentation.dto;

public class RoutineExerciseDTO {
    private Long exerciseId;
    private String exerciseName;
    private String description;
    private String instructions;
    private String imageUrl;
    private String videoUrl;
    private Integer exerciseOrder;
    private Integer durationSeconds;
    private Integer repetitions;
    private Integer sets;
    private Integer restSeconds;
    private String category;
    private String intensity;
    private String exerciseType;
    private String benefits;
    private String safetyTips;
    private String modifications;
    
    // Constructor vacío
    public RoutineExerciseDTO() {}
    
    // Constructor completo
    public RoutineExerciseDTO(Long exerciseId, String exerciseName, String description,
                            String instructions, String imageUrl, String videoUrl,
                            Integer exerciseOrder, Integer durationSeconds, Integer repetitions,
                            Integer sets, Integer restSeconds, String category,
                            String intensity, String exerciseType, String benefits,
                            String safetyTips, String modifications) {
        this.exerciseId = exerciseId;
        this.exerciseName = exerciseName;
        this.description = description;
        this.instructions = instructions;
        this.imageUrl = imageUrl;
        this.videoUrl = videoUrl;
        this.exerciseOrder = exerciseOrder;
        this.durationSeconds = durationSeconds;
        this.repetitions = repetitions;
        this.sets = sets;
        this.restSeconds = restSeconds;
        this.category = category;
        this.intensity = intensity;
        this.exerciseType = exerciseType;
        this.benefits = benefits;
        this.safetyTips = safetyTips;
        this.modifications = modifications;
    }
    
    // Getters y Setters
    public Long getExerciseId() { 
        return exerciseId; 
    }
    
    public void setExerciseId(Long exerciseId) { 
        this.exerciseId = exerciseId; 
    }
    
    public String getExerciseName() { 
        return exerciseName; 
    }
    
    public void setExerciseName(String exerciseName) { 
        this.exerciseName = exerciseName; 
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
    
    public Integer getExerciseOrder() { 
        return exerciseOrder; 
    }
    
    public void setExerciseOrder(Integer exerciseOrder) { 
        this.exerciseOrder = exerciseOrder; 
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
    
    public Integer getRestSeconds() { 
        return restSeconds; 
    }
    
    public void setRestSeconds(Integer restSeconds) { 
        this.restSeconds = restSeconds; 
    }
    
    public String getCategory() { 
        return category; 
    }
    
    public void setCategory(String category) { 
        this.category = category; 
    }
    
    public String getIntensity() { 
        return intensity; 
    }
    
    public void setIntensity(String intensity) { 
        this.intensity = intensity; 
    }
    
    public String getExerciseType() { 
        return exerciseType; 
    }
    
    public void setExerciseType(String exerciseType) { 
        this.exerciseType = exerciseType; 
    }
    
    public String getBenefits() { 
        return benefits; 
    }
    
    public void setBenefits(String benefits) { 
        this.benefits = benefits; 
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
}