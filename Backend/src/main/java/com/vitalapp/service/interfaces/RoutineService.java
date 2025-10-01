package com.vitalapp.service.interfaces;

import java.util.List;

import com.vitalapp.presentation.dto.RoutineDetailDTO;
import com.vitalapp.presentation.dto.RoutineSummaryDTO;

public interface RoutineService {
    
    List<RoutineSummaryDTO> getAllRoutines(Long categoryId, Long intensityId);
    
    RoutineDetailDTO getRoutineById(Long id);
}
