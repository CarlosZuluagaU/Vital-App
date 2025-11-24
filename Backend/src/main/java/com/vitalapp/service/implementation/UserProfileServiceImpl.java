package com.vitalapp.service.implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.presentation.dto.UserProfileResponseDTO;
import com.vitalapp.presentation.dto.UserProfileUpdateDTO;
import com.vitalapp.service.interfaces.UserProfileService;

@Service
public class UserProfileServiceImpl implements UserProfileService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public UserProfileResponseDTO getUserProfile(Long userId) {
        Optional<UserEntity> userOpt = userRepository.findById(userId);
        
        if (!userOpt.isPresent()) {
            throw new RuntimeException("Usuario no encontrado con id: " + userId);
        }
        
        UserEntity user = userOpt.get();
        
        return new UserProfileResponseDTO(
            user.getId(),
            user.getName(),
            user.getEmail(),
            user.getProfilePicture(),
            user.getFitnessLevel(),
            user.getPreferredLocation(),
            user.getPhone(),
            user.getDateOfBirth(),
            user.getHeight(),
            user.getWeight(),
            user.getHealthConditions(),
            user.getFitnessGoals(),
            user.getCreatedAt() != null ? user.getCreatedAt().toString() : null
        );
    }
    
    @Override
    public UserProfileResponseDTO updateUserProfile(Long userId, UserProfileUpdateDTO updateDTO) {
        Optional<UserEntity> userOpt = userRepository.findById(userId);
        
        if (!userOpt.isPresent()) {
            throw new RuntimeException("Usuario no encontrado con id: " + userId);
        }
        
        UserEntity user = userOpt.get();
        
        // Actualizar campos no nulos
        if (updateDTO.getName() != null && !updateDTO.getName().trim().isEmpty()) {
            user.setName(updateDTO.getName().trim());
        }
        
        if (updateDTO.getEmail() != null && !updateDTO.getEmail().trim().isEmpty()) {
            user.setEmail(updateDTO.getEmail().trim());
        }
        
        if (updateDTO.getProfilePicture() != null) {
            user.setProfilePicture(updateDTO.getProfilePicture());
        }
        
        if (updateDTO.getFitnessLevel() != null && !updateDTO.getFitnessLevel().trim().isEmpty()) {
            user.setFitnessLevel(updateDTO.getFitnessLevel());
        }
        
        if (updateDTO.getPreferredLocation() != null && !updateDTO.getPreferredLocation().trim().isEmpty()) {
            user.setPreferredLocation(updateDTO.getPreferredLocation());
        }
        
        // Actualizar nuevos campos opcionales
        if (updateDTO.getPhone() != null) {
            user.setPhone(updateDTO.getPhone().trim().isEmpty() ? null : updateDTO.getPhone().trim());
        }
        
        if (updateDTO.getDateOfBirth() != null) {
            user.setDateOfBirth(updateDTO.getDateOfBirth().trim().isEmpty() ? null : updateDTO.getDateOfBirth());
        }
        
        if (updateDTO.getHeight() != null) {
            user.setHeight(updateDTO.getHeight());
        }
        
        if (updateDTO.getWeight() != null) {
            user.setWeight(updateDTO.getWeight());
        }
        
        if (updateDTO.getHealthConditions() != null) {
            user.setHealthConditions(updateDTO.getHealthConditions().trim().isEmpty() ? null : updateDTO.getHealthConditions().trim());
        }
        
        if (updateDTO.getFitnessGoals() != null) {
            user.setFitnessGoals(updateDTO.getFitnessGoals().trim().isEmpty() ? null : updateDTO.getFitnessGoals());
        }
        
        // Guardar cambios
        UserEntity savedUser = userRepository.save(user);
        
        return new UserProfileResponseDTO(
            savedUser.getId(),
            savedUser.getName(),
            savedUser.getEmail(),
            savedUser.getProfilePicture(),
            savedUser.getFitnessLevel(),
            savedUser.getPreferredLocation(),
            savedUser.getPhone(),
            savedUser.getDateOfBirth(),
            savedUser.getHeight(),
            savedUser.getWeight(),
            savedUser.getHealthConditions(),
            savedUser.getFitnessGoals(),
            savedUser.getCreatedAt() != null ? savedUser.getCreatedAt().toString() : null
        );
    }
}