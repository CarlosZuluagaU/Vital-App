package com.vitalapp.persistence.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

@Entity
@Table(name = "exercises")
public class ExerciseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false, length = 200)
    private String name;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "instructions", columnDefinition = "TEXT")
    private String instructions;
    
    @Column(name = "safety_tips", columnDefinition = "TEXT")
    private String safetyTips;
    
    @Column(name = "modifications", columnDefinition = "TEXT")
    private String modifications;
    
    @Column(name = "benefits", columnDefinition = "TEXT")
    private String benefits;
    
    @Column(name = "duration_seconds")
    private Integer durationSeconds;
    
    @Column(name = "repetitions")
    private Integer repetitions;
    
    @Column(name = "sets")
    private Integer sets;
    
    @Column(name = "video_url", length = 255)
    private String videoUrl;
    
    @Column(name = "image_url", length = 255)
    private String imageUrl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_type_id", nullable = false)
    private ExerciseTypeEntity exerciseType;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryEntity category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "intensity_id", nullable = false)
    private IntensityEntity intensity;
    
    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "is_premium", nullable = false)
    private Boolean isPremium = false;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public ExerciseEntity() {}
    
    public ExerciseEntity(String name, String description, ExerciseTypeEntity exerciseType, 
                         CategoryEntity category, IntensityEntity intensity) {
        this.name = name;
        this.description = description;
        this.exerciseType = exerciseType;
        this.category = category;
        this.intensity = intensity;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getInstructions() {
        return instructions;
    }
    
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
    
    public String getSafetyTips() {
        return safetyTips;
    }
    
    public void setSafetyTips(String safetyTips) {
        this.safetyTips = safetyTips;
    }
    
    public String getModifications() {
        return modifications;
    }
    
    public void setModifications(String modifications) {
        this.modifications = modifications;
    }
    
    public String getBenefits() {
        return benefits;
    }
    
    public void setBenefits(String benefits) {
        this.benefits = benefits;
    }
    
    public Integer getDurationSeconds() {
        return durationSeconds;
    }
    
    public void setDurationSeconds(Integer durationSeconds) {
        this.durationSeconds = durationSeconds;
    }
    
    public Integer getRepetitions() {
        return repetitions;
    }
    
    public void setRepetitions(Integer repetitions) {
        this.repetitions = repetitions;
    }
    
    public Integer getSets() {
        return sets;
    }
    
    public void setSets(Integer sets) {
        this.sets = sets;
    }
    
    public String getVideoUrl() {
        return videoUrl;
    }
    
    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }
    
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
    
    public ExerciseTypeEntity getExerciseType() {
        return exerciseType;
    }
    
    public void setExerciseType(ExerciseTypeEntity exerciseType) {
        this.exerciseType = exerciseType;
    }
    
    public CategoryEntity getCategory() {
        return category;
    }
    
    public void setCategory(CategoryEntity category) {
        this.category = category;
    }
    
    public IntensityEntity getIntensity() {
        return intensity;
    }
    
    public void setIntensity(IntensityEntity intensity) {
        this.intensity = intensity;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public Boolean getIsPremium() {
        return isPremium;
    }
    
    public void setIsPremium(Boolean isPremium) {
        this.isPremium = isPremium;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
