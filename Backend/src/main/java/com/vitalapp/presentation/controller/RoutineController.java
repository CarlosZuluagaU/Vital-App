package com.vitalapp.presentation.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.vitalapp.presentation.dto.RoutineDetailDTO;
import com.vitalapp.presentation.dto.RoutineSummaryDTO;
import com.vitalapp.service.interfaces.RoutineService;

@org.springframework.web.bind.annotation.RestController
@RequestMapping("/api/routines")
@CrossOrigin(origins = "*")
public class RoutineController {
    
    @Autowired
    private RoutineService routineService;
    
    @GetMapping
    public ResponseEntity<List<RoutineSummaryDTO>> getAllRoutines(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long intensityId) {
        
        List<RoutineSummaryDTO> routines = routineService.getAllRoutines(categoryId, intensityId);
        return ResponseEntity.ok(routines);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<RoutineDetailDTO> getRoutineById(@PathVariable Long id) {
        try {
            RoutineDetailDTO routine = routineService.getRoutineById(id);
            return ResponseEntity.ok(routine);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
