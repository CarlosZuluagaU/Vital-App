package com.vitalapp.infrastructure.web.dto;

import java.util.List;

public class RoutineDetailDto {
    private Long id;
    private String title;
    private String level;
    private String description;
    private List<ExerciseDto> exercises;

    public RoutineDetailDto() {}

    public RoutineDetailDto(Long id, String title, String level, String description, List<ExerciseDto> exercises) {
        this.id = id;
        this.title = title;
        this.level = level;
        this.description = description;
        this.exercises = exercises;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<ExerciseDto> getExercises() { return exercises; }
    public void setExercises(List<ExerciseDto> exercises) { this.exercises = exercises; }
}
