package com.vitalapp.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalapp.presentation.dto.AuthResponseDTO;
import com.vitalapp.presentation.dto.LoginRequestDTO;
import com.vitalapp.presentation.dto.SignUpRequestDTO;
import com.vitalapp.presentation.dto.UserInfoDTO;
import com.vitalapp.service.interfaces.AuthService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private AuthService authService;
    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDTO loginRequest) {
        try {
            AuthResponseDTO response = authService.login(loginRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Credenciales inválidas: " + e.getMessage()));
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequestDTO signUpRequest) {
        try {
            AuthResponseDTO response = authService.register(signUpRequest);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Error en el registro: " + e.getMessage()));
        }
    }
    
    @GetMapping("/me")
    public ResponseEntity<UserInfoDTO> getCurrentUser(Authentication authentication) {
        UserInfoDTO user = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(user);
    }
    
    @GetMapping("/check-username/{username}")
    public ResponseEntity<ApiResponse> checkUsernameAvailability(@PathVariable String username) {
        boolean isAvailable = !authService.existsByUsername(username);
        return ResponseEntity.ok(new ApiResponse(isAvailable, 
                isAvailable ? "Nombre de usuario disponible" : "Nombre de usuario no disponible"));
    }
    
    @GetMapping("/check-email/{email}")
    public ResponseEntity<ApiResponse> checkEmailAvailability(@PathVariable String email) {
        boolean isAvailable = !authService.existsByEmail(email);
        return ResponseEntity.ok(new ApiResponse(isAvailable,
                isAvailable ? "Email disponible" : "Email no disponible"));
    }
    
    // Clase auxiliar para respuestas de API
    public static class ApiResponse {
        private boolean success;
        private String message;
        
        public ApiResponse(boolean success, String message) {
            this.success = success;
            this.message = message;
        }
        
        public boolean isSuccess() {
            return success;
        }
        
        public void setSuccess(boolean success) {
            this.success = success;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
