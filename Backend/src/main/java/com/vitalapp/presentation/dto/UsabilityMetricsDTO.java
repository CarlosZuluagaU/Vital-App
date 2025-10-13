package com.vitalapp.presentation.dto;

import java.time.LocalDateTime;

/**
 * DTO para enviar estadísticas de usabilidad y accesibilidad
 */
public class UsabilityMetricsDTO {
    
    // Métricas SUS
    private Double averageSusScore;
    private Long totalSusResponses;
    private Long responsesAboveTarget;
    private Double targetAchievementRate;
    private Double lowestScore;
    private Double highestScore;
    
    // Métricas WCAG
    private Long totalAudits;
    private Long auditsWithoutCriticalIssues;
    private Double averageCompliancePercentage;
    private Long auditsPass;
    private Long auditsFail;
    private Long auditsPartial;
    
    // Información de última actualización
    private LocalDateTime lastSusResponse;
    private LocalDateTime lastWcagAudit;
    
    // Constructors
    public UsabilityMetricsDTO() {}
    
    // Getters and Setters
    public Double getAverageSusScore() {
        return averageSusScore;
    }
    
    public void setAverageSusScore(Double averageSusScore) {
        this.averageSusScore = averageSusScore;
    }
    
    public Long getTotalSusResponses() {
        return totalSusResponses;
    }
    
    public void setTotalSusResponses(Long totalSusResponses) {
        this.totalSusResponses = totalSusResponses;
    }
    
    public Long getResponsesAboveTarget() {
        return responsesAboveTarget;
    }
    
    public void setResponsesAboveTarget(Long responsesAboveTarget) {
        this.responsesAboveTarget = responsesAboveTarget;
    }
    
    public Double getTargetAchievementRate() {
        return targetAchievementRate;
    }
    
    public void setTargetAchievementRate(Double targetAchievementRate) {
        this.targetAchievementRate = targetAchievementRate;
    }
    
    public Double getLowestScore() {
        return lowestScore;
    }
    
    public void setLowestScore(Double lowestScore) {
        this.lowestScore = lowestScore;
    }
    
    public Double getHighestScore() {
        return highestScore;
    }
    
    public void setHighestScore(Double highestScore) {
        this.highestScore = highestScore;
    }
    
    public Long getTotalAudits() {
        return totalAudits;
    }
    
    public void setTotalAudits(Long totalAudits) {
        this.totalAudits = totalAudits;
    }
    
    public Long getAuditsWithoutCriticalIssues() {
        return auditsWithoutCriticalIssues;
    }
    
    public void setAuditsWithoutCriticalIssues(Long auditsWithoutCriticalIssues) {
        this.auditsWithoutCriticalIssues = auditsWithoutCriticalIssues;
    }
    
    public Double getAverageCompliancePercentage() {
        return averageCompliancePercentage;
    }
    
    public void setAverageCompliancePercentage(Double averageCompliancePercentage) {
        this.averageCompliancePercentage = averageCompliancePercentage;
    }
    
    public Long getAuditsPass() {
        return auditsPass;
    }
    
    public void setAuditsPass(Long auditsPass) {
        this.auditsPass = auditsPass;
    }
    
    public Long getAuditsFail() {
        return auditsFail;
    }
    
    public void setAuditsFail(Long auditsFail) {
        this.auditsFail = auditsFail;
    }
    
    public Long getAuditsPartial() {
        return auditsPartial;
    }
    
    public void setAuditsPartial(Long auditsPartial) {
        this.auditsPartial = auditsPartial;
    }
    
    public LocalDateTime getLastSusResponse() {
        return lastSusResponse;
    }
    
    public void setLastSusResponse(LocalDateTime lastSusResponse) {
        this.lastSusResponse = lastSusResponse;
    }
    
    public LocalDateTime getLastWcagAudit() {
        return lastWcagAudit;
    }
    
    public void setLastWcagAudit(LocalDateTime lastWcagAudit) {
        this.lastWcagAudit = lastWcagAudit;
    }
}
