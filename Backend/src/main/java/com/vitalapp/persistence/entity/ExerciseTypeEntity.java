package com.vitalapp.persistence.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "exercise_types")
public class ExerciseTypeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false, length = 100)
    private String name;
    
    @Column(name = "description", length = 500)
    private String description;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "location_type", nullable = false)
    private LocationType locationType;
    
    @OneToMany(mappedBy = "exerciseType", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<ExerciseEntity> exercises;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructors
    public ExerciseTypeEntity() {}
    
    public ExerciseTypeEntity(String name, String description, LocationType locationType) {
        this.name = name;
        this.description = description;
        this.locationType = locationType;
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
    
    public LocationType getLocationType() {
        return locationType;
    }
    
    public void setLocationType(LocationType locationType) {
        this.locationType = locationType;
    }
    
    public List<ExerciseEntity> getExercises() {
        return exercises;
    }
    
    public void setExercises(List<ExerciseEntity> exercises) {
        this.exercises = exercises;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    // Enum for location types
    public enum LocationType {
        GYM,        // Requiere gimnasio
        HOME        // Se puede hacer en casa
    }
}
