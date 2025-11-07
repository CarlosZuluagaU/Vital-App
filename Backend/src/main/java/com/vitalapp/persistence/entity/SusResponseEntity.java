package com.vitalapp.persistence.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

/**
 * Entidad para almacenar respuestas del cuestionario SUS (System Usability Scale)
 * SUS es un cuestionario de 10 preguntas con escala Likert (1-5)
 * Puntaje SUS: 0-100, donde ≥75 es considerado excelente
 */
@Entity
@Table(name = "sus_responses")
public class SusResponseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;
    
    // Respuestas del cuestionario SUS (1-5 cada una)
    @Column(name = "q1_frequency", nullable = false)
    private Integer q1Frequency; // Frecuencia de uso esperada
    
    @Column(name = "q2_complexity", nullable = false)
    private Integer q2Complexity; // Complejidad innecesaria (invertida)
    
    @Column(name = "q3_ease", nullable = false)
    private Integer q3Ease; // Facilidad de uso
    
    @Column(name = "q4_support_needed", nullable = false)
    private Integer q4SupportNeeded; // Necesidad de soporte técnico (invertida)
    
    @Column(name = "q5_integration", nullable = false)
    private Integer q5Integration; // Integración de funciones
    
    @Column(name = "q6_inconsistency", nullable = false)
    private Integer q6Inconsistency; // Inconsistencia (invertida)
    
    @Column(name = "q7_learning_speed", nullable = false)
    private Integer q7LearningSpeed; // Velocidad de aprendizaje
    
    @Column(name = "q8_cumbersome", nullable = false)
    private Integer q8Cumbersome; // Dificultad de uso (invertida)
    
    @Column(name = "q9_confidence", nullable = false)
    private Integer q9Confidence; // Confianza en el uso
    
    @Column(name = "q10_learning_difficulty", nullable = false)
    private Integer q10LearningDifficulty; // Dificultad de aprendizaje (invertida)
    
    @Column(name = "sus_score", nullable = false)
    private Double susScore; // Puntaje SUS calculado (0-100)
    
    @Column(name = "version", length = 20)
    private String version; // Versión de la aplicación testeada
    
    @Column(name = "environment", length = 50)
    private String environment; // staging, production, etc.
    
    @Column(name = "session_duration_minutes")
    private Integer sessionDurationMinutes; // Duración de la sesión de prueba
    
    @Column(name = "comments", columnDefinition = "TEXT")
    private String comments; // Comentarios adicionales del usuario
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        // Calcular puntaje SUS automáticamente
        calculateSusScore();
    }
    
    /**
     * Calcula el puntaje SUS según la fórmula estándar:
     * - Preguntas impares (1,3,5,7,9): contribución = (respuesta - 1)
     * - Preguntas pares (2,4,6,8,10): contribución = (5 - respuesta)
     * - Suma todas las contribuciones y multiplica por 2.5
     * Resultado: 0-100
     */
    public void calculateSusScore() {
        int oddSum = (q1Frequency - 1) + (q3Ease - 1) + (q5Integration - 1) 
                   + (q7LearningSpeed - 1) + (q9Confidence - 1);
        
        int evenSum = (5 - q2Complexity) + (5 - q4SupportNeeded) + (5 - q6Inconsistency) 
                    + (5 - q8Cumbersome) + (5 - q10LearningDifficulty);
        
        this.susScore = (oddSum + evenSum) * 2.5;
    }
    
    /**
     * Retorna la clasificación del puntaje SUS
     */
    public String getScoreGrade() {
        if (susScore >= 85) return "A - Excelente";
        if (susScore >= 75) return "B - Bueno (Meta alcanzada)";
        if (susScore >= 70) return "C - Aceptable";
        if (susScore >= 50) return "D - Pobre";
        return "F - Crítico";
    }
    
    /**
     * Verifica si cumple con la meta de SUS ≥75
     */
    public boolean meetsTarget() {
        return susScore >= 75.0;
    }
    
    // Constructors
    public SusResponseEntity() {}
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public UserEntity getUser() {
        return user;
    }
    
    public void setUser(UserEntity user) {
        this.user = user;
    }
    
    public Integer getQ1Frequency() {
        return q1Frequency;
    }
    
    public void setQ1Frequency(Integer q1Frequency) {
        this.q1Frequency = q1Frequency;
    }
    
    public Integer getQ2Complexity() {
        return q2Complexity;
    }
    
    public void setQ2Complexity(Integer q2Complexity) {
        this.q2Complexity = q2Complexity;
    }
    
    public Integer getQ3Ease() {
        return q3Ease;
    }
    
    public void setQ3Ease(Integer q3Ease) {
        this.q3Ease = q3Ease;
    }
    
    public Integer getQ4SupportNeeded() {
        return q4SupportNeeded;
    }
    
    public void setQ4SupportNeeded(Integer q4SupportNeeded) {
        this.q4SupportNeeded = q4SupportNeeded;
    }
    
    public Integer getQ5Integration() {
        return q5Integration;
    }
    
    public void setQ5Integration(Integer q5Integration) {
        this.q5Integration = q5Integration;
    }
    
    public Integer getQ6Inconsistency() {
        return q6Inconsistency;
    }
    
    public void setQ6Inconsistency(Integer q6Inconsistency) {
        this.q6Inconsistency = q6Inconsistency;
    }
    
    public Integer getQ7LearningSpeed() {
        return q7LearningSpeed;
    }
    
    public void setQ7LearningSpeed(Integer q7LearningSpeed) {
        this.q7LearningSpeed = q7LearningSpeed;
    }
    
    public Integer getQ8Cumbersome() {
        return q8Cumbersome;
    }
    
    public void setQ8Cumbersome(Integer q8Cumbersome) {
        this.q8Cumbersome = q8Cumbersome;
    }
    
    public Integer getQ9Confidence() {
        return q9Confidence;
    }
    
    public void setQ9Confidence(Integer q9Confidence) {
        this.q9Confidence = q9Confidence;
    }
    
    public Integer getQ10LearningDifficulty() {
        return q10LearningDifficulty;
    }
    
    public void setQ10LearningDifficulty(Integer q10LearningDifficulty) {
        this.q10LearningDifficulty = q10LearningDifficulty;
    }
    
    public Double getSusScore() {
        return susScore;
    }
    
    public void setSusScore(Double susScore) {
        this.susScore = susScore;
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
    
    public Integer getSessionDurationMinutes() {
        return sessionDurationMinutes;
    }
    
    public void setSessionDurationMinutes(Integer sessionDurationMinutes) {
        this.sessionDurationMinutes = sessionDurationMinutes;
    }
    
    public String getComments() {
        return comments;
    }
    
    public void setComments(String comments) {
        this.comments = comments;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
