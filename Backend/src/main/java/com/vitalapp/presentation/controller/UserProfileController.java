package com.vitalapp.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.presentation.dto.UserProfileResponseDTO;
import com.vitalapp.presentation.dto.UserProfileUpdateDTO;
import com.vitalapp.service.interfaces.UserProfileService;

@RestController
@RequestMapping("/api/me/profile")
@CrossOrigin(origins = "*")
public class UserProfileController {
    
    @Autowired
    private UserProfileService userProfileService;
    
    @GetMapping
    public ResponseEntity<UserProfileResponseDTO> getUserProfile(Authentication authentication) {
        try {
            // Obtener el userId del usuario autenticado
            UserEntity user = (UserEntity) authentication.getPrincipal();
            Long userId = user.getId();
            
            UserProfileResponseDTO profile = userProfileService.getUserProfile(userId);
            return ResponseEntity.ok(profile);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping
    public ResponseEntity<UserProfileResponseDTO> updateUserProfile(
            @RequestBody UserProfileUpdateDTO updateDTO, 
            Authentication authentication) {
        try {
            // Obtener el userId del usuario autenticado
            UserEntity user = (UserEntity) authentication.getPrincipal();
            Long userId = user.getId();
            
            UserProfileResponseDTO updatedProfile = userProfileService.updateUserProfile(userId, updateDTO);
            return ResponseEntity.ok(updatedProfile);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}