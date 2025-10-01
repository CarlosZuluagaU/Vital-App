package com.vitalapp.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.ExerciseEntity;
import com.vitalapp.persistence.entity.ExerciseTypeEntity;
import com.vitalapp.persistence.repository.ExerciseRepository;
import com.vitalapp.presentation.dto.ExerciseDetailDTO;
import com.vitalapp.presentation.dto.ExerciseSummaryDTO;
import com.vitalapp.service.interfaces.ExerciseService;

@Service
public class ExerciseServiceImpl implements ExerciseService {
    
    @Autowired
    private ExerciseRepository exerciseRepository;
    
    @Override
    public List<ExerciseSummaryDTO> getAllExercises(Long categoryId, Long intensityId, 
                                                  Long exerciseTypeId, String locationType) {
        ExerciseTypeEntity.LocationType locationTypeEnum = null;
        if (locationType != null) {
            try {
                locationTypeEnum = ExerciseTypeEntity.LocationType.valueOf(locationType.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Si el locationType no es válido, ignorar el filtro
            }
        }
        
        List<ExerciseEntity> exercises = exerciseRepository.findByFilters(
                categoryId, intensityId, exerciseTypeId, locationTypeEnum);
        
        return exercises.stream()
                .map(this::convertToSummaryDTO)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ExerciseSummaryDTO> getGymExercises(Long categoryId, Long intensityId) {
        return getAllExercises(categoryId, intensityId, null, "GYM");
    }
    
    @Override
    public List<ExerciseSummaryDTO> getHomeExercises(Long categoryId, Long intensityId) {
        return getAllExercises(categoryId, intensityId, null, "HOME");
    }
    
    @Override
    public ExerciseDetailDTO getExerciseById(Long id) {
        Optional<ExerciseEntity> exerciseOpt = exerciseRepository.findById(id);
        
        if (exerciseOpt.isPresent()) {
            return convertToDetailDTO(exerciseOpt.get());
        } else {
            throw new RuntimeException("Exercise not found with id: " + id);
        }
    }
    
    @Override
    public List<ExerciseSummaryDTO> getExercisesByCategory(Long categoryId, String locationType) {
        ExerciseTypeEntity.LocationType locationTypeEnum = null;
        if (locationType != null) {
            try {
                locationTypeEnum = ExerciseTypeEntity.LocationType.valueOf(locationType.toUpperCase());
            } catch (IllegalArgumentException e) {
                // Si el locationType no es válido, ignorar el filtro
            }
        }
        
        if (locationTypeEnum != null) {
            List<ExerciseEntity> exercises = exerciseRepository.findByLocationTypeAndCategory(
                    locationTypeEnum, categoryId);
            return exercises.stream()
                    .map(this::convertToSummaryDTO)
                    .collect(Collectors.toList());
        } else {
            List<ExerciseEntity> exercises = exerciseRepository.findByCategoryIdAndIsActive(categoryId, true);
            return exercises.stream()
                    .map(this::convertToSummaryDTO)
                    .collect(Collectors.toList());
        }
    }
    
    private ExerciseSummaryDTO convertToSummaryDTO(ExerciseEntity exercise) {
        return new ExerciseSummaryDTO(
                exercise.getId(),
                exercise.getName(),
                exercise.getDescription(),
                exercise.getCategory().getName(),
                exercise.getIntensity().getName(),
                exercise.getExerciseType().getName(),
                exercise.getExerciseType().getLocationType().name(),
                exercise.getDurationSeconds(),
                exercise.getRepetitions(),
                exercise.getSets(),
                exercise.getImageUrl(),
                exercise.getVideoUrl(),
                exercise.getSafetyTips(),
                exercise.getBenefits()
        );
    }
    
    private ExerciseDetailDTO convertToDetailDTO(ExerciseEntity exercise) {
        return new ExerciseDetailDTO(
                exercise.getId(),
                exercise.getName(),
                exercise.getDescription(),
                exercise.getInstructions(),
                exercise.getSafetyTips(),
                exercise.getModifications(),
                exercise.getBenefits(),
                exercise.getCategory().getName(),
                exercise.getIntensity().getName(),
                exercise.getExerciseType().getName(),
                exercise.getExerciseType().getLocationType().name(),
                exercise.getDurationSeconds(),
                exercise.getRepetitions(),
                exercise.getSets(),
                exercise.getVideoUrl(),
                exercise.getImageUrl()
        );
    }
}
