package com.vitalapp.infrastructure.web.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class CreateProgressRequest {
    @NotNull
    private LocalDate date;
    @NotNull
    @Min(1)
    @Max(300)
    private Integer minutes;
    @NotNull
    private Long routineId;

    public CreateProgressRequest() {}

    public CreateProgressRequest(LocalDate date, Integer minutes, Long routineId) {
        this.date = date;
        this.minutes = minutes;
        this.routineId = routineId;
    }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public Integer getMinutes() { return minutes; }
    public void setMinutes(Integer minutes) { this.minutes = minutes; }
    public Long getRoutineId() { return routineId; }
    public void setRoutineId(Long routineId) { this.routineId = routineId; }
}
