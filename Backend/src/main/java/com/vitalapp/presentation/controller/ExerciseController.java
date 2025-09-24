package com.vitalapp.presentation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vitalapp.presentation.dto.ExerciseDetailDTO;
import com.vitalapp.presentation.dto.ExerciseSummaryDTO;
import com.vitalapp.service.interfaces.ExerciseService;

@RestController
@RequestMapping("/api/exercises")
@CrossOrigin(origins = "*")
public class ExerciseController {
    
    @Autowired
    private ExerciseService exerciseService;
  
    @GetMapping
    public ResponseEntity<List<ExerciseSummaryDTO>> getAllExercises(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long intensityId,
            @RequestParam(required = false) Long exerciseTypeId,
            @RequestParam(required = false) String locationType) {
        
        List<ExerciseSummaryDTO> exercises = exerciseService.getAllExercises(
                categoryId, intensityId, exerciseTypeId, locationType);
        return ResponseEntity.ok(exercises);
    }
    
    /**
     * Obtener ejercicios de gimnasio
     * GET /api/exercises/gym?categoryId=1&intensityId=2
     */
    @GetMapping("/gym")
    public ResponseEntity<List<ExerciseSummaryDTO>> getGymExercises(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long intensityId) {
        
        List<ExerciseSummaryDTO> exercises = exerciseService.getGymExercises(categoryId, intensityId);
        return ResponseEntity.ok(exercises);
    }
    
    /**
     * Obtener ejercicios para hacer en casa
     * GET /api/exercises/home?categoryId=1&intensityId=2
     */
    @GetMapping("/home")
    public ResponseEntity<List<ExerciseSummaryDTO>> getHomeExercises(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long intensityId) {
        
        List<ExerciseSummaryDTO> exercises = exerciseService.getHomeExercises(categoryId, intensityId);
        return ResponseEntity.ok(exercises);
    }
    
    /**
     * Obtener detalles de un ejercicio específico
     * GET /api/exercises/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExerciseDetailDTO> getExerciseById(@PathVariable Long id) {
        try {
            ExerciseDetailDTO exercise = exerciseService.getExerciseById(id);
            return ResponseEntity.ok(exercise);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Obtener ejercicios por categoría y tipo de ubicación
     * GET /api/exercises/category/{categoryId}?locationType=HOME
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ExerciseSummaryDTO>> getExercisesByCategory(
            @PathVariable Long categoryId,
            @RequestParam(required = false) String locationType) {
        
        List<ExerciseSummaryDTO> exercises = exerciseService.getExercisesByCategory(categoryId, locationType);
        return ResponseEntity.ok(exercises);
    }
}
