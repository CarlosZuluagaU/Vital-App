package com.vitalapp.presentation.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para recibir respuestas del cuestionario SUS
 */
public class SusResponseDTO {
    
    @NotNull(message = "La pregunta 1 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q1Frequency;
    
    @NotNull(message = "La pregunta 2 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q2Complexity;
    
    @NotNull(message = "La pregunta 3 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q3Ease;
    
    @NotNull(message = "La pregunta 4 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q4SupportNeeded;
    
    @NotNull(message = "La pregunta 5 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q5Integration;
    
    @NotNull(message = "La pregunta 6 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q6Inconsistency;
    
    @NotNull(message = "La pregunta 7 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q7LearningSpeed;
    
    @NotNull(message = "La pregunta 8 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q8Cumbersome;
    
    @NotNull(message = "La pregunta 9 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q9Confidence;
    
    @NotNull(message = "La pregunta 10 es requerida")
    @Min(value = 1, message = "El valor mínimo es 1")
    @Max(value = 5, message = "El valor máximo es 5")
    private Integer q10LearningDifficulty;
    
    private String version;
    private String environment;
    private Integer sessionDurationMinutes;
    private String comments;
    
    // Constructors
    public SusResponseDTO() {}
    
    // Getters and Setters
    public Integer getQ1Frequency() {
        return q1Frequency;
    }
    
    public void setQ1Frequency(Integer q1Frequency) {
        this.q1Frequency = q1Frequency;
    }
    
    public Integer getQ2Complexity() {
        return q2Complexity;
    }
    
    public void setQ2Complexity(Integer q2Complexity) {
        this.q2Complexity = q2Complexity;
    }
    
    public Integer getQ3Ease() {
        return q3Ease;
    }
    
    public void setQ3Ease(Integer q3Ease) {
        this.q3Ease = q3Ease;
    }
    
    public Integer getQ4SupportNeeded() {
        return q4SupportNeeded;
    }
    
    public void setQ4SupportNeeded(Integer q4SupportNeeded) {
        this.q4SupportNeeded = q4SupportNeeded;
    }
    
    public Integer getQ5Integration() {
        return q5Integration;
    }
    
    public void setQ5Integration(Integer q5Integration) {
        this.q5Integration = q5Integration;
    }
    
    public Integer getQ6Inconsistency() {
        return q6Inconsistency;
    }
    
    public void setQ6Inconsistency(Integer q6Inconsistency) {
        this.q6Inconsistency = q6Inconsistency;
    }
    
    public Integer getQ7LearningSpeed() {
        return q7LearningSpeed;
    }
    
    public void setQ7LearningSpeed(Integer q7LearningSpeed) {
        this.q7LearningSpeed = q7LearningSpeed;
    }
    
    public Integer getQ8Cumbersome() {
        return q8Cumbersome;
    }
    
    public void setQ8Cumbersome(Integer q8Cumbersome) {
        this.q8Cumbersome = q8Cumbersome;
    }
    
    public Integer getQ9Confidence() {
        return q9Confidence;
    }
    
    public void setQ9Confidence(Integer q9Confidence) {
        this.q9Confidence = q9Confidence;
    }
    
    public Integer getQ10LearningDifficulty() {
        return q10LearningDifficulty;
    }
    
    public void setQ10LearningDifficulty(Integer q10LearningDifficulty) {
        this.q10LearningDifficulty = q10LearningDifficulty;
    }
    
    public String getVersion() {
        return version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }
    
    public String getEnvironment() {
        return environment;
    }
    
    public void setEnvironment(String environment) {
        this.environment = environment;
    }
    
    public Integer getSessionDurationMinutes() {
        return sessionDurationMinutes;
    }
    
    public void setSessionDurationMinutes(Integer sessionDurationMinutes) {
        this.sessionDurationMinutes = sessionDurationMinutes;
    }
    
    public String getComments() {
        return comments;
    }
    
    public void setComments(String comments) {
        this.comments = comments;
    }
}
