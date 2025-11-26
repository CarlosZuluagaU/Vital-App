package com.vitalapp.presentation.dto;

import jakarta.validation.constraints.NotBlank;

public class VerifyPasswordRequestDTO {
    
    @NotBlank(message = "La contraseña es requerida")
    private String password;
    
    // Constructors
    public VerifyPasswordRequestDTO() {}
    
    public VerifyPasswordRequestDTO(String password) {
        this.password = password;
    }
    
    // Getters and Setters
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
}
