package com.vitalapp.presentation.dto;

import java.util.List;

public class MulticomponentRoutineDTO {
    
    private Long id;
    private String title;
    private String description;
    private Integer totalDurationMinutes;
    private String intensityLevel;
    private String ageGroup; // "65-70", "71-75", "76-80", "80+"
    private List<ExerciseSummaryDTO> warmUpExercises;
    private List<ExerciseSummaryDTO> strengthExercises;
    private List<ExerciseSummaryDTO> balanceExercises;
    private List<ExerciseSummaryDTO> flexibilityExercises;
    private List<ExerciseSummaryDTO> cardioExercises;
    private List<ExerciseSummaryDTO> coolDownExercises;
    private String safetyNotes;
    private String adaptationNotes;
    private String benefitsDescription;
    
    // Constructors
    public MulticomponentRoutineDTO() {}
    
    public MulticomponentRoutineDTO(Long id, String title, String description, 
                                  Integer totalDurationMinutes, String intensityLevel, String ageGroup) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.totalDurationMinutes = totalDurationMinutes;
        this.intensityLevel = intensityLevel;
        this.ageGroup = ageGroup;
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
    
    public Integer getTotalDurationMinutes() {
        return totalDurationMinutes;
    }
    
    public void setTotalDurationMinutes(Integer totalDurationMinutes) {
        this.totalDurationMinutes = totalDurationMinutes;
    }
    
    public String getIntensityLevel() {
        return intensityLevel;
    }
    
    public void setIntensityLevel(String intensityLevel) {
        this.intensityLevel = intensityLevel;
    }
    
    public String getAgeGroup() {
        return ageGroup;
    }
    
    public void setAgeGroup(String ageGroup) {
        this.ageGroup = ageGroup;
    }
    
    public List<ExerciseSummaryDTO> getWarmUpExercises() {
        return warmUpExercises;
    }
    
    public void setWarmUpExercises(List<ExerciseSummaryDTO> warmUpExercises) {
        this.warmUpExercises = warmUpExercises;
    }
    
    public List<ExerciseSummaryDTO> getStrengthExercises() {
        return strengthExercises;
    }
    
    public void setStrengthExercises(List<ExerciseSummaryDTO> strengthExercises) {
        this.strengthExercises = strengthExercises;
    }
    
    public List<ExerciseSummaryDTO> getBalanceExercises() {
        return balanceExercises;
    }
    
    public void setBalanceExercises(List<ExerciseSummaryDTO> balanceExercises) {
        this.balanceExercises = balanceExercises;
    }
    
    public List<ExerciseSummaryDTO> getFlexibilityExercises() {
        return flexibilityExercises;
    }
    
    public void setFlexibilityExercises(List<ExerciseSummaryDTO> flexibilityExercises) {
        this.flexibilityExercises = flexibilityExercises;
    }
    
    public List<ExerciseSummaryDTO> getCardioExercises() {
        return cardioExercises;
    }
    
    public void setCardioExercises(List<ExerciseSummaryDTO> cardioExercises) {
        this.cardioExercises = cardioExercises;
    }
    
    public List<ExerciseSummaryDTO> getCoolDownExercises() {
        return coolDownExercises;
    }
    
    public void setCoolDownExercises(List<ExerciseSummaryDTO> coolDownExercises) {
        this.coolDownExercises = coolDownExercises;
    }
    
    public String getSafetyNotes() {
        return safetyNotes;
    }
    
    public void setSafetyNotes(String safetyNotes) {
        this.safetyNotes = safetyNotes;
    }
    
    public String getAdaptationNotes() {
        return adaptationNotes;
    }
    
    public void setAdaptationNotes(String adaptationNotes) {
        this.adaptationNotes = adaptationNotes;
    }
    
    public String getBenefitsDescription() {
        return benefitsDescription;
    }
    
    public void setBenefitsDescription(String benefitsDescription) {
        this.benefitsDescription = benefitsDescription;
    }
}
