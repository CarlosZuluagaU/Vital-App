package com.vitalapp.presentation.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vitalapp.persistence.entity.SusResponseEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.WcagAuditEntity;
import com.vitalapp.persistence.repository.SusResponseRepository;
import com.vitalapp.persistence.repository.WcagAuditRepository;
import com.vitalapp.presentation.dto.SusResponseDTO;
import com.vitalapp.presentation.dto.SusResultDTO;
import com.vitalapp.presentation.dto.UsabilityMetricsDTO;
import com.vitalapp.presentation.dto.WcagAuditDTO;

import jakarta.validation.Valid;

/**
 * Controlador REST para gestión de métricas de usabilidad y accesibilidad
 * Endpoints para SUS (System Usability Scale) y WCAG AA
 */
@RestController
@RequestMapping("/api/usability")
public class UsabilityController {
    
    @Autowired
    private SusResponseRepository susResponseRepository;
    
    @Autowired
    private WcagAuditRepository wcagAuditRepository;
    
    /**
     * POST /api/usability/sus
     * Registra una respuesta del cuestionario SUS
     */
    @PostMapping("/sus")
    public ResponseEntity<SusResultDTO> submitSusResponse(
            @Valid @RequestBody SusResponseDTO susResponseDTO,
            Authentication authentication) {
        
        UserEntity user = (UserEntity) authentication.getPrincipal();
        
        // Crear entidad
        SusResponseEntity response = new SusResponseEntity();
        response.setUser(user);
        response.setQ1Frequency(susResponseDTO.getQ1Frequency());
        response.setQ2Complexity(susResponseDTO.getQ2Complexity());
        response.setQ3Ease(susResponseDTO.getQ3Ease());
        response.setQ4SupportNeeded(susResponseDTO.getQ4SupportNeeded());
        response.setQ5Integration(susResponseDTO.getQ5Integration());
        response.setQ6Inconsistency(susResponseDTO.getQ6Inconsistency());
        response.setQ7LearningSpeed(susResponseDTO.getQ7LearningSpeed());
        response.setQ8Cumbersome(susResponseDTO.getQ8Cumbersome());
        response.setQ9Confidence(susResponseDTO.getQ9Confidence());
        response.setQ10LearningDifficulty(susResponseDTO.getQ10LearningDifficulty());
        response.setVersion(susResponseDTO.getVersion());
        response.setEnvironment(susResponseDTO.getEnvironment());
        response.setSessionDurationMinutes(susResponseDTO.getSessionDurationMinutes());
        response.setComments(susResponseDTO.getComments());
        
        // Guardar
        SusResponseEntity saved = susResponseRepository.save(response);
        
        // Convertir a DTO de resultado
        SusResultDTO result = convertToResultDTO(saved);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
    
    /**
     * GET /api/usability/sus/my-responses
     * Obtiene las respuestas SUS del usuario autenticado
     */
    @GetMapping("/sus/my-responses")
    public ResponseEntity<List<SusResultDTO>> getMyResponses(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        List<SusResponseEntity> responses = susResponseRepository.findByUserId(user.getId());
        
        List<SusResultDTO> results = responses.stream()
                .map(this::convertToResultDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(results);
    }
    
    /**
     * GET /api/usability/sus/average
     * Obtiene el promedio general de puntaje SUS
     */
    @GetMapping("/sus/average")
    public ResponseEntity<Double> getAverageSusScore() {
        Double average = susResponseRepository.getAverageSusScore();
        return ResponseEntity.ok(average != null ? average : 0.0);
    }
    
    /**
     * GET /api/usability/sus/version/{version}
     * Obtiene respuestas SUS por versión
     */
    @GetMapping("/sus/version/{version}")
    public ResponseEntity<List<SusResultDTO>> getResponsesByVersion(@PathVariable String version) {
        List<SusResponseEntity> responses = susResponseRepository.findByVersion(version);
        
        List<SusResultDTO> results = responses.stream()
                .map(this::convertToResultDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(results);
    }
    
    /**
     * GET /api/usability/sus/below-target
     * Obtiene respuestas con puntaje menor a 75
     */
    @GetMapping("/sus/below-target")
    public ResponseEntity<List<SusResultDTO>> getResponsesBelowTarget() {
        List<SusResponseEntity> responses = susResponseRepository.findResponsesBelowTarget();
        
        List<SusResultDTO> results = responses.stream()
                .map(this::convertToResultDTO)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(results);
    }
    
    /**
     * POST /api/usability/wcag
     * Registra una auditoría WCAG AA
     */
    @PostMapping("/wcag")
    public ResponseEntity<WcagAuditEntity> submitWcagAudit(
            @Valid @RequestBody WcagAuditDTO auditDTO) {
        
        // Crear entidad
        WcagAuditEntity audit = new WcagAuditEntity();
        audit.setVersion(auditDTO.getVersion());
        audit.setEnvironment(auditDTO.getEnvironment());
        audit.setAuditorName(auditDTO.getAuditorName());
        audit.setContrastTextPass(auditDTO.getContrastTextPass());
        audit.setContrastUiPass(auditDTO.getContrastUiPass());
        audit.setKeyboardNavigationPass(auditDTO.getKeyboardNavigationPass());
        audit.setFocusVisiblePass(auditDTO.getFocusVisiblePass());
        audit.setTargetSizePass(auditDTO.getTargetSizePass());
        audit.setAriaLabelsPass(auditDTO.getAriaLabelsPass());
        audit.setHeadingStructurePass(auditDTO.getHeadingStructurePass());
        audit.setAltTextPass(auditDTO.getAltTextPass());
        audit.setFormLabelsPass(auditDTO.getFormLabelsPass());
        audit.setErrorMessagesPass(auditDTO.getErrorMessagesPass());
        audit.setNotes(auditDTO.getNotes());
        
        // Guardar
        WcagAuditEntity saved = wcagAuditRepository.save(audit);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    /**
     * GET /api/usability/wcag/latest
     * Obtiene las últimas 10 auditorías WCAG
     */
    @GetMapping("/wcag/latest")
    public ResponseEntity<List<WcagAuditEntity>> getLatestAudits() {
        List<WcagAuditEntity> audits = wcagAuditRepository.findTop10ByOrderByCreatedAtDesc();
        return ResponseEntity.ok(audits);
    }
    
    /**
     * GET /api/usability/wcag/version/{version}
     * Obtiene la última auditoría de una versión específica
     */
    @GetMapping("/wcag/version/{version}")
    public ResponseEntity<WcagAuditEntity> getLatestAuditByVersion(@PathVariable String version) {
        WcagAuditEntity audit = wcagAuditRepository.findFirstByVersionOrderByCreatedAtDesc(version);
        
        if (audit == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(audit);
    }
    
    /**
     * GET /api/usability/wcag/critical-issues
     * Obtiene auditorías con fallos críticos
     */
    @GetMapping("/wcag/critical-issues")
    public ResponseEntity<List<WcagAuditEntity>> getAuditsWithCriticalIssues() {
        List<WcagAuditEntity> audits = wcagAuditRepository.findAuditsWithCriticalIssues();
        return ResponseEntity.ok(audits);
    }
    
    /**
     * GET /api/usability/metrics
     * Obtiene todas las métricas de usabilidad y accesibilidad
     */
    @GetMapping("/metrics")
    public ResponseEntity<UsabilityMetricsDTO> getMetrics(
            @RequestParam(required = false) String version,
            @RequestParam(required = false) String environment) {
        
        UsabilityMetricsDTO metrics = new UsabilityMetricsDTO();
        
        // Métricas SUS
        Double avgSus = version != null ? 
                susResponseRepository.getAverageSusScoreByVersion(version) :
                susResponseRepository.getAverageSusScore();
        metrics.setAverageSusScore(avgSus != null ? avgSus : 0.0);
        
        Long totalSus = (long) susResponseRepository.findAll().size();
        metrics.setTotalSusResponses(totalSus);
        
        Long aboveTarget = version != null ?
                susResponseRepository.countResponsesMeetingTargetByVersion(version) :
                susResponseRepository.countResponsesMeetingTarget();
        metrics.setResponsesAboveTarget(aboveTarget);
        
        if (totalSus > 0) {
            metrics.setTargetAchievementRate((aboveTarget.doubleValue() / totalSus.doubleValue()) * 100);
        }
        
        List<SusResponseEntity> allResponses = susResponseRepository.findAll();
        if (!allResponses.isEmpty()) {
            metrics.setLowestScore(allResponses.stream()
                    .mapToDouble(SusResponseEntity::getSusScore)
                    .min().orElse(0.0));
            metrics.setHighestScore(allResponses.stream()
                    .mapToDouble(SusResponseEntity::getSusScore)
                    .max().orElse(0.0));
            metrics.setLastSusResponse(allResponses.stream()
                    .map(SusResponseEntity::getCreatedAt)
                    .max(java.time.LocalDateTime::compareTo)
                    .orElse(null));
        }
        
        // Métricas WCAG
        List<WcagAuditEntity> allAudits = wcagAuditRepository.findAll();
        metrics.setTotalAudits((long) allAudits.size());
        
        Long noCritical = wcagAuditRepository.countAuditsWithoutCriticalIssues();
        metrics.setAuditsWithoutCriticalIssues(noCritical);
        
        Double avgCompliance = version != null ?
                wcagAuditRepository.getAverageCompliancePercentageByVersion(version) :
                wcagAuditRepository.getAverageCompliancePercentage();
        metrics.setAverageCompliancePercentage(avgCompliance != null ? avgCompliance : 0.0);
        
        metrics.setAuditsPass((long) wcagAuditRepository.findByStatus(WcagAuditEntity.AuditStatus.PASS).size());
        metrics.setAuditsFail((long) wcagAuditRepository.findByStatus(WcagAuditEntity.AuditStatus.FAIL).size());
        metrics.setAuditsPartial((long) wcagAuditRepository.findByStatus(WcagAuditEntity.AuditStatus.PARTIAL).size());
        
        if (!allAudits.isEmpty()) {
            metrics.setLastWcagAudit(allAudits.stream()
                    .map(WcagAuditEntity::getCreatedAt)
                    .max(java.time.LocalDateTime::compareTo)
                    .orElse(null));
        }
        
        return ResponseEntity.ok(metrics);
    }
    
    /**
     * Convierte entidad a DTO de resultado
     */
    private SusResultDTO convertToResultDTO(SusResponseEntity entity) {
        SusResultDTO dto = new SusResultDTO();
        dto.setId(entity.getId());
        dto.setSusScore(entity.getSusScore());
        dto.setScoreGrade(entity.getScoreGrade());
        dto.setMeetsTarget(entity.meetsTarget());
        dto.setVersion(entity.getVersion());
        dto.setEnvironment(entity.getEnvironment());
        dto.setSessionDurationMinutes(entity.getSessionDurationMinutes());
        dto.setComments(entity.getComments());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setUsername(entity.getUser().getUsername());
        return dto;
    }
}
