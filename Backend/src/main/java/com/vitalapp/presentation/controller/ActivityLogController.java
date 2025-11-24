package com.vitalapp.presentation.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import com.vitalapp.service.interfaces.ActivityLogService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/me/activities")
@CrossOrigin(origins = "*")
public class ActivityLogController {
    
    @Autowired
    private ActivityLogService activityLogService;
    
    @PostMapping
    public ResponseEntity<ActivityLogConfirmationDTO> logActivity(
            @RequestBody ActivityLogRequestDTO requestDTO,
            Authentication authentication) {
        try {
            // Obtener el userId del usuario autenticado
            UserEntity user = (UserEntity) authentication.getPrincipal();
            Long userId = user.getId();
            
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
    
    @GetMapping("/stats")
    public ResponseEntity<WeeklyStatsDTO> getWeeklyStats(
            Authentication authentication,
            @RequestParam(value = "start", required = false) String startDateIso,
            @RequestParam(value = "days", required = false) Integer days) {
        try {
            // Obtener el userId del usuario autenticado
            UserEntity user = (UserEntity) authentication.getPrincipal();
            Long userId = user.getId();
            WeeklyStatsDTO stats;
            if (startDateIso != null || days != null) {
                stats = activityLogService.getWeeklyStats(userId, startDateIso, days);
            } else {
                stats = activityLogService.getWeeklyStats(userId);
            }
            return ResponseEntity.ok(stats);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
