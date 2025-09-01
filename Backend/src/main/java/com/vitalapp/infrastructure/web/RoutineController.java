package com.vitalapp.infrastructure.web;

import com.vitalapp.infrastructure.web.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.net.URI;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api")
public class RoutineController {
    @GetMapping("/rutinas")
    public List<RoutineSummaryDto> getRoutines(@RequestParam(value = "nivel", required = false) String nivel) {
        List<RoutineSummaryDto> all = Arrays.asList(
                new RoutineSummaryDto(1L, "Rutina Básica", "BASICO"),
                new RoutineSummaryDto(2L, "Rutina Intermedia", "INTERMEDIO")
        );
        if (nivel == null || (!nivel.equalsIgnoreCase("basico") && !nivel.equalsIgnoreCase("intermedio"))) {
            return all;
        }
        List<RoutineSummaryDto> filtered = new ArrayList<>();
        for (RoutineSummaryDto dto : all) {
            if (dto.getLevel().equalsIgnoreCase(nivel)) {
                filtered.add(dto);
            }
        }
        return filtered;
    }

    @GetMapping("/rutinas/{id}")
    public RoutineDetailDto getRoutineDetail(@PathVariable Long id) {
        if (id == null || id <= 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Rutina no encontrada");
        }
        List<ExerciseDto> exercises = Arrays.asList(
                new ExerciseDto("Sentadillas", "Haz 15 repeticiones", null, "FUERZA", 1),
                new ExerciseDto("Plancha", "Mantén 30 segundos", null, "FUNCIONAL", 2),
                new ExerciseDto("Equilibrio en un pie", "Sostén 20 segundos", null, "EQUILIBRIO", 3)
        );
        return new RoutineDetailDto(id, "Rutina Dummy", id == 1 ? "BASICO" : "INTERMEDIO", "Descripción de rutina dummy", exercises);
    }

    @PostMapping("/progreso")
    public ResponseEntity<Void> createProgress(@Valid @RequestBody CreateProgressRequest request) {
        // Validación por anotaciones
        URI location = URI.create("/api/progreso/" + request.getDate());
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/progreso/semana")
    public WeeklyTotalsResponse getWeeklyProgress(@RequestParam(value = "desde", required = false) String desde) {
        LocalDate from = (desde != null) ? LocalDate.parse(desde) : LocalDate.now();
        LocalDate to = from.plusDays(6);
        List<WeeklyTotalsResponse.Item> items = new ArrayList<>();
        int[] dummies = {0, 10, 0, 20, 0, 15, 5};
        for (int i = 0; i < 7; i++) {
            items.add(new WeeklyTotalsResponse.Item(from.plusDays(i), dummies[i % dummies.length]));
        }
        return new WeeklyTotalsResponse(from, to, items);
    }
}
