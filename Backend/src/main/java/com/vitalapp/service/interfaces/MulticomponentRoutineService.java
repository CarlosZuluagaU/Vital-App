package com.vitalapp.service.interfaces;

import java.util.List;

import com.vitalapp.presentation.dto.MulticomponentRoutineDTO;

public interface MulticomponentRoutineService {
    
    /**
     * Genera una rutina multicomponente adaptada según la edad y nivel del usuario
     */
    MulticomponentRoutineDTO generateAdaptedRoutine(Integer userAge, String intensityLevel, String locationType);
    
    /**
     * Obtiene rutinas predefinidas para diferentes grupos de edad
     */
    List<MulticomponentRoutineDTO> getRoutinesByAgeGroup(String ageGroup);
    
    /**
     * Obtiene rutinas según el nivel de intensidad
     */
    List<MulticomponentRoutineDTO> getRoutinesByIntensity(String intensityLevel);
    
    /**
     * Obtiene rutinas multicomponente completas (con todos los ejercicios)
     */
    List<MulticomponentRoutineDTO> getAllMulticomponentRoutines();
}
