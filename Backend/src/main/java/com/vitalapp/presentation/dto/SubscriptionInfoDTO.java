package com.vitalapp.presentation.dto;

import java.time.LocalDateTime;

public class SubscriptionInfoDTO {
    
    private Long id;
    private String planName;
    private String planDescription;
    private Double price;
    private String status;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean isActive;
    private boolean isPremium;
    
    // Constructors
    public SubscriptionInfoDTO() {}
    
    public SubscriptionInfoDTO(Long id, String planName, String status, 
                             LocalDateTime startDate, LocalDateTime endDate) {
        this.id = id;
        this.planName = planName;
        this.status = status;
        this.startDate = startDate;
        this.endDate = endDate;
        this.isActive = LocalDateTime.now().isBefore(endDate) && "ACTIVE".equals(status);
        this.isPremium = "Premium".equalsIgnoreCase(planName);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPlanName() {
        return planName;
    }
    
    public void setPlanName(String planName) {
        this.planName = planName;
        this.isPremium = "Premium".equalsIgnoreCase(planName);
    }
    
    public String getPlanDescription() {
        return planDescription;
    }
    
    public void setPlanDescription(String planDescription) {
        this.planDescription = planDescription;
    }
    
    public Double getPrice() {
        return price;
    }
    
    public void setPrice(Double price) {
        this.price = price;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
        this.isActive = LocalDateTime.now().isBefore(endDate) && "ACTIVE".equals(status);
    }
    
    public LocalDateTime getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }
    
    public LocalDateTime getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
        this.isActive = LocalDateTime.now().isBefore(endDate) && "ACTIVE".equals(status);
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }
    
    public boolean isPremium() {
        return isPremium;
    }
    
    public void setPremium(boolean premium) {
        isPremium = premium;
    }
}
