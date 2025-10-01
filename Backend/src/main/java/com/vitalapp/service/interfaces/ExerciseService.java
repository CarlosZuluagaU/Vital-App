package com.vitalapp.service.interfaces;

import java.util.List;

import com.vitalapp.presentation.dto.ExerciseDetailDTO;
import com.vitalapp.presentation.dto.ExerciseSummaryDTO;

public interface ExerciseService {
    
    List<ExerciseSummaryDTO> getAllExercises(Long categoryId, Long intensityId, 
                                           Long exerciseTypeId, String locationType);
    
    List<ExerciseSummaryDTO> getGymExercises(Long categoryId, Long intensityId);
    
    List<ExerciseSummaryDTO> getHomeExercises(Long categoryId, Long intensityId);
    
    ExerciseDetailDTO getExerciseById(Long id);
    
    List<ExerciseSummaryDTO> getExercisesByCategory(Long categoryId, String locationType);
}
