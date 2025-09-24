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

import com.vitalapp.presentation.dto.MulticomponentRoutineDTO;
import com.vitalapp.service.interfaces.MulticomponentRoutineService;

@RestController
@RequestMapping("/api/multicomponent-routines")
@CrossOrigin(origins = "*")
public class MulticomponentRoutineController {
    
    @Autowired
    private MulticomponentRoutineService multicomponentRoutineService;
    
    /**
     * Generar rutina adaptada para un usuario específico
     * GET /api/multicomponent-routines/generate?age=70&intensity=Suave&location=HOME
     */
    @GetMapping("/generate")
    public ResponseEntity<MulticomponentRoutineDTO> generateAdaptedRoutine(
            @RequestParam Integer age,
            @RequestParam(defaultValue = "Suave") String intensity,
            @RequestParam(defaultValue = "HOME") String location) {
        
        try {
            MulticomponentRoutineDTO routine = multicomponentRoutineService
                    .generateAdaptedRoutine(age, intensity, location);
            return ResponseEntity.ok(routine);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Obtener rutinas por grupo de edad
     * GET /api/multicomponent-routines/age-group/65-70
     */
    @GetMapping("/age-group/{ageGroup}")
    public ResponseEntity<List<MulticomponentRoutineDTO>> getRoutinesByAgeGroup(
            @PathVariable String ageGroup) {
        
        try {
            List<MulticomponentRoutineDTO> routines = multicomponentRoutineService
                    .getRoutinesByAgeGroup(ageGroup);
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Obtener rutinas por nivel de intensidad
     * GET /api/multicomponent-routines/intensity/Suave
     */
    @GetMapping("/intensity/{intensityLevel}")
    public ResponseEntity<List<MulticomponentRoutineDTO>> getRoutinesByIntensity(
            @PathVariable String intensityLevel) {
        
        try {
            List<MulticomponentRoutineDTO> routines = multicomponentRoutineService
                    .getRoutinesByIntensity(intensityLevel);
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Obtener todas las rutinas multicomponente disponibles
     * GET /api/multicomponent-routines
     */
    @GetMapping
    public ResponseEntity<List<MulticomponentRoutineDTO>> getAllMulticomponentRoutines() {
        try {
            List<MulticomponentRoutineDTO> routines = multicomponentRoutineService
                    .getAllMulticomponentRoutines();
            return ResponseEntity.ok(routines);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Endpoint específico para adultos mayores - rutina del día
     * GET /api/multicomponent-routines/daily-routine?age=68
     */
    @GetMapping("/daily-routine")
    public ResponseEntity<MulticomponentRoutineDTO> getDailyRoutine(
            @RequestParam Integer age,
            @RequestParam(defaultValue = "Suave") String preferredIntensity) {
        
        try {
            // Generar rutina diaria adaptada
            MulticomponentRoutineDTO routine = multicomponentRoutineService
                    .generateAdaptedRoutine(age, preferredIntensity, "HOME");
            
            // Personalizar título para rutina diaria
            routine.setTitle("Tu Rutina Diaria Personalizada");
            routine.setDescription("Rutina completa y segura diseñada especialmente para ti, " +
                    "adaptada a tu edad y nivel de condición física.");
            
            return ResponseEntity.ok(routine);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
