package com.vitalapp.presentation.dto;

import java.time.LocalDateTime;

/**
 * DTO para enviar resultados SUS al cliente
 */
public class SusResultDTO {
    
    private Long id;
    private Double susScore;
    private String scoreGrade;
    private Boolean meetsTarget;
    private String version;
    private String environment;
    private Integer sessionDurationMinutes;
    private String comments;
    private LocalDateTime createdAt;
    private String username;
    
    // Constructors
    public SusResultDTO() {}
    
    public SusResultDTO(Long id, Double susScore, String scoreGrade, Boolean meetsTarget,
                       String version, String environment, LocalDateTime createdAt) {
        this.id = id;
        this.susScore = susScore;
        this.scoreGrade = scoreGrade;
        this.meetsTarget = meetsTarget;
        this.version = version;
        this.environment = environment;
        this.createdAt = createdAt;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Double getSusScore() {
        return susScore;
    }
    
    public void setSusScore(Double susScore) {
        this.susScore = susScore;
    }
    
    public String getScoreGrade() {
        return scoreGrade;
    }
    
    public void setScoreGrade(String scoreGrade) {
        this.scoreGrade = scoreGrade;
    }
    
    public Boolean getMeetsTarget() {
        return meetsTarget;
    }
    
    public void setMeetsTarget(Boolean meetsTarget) {
        this.meetsTarget = meetsTarget;
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
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
}
