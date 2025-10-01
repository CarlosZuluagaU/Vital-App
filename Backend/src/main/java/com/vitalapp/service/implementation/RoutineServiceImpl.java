package com.vitalapp.service.implementation;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.presentation.dto.RoutineDetailDTO;
import com.vitalapp.presentation.dto.RoutineSummaryDTO;
import com.vitalapp.service.interfaces.RoutineService;

@Service
public class RoutineServiceImpl implements RoutineService {
    
    @Autowired
    private RoutineRepository routineRepository;
    
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
        return new RoutineDetailDTO(
                routine.getId(),
                routine.getTitle(),
                routine.getDescription(),
                routine.getDurationMinutes(),
                routine.getIntensity().getName(),
                routine.getCategory().getName(),
                routine.getVideoUrl()
        );
    }
}
