package com.vitalapp.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.RoutineExerciseEntity;
import com.vitalapp.persistence.repository.RoutineExerciseRepository;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.presentation.dto.RoutineDetailDTO;
import com.vitalapp.presentation.dto.RoutineExerciseDTO;
import com.vitalapp.presentation.dto.RoutineSummaryDTO;
import com.vitalapp.service.interfaces.RoutineService;

@Service
public class RoutineServiceImpl implements RoutineService {
    
    @Autowired
    private RoutineRepository routineRepository;
    
    @Autowired
    private RoutineExerciseRepository routineExerciseRepository;
    
    @Override
    public List<RoutineSummaryDTO> getAllRoutines(Long categoryId, Long intensityId) {
        List<RoutineEntity> routines;
        
        if (categoryId != null || intensityId != null) {
            routines = routineRepository.findByFilters(categoryId, intensityId);
        } else {
            routines = routineRepository.findAll();
        }
        
        return routines.stream()
                .map(this::convertToSummaryDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public RoutineDetailDTO getRoutineById(Long id) {
        Optional<RoutineEntity> routineOpt = routineRepository.findById(id);
        
        if (routineOpt.isPresent()) {
            return convertToDetailDTO(routineOpt.get());
        } else {
            throw new RuntimeException("Routine not found with id: " + id);
        }
    }
    
    private RoutineSummaryDTO convertToSummaryDTO(RoutineEntity routine) {
        return new RoutineSummaryDTO(
                routine.getId(),
                routine.getTitle(),
                routine.getDurationMinutes(),
                routine.getIntensity().getName(),
                routine.getCategory().getName(),
                routine.getThumbnailUrl()
        );
    }
    
    private RoutineDetailDTO convertToDetailDTO(RoutineEntity routine) {
        // Obtener ejercicios de la rutina
        List<RoutineExerciseEntity> routineExercises = routineExerciseRepository.findByRoutineIdWithExercises(routine.getId());
        
        // Convertir ejercicios a DTOs
        List<RoutineExerciseDTO> exerciseDTOs = routineExercises.stream()
                .map(this::convertToRoutineExerciseDTO)
                .collect(Collectors.toList());
        
        RoutineDetailDTO detailDTO = new RoutineDetailDTO(
                routine.getId(),
                routine.getTitle(),
                routine.getDescription(),
                routine.getDurationMinutes(),
                routine.getIntensity().getName(),
                routine.getCategory().getName(),
                routine.getVideoUrl(),
                routine.getThumbnailUrl(),
                routine.getIsPremium()
        );
        
        // Asignar ejercicios
        detailDTO.setExercises(exerciseDTOs);
        
        return detailDTO;
    }
    
    private RoutineExerciseDTO convertToRoutineExerciseDTO(RoutineExerciseEntity routineExercise) {
        return new RoutineExerciseDTO(
                routineExercise.getExercise().getId(),
                routineExercise.getExercise().getName(),
                routineExercise.getExercise().getDescription(),
                routineExercise.getExercise().getInstructions(),
                routineExercise.getExercise().getImageUrl(),
                routineExercise.getExercise().getVideoUrl(),
                routineExercise.getExerciseOrder(),
                routineExercise.getDurationSeconds() != null ? routineExercise.getDurationSeconds() : routineExercise.getExercise().getDurationSeconds(),
                routineExercise.getRepetitions() != null ? routineExercise.getRepetitions() : routineExercise.getExercise().getRepetitions(),
                routineExercise.getSets() != null ? routineExercise.getSets() : routineExercise.getExercise().getSets(),
                routineExercise.getRestSeconds(),
                routineExercise.getExercise().getCategory().getName(),
                routineExercise.getExercise().getIntensity().getName(),
                routineExercise.getExercise().getExerciseType().getName(),
                routineExercise.getExercise().getBenefits(),
                routineExercise.getExercise().getSafetyTips(),
                routineExercise.getExercise().getModifications()
        );
    }
}
