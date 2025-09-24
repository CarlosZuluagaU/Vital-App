package com.vitalapp.persistence.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "intensities")
public class IntensityEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "name", nullable = false, length = 50)
    private String name;
    
    @Column(name = "level", nullable = false)
    private Integer level; // 1 = Suave, 2 = Moderado, 3 = Intenso
    
    @OneToMany(mappedBy = "intensity", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<RoutineEntity> routines;
    
    // Constructors
    public IntensityEntity() {}
    
    public IntensityEntity(String name, Integer level) {
        this.name = name;
        this.level = level;
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
    
    public Integer getLevel() {
        return level;
    }
    
    public void setLevel(Integer level) {
        this.level = level;
    }
    
    public List<RoutineEntity> getRoutines() {
        return routines;
    }
    
    public void setRoutines(List<RoutineEntity> routines) {
        this.routines = routines;
    }
}
