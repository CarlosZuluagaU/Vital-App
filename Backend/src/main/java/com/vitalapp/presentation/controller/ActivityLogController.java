package com.vitalapp.presentation.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;
import com.vitalapp.service.interfaces.ActivityLogService;
import com.vitalapp.util.JwtTokenProvider;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/me/activities")
public class ActivityLogController {
    
    private static final Logger log = LoggerFactory.getLogger(ActivityLogController.class);
    
    @Autowired
    private ActivityLogService activityLogService;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    /**
     * Extrae el userId directamente del JWT token en el header Authorization
     */
    private Long getUserIdFromToken(String authorizationHeader) {
        System.out.println("========== getUserIdFromToken ==========");
        System.out.println("Authorization header: " + (authorizationHeader != null ? authorizationHeader.substring(0, Math.min(30, authorizationHeader.length())) + "..." : "NULL"));
        
        if (!StringUtils.hasText(authorizationHeader) || !authorizationHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token JWT no encontrado en Authorization header");
        }
        
        String jwt = authorizationHeader.substring(7);
        System.out.println("JWT token (first 30 chars): " + jwt.substring(0, Math.min(30, jwt.length())) + "...");
        
        Long userId = jwtTokenProvider.getUserIdFromJWT(jwt);
        
        System.out.println("Extracted userId from JWT: " + userId);
        System.out.println("========================================");
        
        log.info("===== getUserIdFromToken =====");
        log.info("Extracted userId from JWT: {}", userId);
        log.info("===============================");
        
        return userId;
    }
    
    @PostMapping
    public ResponseEntity<ActivityLogConfirmationDTO> logActivity(
            @RequestBody ActivityLogRequestDTO requestDTO,
            @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        log.info("===== POST /api/me/activities =====");
        log.info("Request: activityType={}, relatedEntityId={}", 
                 requestDTO.getActivityType(), requestDTO.getRelatedEntityId());
        
        try {
            // Extraer userId directamente del JWT
            Long userId = getUserIdFromToken(authorizationHeader);
            log.info("===== CALLING SERVICE WITH userId: {} =====", userId);
            
            ActivityLogConfirmationDTO response = activityLogService.logActivity(requestDTO, userId);
            
            if ("success".equals(response.getStatus())) {
                log.info("Activity logged successfully");
                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } else {
                log.warn("Activity logging failed: {}", response.getMessage());
                return ResponseEntity.badRequest().body(response);
            }
        } catch (Exception e) {
            log.error("Exception in logActivity endpoint", e);
            ActivityLogConfirmationDTO errorResponse = new ActivityLogConfirmationDTO(
                    "error", 
                    "Error interno del servidor: " + e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    @GetMapping("/stats")
    public ResponseEntity<WeeklyStatsDTO> getWeeklyStats(
            @RequestParam(value = "start", required = false) String startDateIso,
            @RequestParam(value = "days", required = false) Integer days,
            @RequestHeader(value = "Authorization", required = true) String authorizationHeader) {
        try {
            // Extraer userId directamente del JWT
            Long userId = getUserIdFromToken(authorizationHeader);
            
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
