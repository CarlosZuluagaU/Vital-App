package com.vitalapp.presentation.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

/**
 * DTO para recibir auditoría WCAG
 */
public class WcagAuditDTO {
    
    @NotBlank(message = "La versión es requerida")
    private String version;
    
    @NotBlank(message = "El ambiente es requerido")
    private String environment;
    
    private String auditorName;
    
    @NotNull(message = "El campo contrastTextPass es requerido")
    private Boolean contrastTextPass;
    
    @NotNull(message = "El campo contrastUiPass es requerido")
    private Boolean contrastUiPass;
    
    @NotNull(message = "El campo keyboardNavigationPass es requerido")
    private Boolean keyboardNavigationPass;
    
    @NotNull(message = "El campo focusVisiblePass es requerido")
    private Boolean focusVisiblePass;
    
    @NotNull(message = "El campo targetSizePass es requerido")
    private Boolean targetSizePass;
    
    @NotNull(message = "El campo ariaLabelsPass es requerido")
    private Boolean ariaLabelsPass;
    
    @NotNull(message = "El campo headingStructurePass es requerido")
    private Boolean headingStructurePass;
    
    @NotNull(message = "El campo altTextPass es requerido")
    private Boolean altTextPass;
    
    @NotNull(message = "El campo formLabelsPass es requerido")
    private Boolean formLabelsPass;
    
    @NotNull(message = "El campo errorMessagesPass es requerido")
    private Boolean errorMessagesPass;
    
    private String notes;
    
    // Constructors
    public WcagAuditDTO() {}
    
    // Getters and Setters
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
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
