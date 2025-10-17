package com.vitalapp.persistence.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Entidad para almacenar auditorías WCAG AA
 * Registra resultados de pruebas de accesibilidad según WCAG 2.1 AA
 */
@Entity
@Table(name = "wcag_audits")
public class WcagAuditEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "version", nullable = false, length = 20)
    private String version; // Versión de la aplicación
    
    @Column(name = "environment", nullable = false, length = 50)
    private String environment; // staging, production
    
    @Column(name = "auditor_name", length = 100)
    private String auditorName; // Nombre del auditor
    
    // Criterios WCAG AA evaluados
    @Column(name = "contrast_text_pass", nullable = false)
    private Boolean contrastTextPass; // Contraste texto 4.5:1
    
    @Column(name = "contrast_ui_pass", nullable = false)
    private Boolean contrastUiPass; // Contraste UI 3:1
    
    @Column(name = "keyboard_navigation_pass", nullable = false)
    private Boolean keyboardNavigationPass; // Navegación por teclado
    
    @Column(name = "focus_visible_pass", nullable = false)
    private Boolean focusVisiblePass; // Foco visible
    
    @Column(name = "target_size_pass", nullable = false)
    private Boolean targetSizePass; // Objetivos ≥44×44px
    
    @Column(name = "aria_labels_pass", nullable = false)
    private Boolean ariaLabelsPass; // Labels ARIA correctos
    
    @Column(name = "heading_structure_pass", nullable = false)
    private Boolean headingStructurePass; // Estructura de encabezados
    
    @Column(name = "alt_text_pass", nullable = false)
    private Boolean altTextPass; // Texto alternativo en imágenes
    
    @Column(name = "form_labels_pass", nullable = false)
    private Boolean formLabelsPass; // Labels en formularios
    
    @Column(name = "error_messages_pass", nullable = false)
    private Boolean errorMessagesPass; // Mensajes de error accesibles
    
    // Resumen
    @Column(name = "critical_issues", nullable = false)
    private Integer criticalIssues; // Número de fallos críticos
    
    @Column(name = "total_checks", nullable = false)
    private Integer totalChecks; // Total de verificaciones
    
    @Column(name = "passed_checks", nullable = false)
    private Integer passedChecks; // Verificaciones pasadas
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private AuditStatus status; // PASS, FAIL, PARTIAL
    
    @Column(name = "notes", columnDefinition = "TEXT")
    private String notes; // Notas adicionales
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        calculateStatus();
    }
    
    /**
     * Calcula el estado de la auditoría
     */
    public void calculateStatus() {
        this.totalChecks = 10; // Total de criterios evaluados
        this.passedChecks = 0;
        this.criticalIssues = 0;
        
        if (contrastTextPass) passedChecks++;
        else criticalIssues++;
        
        if (contrastUiPass) passedChecks++;
        else criticalIssues++;
        
        if (keyboardNavigationPass) passedChecks++;
        else criticalIssues++;
        
        if (focusVisiblePass) passedChecks++;
        else criticalIssues++;
        
        if (targetSizePass) passedChecks++;
        else criticalIssues++;
        
        if (ariaLabelsPass) passedChecks++;
        if (headingStructurePass) passedChecks++;
        if (altTextPass) passedChecks++;
        if (formLabelsPass) passedChecks++;
        if (errorMessagesPass) passedChecks++;
        
        // Determinar estado: FAIL si hay fallos críticos en los primeros 5
        if (criticalIssues > 0) {
            this.status = AuditStatus.FAIL;
        } else if (passedChecks == totalChecks) {
            this.status = AuditStatus.PASS;
        } else {
            this.status = AuditStatus.PARTIAL;
        }
    }
    
    /**
     * Verifica si no hay fallos críticos
     */
    public boolean noCriticalIssues() {
        return criticalIssues == 0;
    }
    
    /**
     * Obtiene el porcentaje de cumplimiento
     */
    public double getCompliancePercentage() {
        return (passedChecks.doubleValue() / totalChecks.doubleValue()) * 100;
    }
    
    // Enums
    public enum AuditStatus {
        PASS,    // Todas las pruebas pasadas
        FAIL,    // Tiene fallos críticos
        PARTIAL  // Sin fallos críticos pero no 100%
    }
    
    // Constructors
    public WcagAuditEntity() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getVersion() {
        return version;
    }
    
    public void setVersion(String version) {
        this.version = version;
    }
    
    public String getEnvironment() {
        return environment;
    }
    
    public void setEnvironment(String environment) {
        this.environment = environment;
    }
    
    public String getAuditorName() {
        return auditorName;
    }
    
    public void setAuditorName(String auditorName) {
        this.auditorName = auditorName;
    }
    
    public Boolean getContrastTextPass() {
        return contrastTextPass;
    }
    
    public void setContrastTextPass(Boolean contrastTextPass) {
        this.contrastTextPass = contrastTextPass;
    }
    
    public Boolean getContrastUiPass() {
        return contrastUiPass;
    }
    
    public void setContrastUiPass(Boolean contrastUiPass) {
        this.contrastUiPass = contrastUiPass;
    }
    
    public Boolean getKeyboardNavigationPass() {
        return keyboardNavigationPass;
    }
    
    public void setKeyboardNavigationPass(Boolean keyboardNavigationPass) {
        this.keyboardNavigationPass = keyboardNavigationPass;
    }
    
    public Boolean getFocusVisiblePass() {
        return focusVisiblePass;
    }
    
    public void setFocusVisiblePass(Boolean focusVisiblePass) {
        this.focusVisiblePass = focusVisiblePass;
    }
    
    public Boolean getTargetSizePass() {
        return targetSizePass;
    }
    
    public void setTargetSizePass(Boolean targetSizePass) {
        this.targetSizePass = targetSizePass;
    }
    
    public Boolean getAriaLabelsPass() {
        return ariaLabelsPass;
    }
    
    public void setAriaLabelsPass(Boolean ariaLabelsPass) {
        this.ariaLabelsPass = ariaLabelsPass;
    }
    
    public Boolean getHeadingStructurePass() {
        return headingStructurePass;
    }
    
    public void setHeadingStructurePass(Boolean headingStructurePass) {
        this.headingStructurePass = headingStructurePass;
    }
    
    public Boolean getAltTextPass() {
        return altTextPass;
    }
    
    public void setAltTextPass(Boolean altTextPass) {
        this.altTextPass = altTextPass;
    }
    
    public Boolean getFormLabelsPass() {
        return formLabelsPass;
    }
    
    public void setFormLabelsPass(Boolean formLabelsPass) {
        this.formLabelsPass = formLabelsPass;
    }
    
    public Boolean getErrorMessagesPass() {
        return errorMessagesPass;
    }
    
    public void setErrorMessagesPass(Boolean errorMessagesPass) {
        this.errorMessagesPass = errorMessagesPass;
    }
    
    public Integer getCriticalIssues() {
        return criticalIssues;
    }
    
    public void setCriticalIssues(Integer criticalIssues) {
        this.criticalIssues = criticalIssues;
    }
    
    public Integer getTotalChecks() {
        return totalChecks;
    }
    
    public void setTotalChecks(Integer totalChecks) {
        this.totalChecks = totalChecks;
    }
    
    public Integer getPassedChecks() {
        return passedChecks;
    }
    
    public void setPassedChecks(Integer passedChecks) {
        this.passedChecks = passedChecks;
    }
    
    public AuditStatus getStatus() {
        return status;
    }
    
    public void setStatus(AuditStatus status) {
        this.status = status;
    }
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
