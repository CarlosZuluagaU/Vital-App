package com.vitalapp.service.implementation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.presentation.dto.ExerciseSummaryDTO;
import com.vitalapp.presentation.dto.MulticomponentRoutineDTO;
import com.vitalapp.service.interfaces.ExerciseService;
import com.vitalapp.service.interfaces.MulticomponentRoutineService;

@Service
public class MulticomponentRoutineServiceImpl implements MulticomponentRoutineService {
    
    @Autowired
    private ExerciseService exerciseService;
    
    @Override
    public MulticomponentRoutineDTO generateAdaptedRoutine(Integer userAge, String intensityLevel, String locationType) {
        String ageGroup = determineAgeGroup(userAge);
        
        MulticomponentRoutineDTO routine = new MulticomponentRoutineDTO();
        routine.setTitle("Rutina Multicomponente Adaptada - " + ageGroup + " años");
        routine.setDescription("Rutina completa que incluye ejercicios de fuerza, equilibrio, flexibilidad y cardio, adaptada para adultos mayores de " + ageGroup + " años.");
        routine.setIntensityLevel(intensityLevel);
        routine.setAgeGroup(ageGroup);
        
        // Obtener ejercicios por categorías específicas
        routine.setWarmUpExercises(getWarmUpExercises(intensityLevel, locationType));
        routine.setStrengthExercises(getStrengthExercises(intensityLevel, locationType));
        routine.setBalanceExercises(getBalanceExercises(intensityLevel, locationType));
        routine.setFlexibilityExercises(getFlexibilityExercises(intensityLevel, locationType));
        routine.setCardioExercises(getCardioExercises(intensityLevel, locationType));
        routine.setCoolDownExercises(getCoolDownExercises(intensityLevel, locationType));
        
        // Calcular duración total
        int totalDuration = calculateTotalDuration(routine);
        routine.setTotalDurationMinutes(totalDuration);
        
        // Agregar notas de seguridad específicas para la edad
        routine.setSafetyNotes(generateSafetyNotes(ageGroup, intensityLevel));
        routine.setAdaptationNotes(generateAdaptationNotes(ageGroup));
        routine.setBenefitsDescription(generateBenefitsDescription());
        
        return routine;
    }
    
    @Override
    public List<MulticomponentRoutineDTO> getRoutinesByAgeGroup(String ageGroup) {
        List<MulticomponentRoutineDTO> routines = new ArrayList<>();
        
        // Crear rutinas específicas para cada grupo de edad
        routines.add(generateRoutineForAgeGroup(ageGroup, "Suave"));
        routines.add(generateRoutineForAgeGroup(ageGroup, "Moderado"));
        
        return routines;
    }
    
    @Override
    public List<MulticomponentRoutineDTO> getRoutinesByIntensity(String intensityLevel) {
        List<MulticomponentRoutineDTO> routines = new ArrayList<>();
        
        String[] ageGroups = {"65-70", "71-75", "76-80", "80+"};
        
        for (String ageGroup : ageGroups) {
            routines.add(generateRoutineForAgeGroup(ageGroup, intensityLevel));
        }
        
        return routines;
    }
    
    @Override
    public List<MulticomponentRoutineDTO> getAllMulticomponentRoutines() {
        List<MulticomponentRoutineDTO> allRoutines = new ArrayList<>();
        
        String[] intensityLevels = {"Suave", "Moderado"};
        String[] ageGroups = {"65-70", "71-75", "76-80", "80+"};
        
        for (String intensity : intensityLevels) {
            for (String ageGroup : ageGroups) {
                allRoutines.add(generateRoutineForAgeGroup(ageGroup, intensity));
            }
        }
        
        return allRoutines;
    }
    
    private String determineAgeGroup(Integer age) {
        if (age >= 65 && age <= 70) return "65-70";
        if (age >= 71 && age <= 75) return "71-75";
        if (age >= 76 && age <= 80) return "76-80";
        return "80+";
    }
    
    private MulticomponentRoutineDTO generateRoutineForAgeGroup(String ageGroup, String intensityLevel) {
        MulticomponentRoutineDTO routine = new MulticomponentRoutineDTO();
        routine.setTitle("Rutina Multicomponente - " + ageGroup + " años (" + intensityLevel + ")");
        routine.setDescription("Rutina equilibrada de ejercicios adaptada para adultos mayores de " + ageGroup + " años con intensidad " + intensityLevel.toLowerCase() + ".");
        routine.setIntensityLevel(intensityLevel);
        routine.setAgeGroup(ageGroup);
        
        // Adaptar ejercicios según el grupo de edad
        String locationType = "HOME"; // Por defecto ejercicios en casa
        
        routine.setWarmUpExercises(getWarmUpExercises(intensityLevel, locationType));
        routine.setStrengthExercises(getStrengthExercises(intensityLevel, locationType));
        routine.setBalanceExercises(getBalanceExercises(intensityLevel, locationType));
        routine.setFlexibilityExercises(getFlexibilityExercises(intensityLevel, locationType));
        routine.setCardioExercises(getCardioExercises(intensityLevel, locationType));
        routine.setCoolDownExercises(getCoolDownExercises(intensityLevel, locationType));
        
        int totalDuration = calculateTotalDuration(routine);
        routine.setTotalDurationMinutes(totalDuration);
        
        routine.setSafetyNotes(generateSafetyNotes(ageGroup, intensityLevel));
        routine.setAdaptationNotes(generateAdaptationNotes(ageGroup));
        routine.setBenefitsDescription(generateBenefitsDescription());
        
        return routine;
    }
    
