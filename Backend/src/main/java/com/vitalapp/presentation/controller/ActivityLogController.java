package com.vitalapp.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.service.interfaces.ActivityLogService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/me/activities")
@CrossOrigin(origins = "*")
public class ActivityLogController {
    
    @Autowired
    private ActivityLogService activityLogService;
    
    @PostMapping
    public ResponseEntity<ActivityLogConfirmationDTO> logActivity(@RequestBody ActivityLogRequestDTO requestDTO) {
        try {
            // Por ahora usamos un userId fijo (1L) para el MVP
            // En un escenario real, obtendrías el userId del token JWT o sesión
            Long userId = 1L;
            
            ActivityLogConfirmationDTO response = activityLogService.logActivity(requestDTO, userId);
            
            if ("success".equals(response.getStatus())) {
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            ActivityLogConfirmationDTO errorResponse = new ActivityLogConfirmationDTO(
                    "error", 
                    "Error interno del servidor: " + e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
