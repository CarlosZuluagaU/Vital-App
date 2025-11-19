package com.vitalapp.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vitalapp.presentation.dto.AuthResponseDTO;
import com.vitalapp.presentation.dto.ChangePasswordRequestDTO;
import com.vitalapp.presentation.dto.LoginRequestDTO;
import com.vitalapp.presentation.dto.SignUpRequestDTO;
import com.vitalapp.presentation.dto.UpdateProfileRequestDTO;
import com.vitalapp.presentation.dto.UserInfoDTO;
import com.vitalapp.presentation.dto.VerifyPasswordRequestDTO;
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
    
    @PostMapping("/verify-password")
    public ResponseEntity<ApiResponse> verifyPassword(@Valid @RequestBody VerifyPasswordRequestDTO request, Authentication authentication) {
        try {
            boolean isValid = authService.verifyPassword(authentication, request.getPassword());
            return ResponseEntity.ok(new ApiResponse(isValid, 
                    isValid ? "Contraseña correcta" : "Contraseña incorrecta"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Error al verificar contraseña: " + e.getMessage()));
        }
    }
    
    @PutMapping("/change-password")
    public ResponseEntity<ApiResponse> changePassword(@Valid @RequestBody ChangePasswordRequestDTO request, Authentication authentication) {
        try {
            authService.changePassword(authentication, request);
            return ResponseEntity.ok(new ApiResponse(true, "Contraseña actualizada correctamente"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/me")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UpdateProfileRequestDTO request, Authentication authentication) {
        try {
            UserInfoDTO updatedUser = authService.updateProfile(authentication, request);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Error al actualizar perfil: " + e.getMessage()));
        }
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
