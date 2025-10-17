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
import jakarta.persistence.Table;

@Entity
@Table(name = "routine_exercises")
public class RoutineExerciseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id", nullable = false)
    private RoutineEntity routine;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id", nullable = false)
    private ExerciseEntity exercise;
    
    @Column(name = "exercise_order", nullable = false)
    private Integer exerciseOrder;
    
    @Column(name = "duration_seconds")
    private Integer durationSeconds;
    
    @Column(name = "repetitions")
    private Integer repetitions;
    
    @Column(name = "sets")
    private Integer sets;
    
    @Column(name = "rest_seconds")
    private Integer restSeconds;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    // Constructores
    public RoutineExerciseEntity() {}
    
    public RoutineExerciseEntity(RoutineEntity routine, ExerciseEntity exercise, Integer exerciseOrder) {
        this.routine = routine;
        this.exercise = exercise;
        this.exerciseOrder = exerciseOrder;
    }
    
    // Getters y Setters
    public Long getId() { 
        return id; 
    }
    
    public void setId(Long id) { 
        this.id = id; 
    }
    
    public RoutineEntity getRoutine() { 
        return routine; 
    }
    
    public void setRoutine(RoutineEntity routine) { 
        this.routine = routine; 
    }
    
    public ExerciseEntity getExercise() { 
        return exercise; 
    }
    
    public void setExercise(ExerciseEntity exercise) { 
        this.exercise = exercise; 
    }
    
    public Integer getExerciseOrder() { 
        return exerciseOrder; 
    }
    
    public void setExerciseOrder(Integer exerciseOrder) { 
        this.exerciseOrder = exerciseOrder; 
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
    
    public Integer getRestSeconds() { 
        return restSeconds; 
    }
    
    public void setRestSeconds(Integer restSeconds) { 
        this.restSeconds = restSeconds; 
    }
    
    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }
}