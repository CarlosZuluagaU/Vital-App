package com.vitalapp.presentation.dto;

public class UserProfileResponseDTO {
    
    private Long id;
    private String name;
    private String email;
    private String profilePicture;
    private String fitnessLevel;
    private String preferredLocation;
    private String phone;
    private String dateOfBirth;
    private Double height;
    private Double weight;
    private String healthConditions;
    private String fitnessGoals;
    private String createdAt;
    
    // Constructors
    public UserProfileResponseDTO() {}
    
    public UserProfileResponseDTO(Long id, String name, String email, String profilePicture, 
                                 String fitnessLevel, String preferredLocation, String phone,
                                 String dateOfBirth, Double height, Double weight,
                                 String healthConditions, String fitnessGoals, String createdAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.profilePicture = profilePicture;
        this.fitnessLevel = fitnessLevel;
        this.preferredLocation = preferredLocation;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.height = height;
        this.weight = weight;
        this.healthConditions = healthConditions;
        this.fitnessGoals = fitnessGoals;
        this.createdAt = createdAt;
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
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getProfilePicture() {
        return profilePicture;
    }
    
    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
    
    public String getFitnessLevel() {
        return fitnessLevel;
    }
    
    public void setFitnessLevel(String fitnessLevel) {
        this.fitnessLevel = fitnessLevel;
    }
    
    public String getPreferredLocation() {
        return preferredLocation;
    }
    
    public void setPreferredLocation(String preferredLocation) {
        this.preferredLocation = preferredLocation;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getDateOfBirth() {
        return dateOfBirth;
    }
    
    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }
    
    public Double getHeight() {
        return height;
    }
    
    public void setHeight(Double height) {
        this.height = height;
    }
    
    public Double getWeight() {
        return weight;
    }
    
    public void setWeight(Double weight) {
        this.weight = weight;
    }
    
    public String getHealthConditions() {
        return healthConditions;
    }
    
    public void setHealthConditions(String healthConditions) {
        this.healthConditions = healthConditions;
    }
    
    public String getFitnessGoals() {
        return fitnessGoals;
    }
    
    public void setFitnessGoals(String fitnessGoals) {
        this.fitnessGoals = fitnessGoals;
    }
    
    public String getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}