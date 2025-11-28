package com.vitalapp.presentation.dto;

import java.time.LocalDateTime;

public class UserInfoDTO {
    
    private Long id;
    private String username;
    private String email;
    private String name;
    private Integer age;
    private String phone;
    private String provider;
    private Integer avatarId;
    private SubscriptionInfoDTO currentSubscription;
    private LocalDateTime createdAt;
    
    // Constructors
    public UserInfoDTO() {}
    
    public UserInfoDTO(Long id, String username, String email, String name) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.name = name;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getAge() {
        return age;
    }
    
    public void setAge(Integer age) {
        this.age = age;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getProvider() {
        return provider;
    }
    
    public void setProvider(String provider) {
        this.provider = provider;
    }
    
    public Integer getAvatarId() {
        return avatarId;
    }
    
    public void setAvatarId(Integer avatarId) {
        this.avatarId = avatarId;
    }
    
    public SubscriptionInfoDTO getCurrentSubscription() {
        return currentSubscription;
    }
    
    public void setCurrentSubscription(SubscriptionInfoDTO currentSubscription) {
        this.currentSubscription = currentSubscription;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
