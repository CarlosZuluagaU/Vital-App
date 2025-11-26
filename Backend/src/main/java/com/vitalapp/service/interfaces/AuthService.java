package com.vitalapp.service.interfaces;

import org.springframework.security.core.Authentication;

import com.vitalapp.presentation.dto.AuthResponseDTO;
import com.vitalapp.presentation.dto.ChangePasswordRequestDTO;
import com.vitalapp.presentation.dto.LoginRequestDTO;
import com.vitalapp.presentation.dto.SignUpRequestDTO;
import com.vitalapp.presentation.dto.UpdateProfileRequestDTO;
import com.vitalapp.presentation.dto.UserInfoDTO;

public interface AuthService {
    
    AuthResponseDTO login(LoginRequestDTO loginRequest);
    
    AuthResponseDTO register(SignUpRequestDTO signUpRequest);
    
    UserInfoDTO getCurrentUser(Authentication authentication);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    boolean verifyPassword(Authentication authentication, String password);
    
    void changePassword(Authentication authentication, ChangePasswordRequestDTO request);
    
    UserInfoDTO updateProfile(Authentication authentication, UpdateProfileRequestDTO request);
}