    private List<ExerciseSummaryDTO> getWarmUpExercises(String intensityLevel, String locationType) {
        // Obtener ejercicios de calentamiento (movilidad articular)
        try {
            return exerciseService.getExercisesByCategory(2L, locationType); // Articulaciones Felices
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<ExerciseSummaryDTO> getStrengthExercises(String intensityLevel, String locationType) {
        // Obtener ejercicios de fuerza funcional
        try {
            return exerciseService.getExercisesByCategory(3L, locationType); // Fuerza Funcional
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<ExerciseSummaryDTO> getBalanceExercises(String intensityLevel, String locationType) {
        // Obtener ejercicios de equilibrio
        try {
            return exerciseService.getExercisesByCategory(1L, locationType); // Fortalece tu Equilibrio
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<ExerciseSummaryDTO> getFlexibilityExercises(String intensityLevel, String locationType) {
        // Obtener ejercicios de flexibilidad
        try {
            return exerciseService.getExercisesByCategory(4L, locationType); // Flexibilidad y Relajación
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<ExerciseSummaryDTO> getCardioExercises(String intensityLevel, String locationType) {
        // Obtener ejercicios cardiovasculares
        try {
            // Buscar ejercicios de cardio (podrían estar en diferentes categorías)
            List<ExerciseSummaryDTO> allExercises = exerciseService.getAllExercises(null, null, null, locationType);
            return allExercises.stream()
                    .filter(ex -> ex.getName().toLowerCase().contains("marcha") || 
                                 ex.getName().toLowerCase().contains("cardio") ||
                                 ex.getName().toLowerCase().contains("caminar"))
                    .limit(2)
                    .toList();
        } catch (Exception e) {
            return new ArrayList<>();
        }
    }
    
    private List<ExerciseSummaryDTO> getCoolDownExercises(String intensityLevel, String locationType) {
        // Ejercicios de enfriamiento (similares a flexibilidad)
        return getFlexibilityExercises(intensityLevel, locationType);
    }
    
    private int calculateTotalDuration(MulticomponentRoutineDTO routine) {
        int total = 0;
        
        // Calentamiento: 5-8 minutos
        total += 6;
        
        // Fuerza: 15-20 minutos
        total += 18;
        
        // Equilibrio: 8-10 minutos
        total += 9;
        
        // Cardio: 10-15 minutos
        total += 12;
        
        // Flexibilidad: 8-10 minutos
        total += 9;
        
        // Enfriamiento: 5 minutos
        total += 5;
        
        return total; // Total aproximado: 55-60 minutos
    }
    
    private String generateSafetyNotes(String ageGroup, String intensityLevel) {
        StringBuilder notes = new StringBuilder();
        notes.append("IMPORTANTE: ");
        
        if ("80+".equals(ageGroup)) {
            notes.append("Realizar todos los ejercicios cerca de una silla o pared para apoyo. ");
            notes.append("Comenzar con repeticiones reducidas y aumentar gradualmente. ");
        } else if ("76-80".equals(ageGroup)) {
            notes.append("Mantener siempre una mano cerca de un apoyo durante ejercicios de equilibrio. ");
        }
        
        notes.append("Detenerse inmediatamente si siente dolor, mareo o dificultad para respirar. ");
        notes.append("Hidratarse antes, durante y después del ejercicio. ");
        notes.append("Si toma medicamentos para la presión arterial, consulte a su médico antes de iniciar.");
        
        return notes.toString();
    }
    
    private String generateAdaptationNotes(String ageGroup) {
        return "Esta rutina puede adaptarse según sus capacidades: " +
               "reduzca repeticiones si es necesario, use silla para apoyo en ejercicios de pie, " +
               "y tome descansos adicionales entre ejercicios. Lo importante es mantenerse activo de forma segura.";
    }
    
    private String generateBenefitsDescription() {
        return "Esta rutina multicomponente está diseñada para: " +
               "mejorar la fuerza muscular y ósea, " +
               "enhancer el equilibrio y prevenir caídas, " +
               "mantener la flexibilidad articular, " +
               "fortalecer el sistema cardiovascular, " +
               "y promover la independencia en actividades diarias.";
    }
}
