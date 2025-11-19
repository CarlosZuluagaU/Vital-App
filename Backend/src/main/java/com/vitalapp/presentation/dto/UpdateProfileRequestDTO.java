package com.vitalapp.presentation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;

public class UpdateProfileRequestDTO {
    
    @NotBlank(message = "El nombre es requerido")
    private String name;
    
    @Min(value = 1, message = "El avatarId debe ser mayor a 0")
    @Max(value = 5, message = "El avatarId debe ser menor o igual a 5")
    private Integer avatarId;
    
    // Constructors
    public UpdateProfileRequestDTO() {}
    
    public UpdateProfileRequestDTO(String name, Integer avatarId) {
        this.name = name;
        this.avatarId = avatarId;
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getAvatarId() {
        return avatarId;
    }
    
    public void setAvatarId(Integer avatarId) {
        this.avatarId = avatarId;
    }
}
