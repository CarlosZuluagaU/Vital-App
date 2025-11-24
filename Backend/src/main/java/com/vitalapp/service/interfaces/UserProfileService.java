package com.vitalapp.service.interfaces;

import com.vitalapp.presentation.dto.UserProfileResponseDTO;
import com.vitalapp.presentation.dto.UserProfileUpdateDTO;

public interface UserProfileService {
    
    UserProfileResponseDTO getUserProfile(Long userId);
    
    UserProfileResponseDTO updateUserProfile(Long userId, UserProfileUpdateDTO updateDTO);
}