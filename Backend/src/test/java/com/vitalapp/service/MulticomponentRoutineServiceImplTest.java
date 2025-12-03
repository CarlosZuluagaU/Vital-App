package com.vitalapp.service;

import com.vitalapp.presentation.dto.MulticomponentRoutineDTO;
import com.vitalapp.service.implementation.MulticomponentRoutineServiceImpl;
import com.vitalapp.service.interfaces.ExerciseService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MulticomponentRoutineServiceImplTest {

    @Mock
    private ExerciseService exerciseService;

    @InjectMocks
    private MulticomponentRoutineServiceImpl multicomponentRoutineService;

    @BeforeEach
    void setUp() {
        when(exerciseService.getAllExercises(anyLong(), anyLong(), anyLong(), any()))
                .thenReturn(Collections.emptyList());
    }

    @Test
    void testGenerateAdaptedRoutine_Age65to70() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(67, "Moderado", "HOME");

        assertNotNull(routine);
        assertEquals("65-70", routine.getAgeGroup());
        assertTrue(routine.getTitle().contains("65-70"));
        assertEquals("Moderado", routine.getIntensityLevel());
        assertNotNull(routine.getSafetyNotes());
        assertNotNull(routine.getAdaptationNotes());
    }

    @Test
    void testGenerateAdaptedRoutine_Age71to75() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(73, "Suave", "HOME");

        assertNotNull(routine);
        assertEquals("71-75", routine.getAgeGroup());
        assertTrue(routine.getTitle().contains("71-75"));
    }

    @Test
    void testGenerateAdaptedRoutine_Age76to80() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(78, "Moderado", "GYM");

        assertNotNull(routine);
        assertEquals("76-80", routine.getAgeGroup());
        assertTrue(routine.getTitle().contains("76-80"));
    }

    @Test
    void testGenerateAdaptedRoutine_Age80Plus() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(85, "Suave", "HOME");

        assertNotNull(routine);
        assertEquals("80+", routine.getAgeGroup());
        assertTrue(routine.getTitle().contains("80+"));
    }

    @Test
    void testGetRoutinesByAgeGroup() {
        List<MulticomponentRoutineDTO> routines = multicomponentRoutineService.getRoutinesByAgeGroup("65-70");

        assertNotNull(routines);
        assertEquals(2, routines.size());
        assertTrue(routines.stream().anyMatch(r -> r.getTitle().contains("Suave")));
        assertTrue(routines.stream().anyMatch(r -> r.getTitle().contains("Moderado")));
    }

    @Test
    void testGetRoutinesByIntensity_Suave() {
        List<MulticomponentRoutineDTO> routines = multicomponentRoutineService.getRoutinesByIntensity("Suave");

        assertNotNull(routines);
        assertEquals(4, routines.size());
        assertTrue(routines.stream().allMatch(r -> r.getTitle().contains("Suave")));
    }

    @Test
    void testGetRoutinesByIntensity_Moderado() {
        List<MulticomponentRoutineDTO> routines = multicomponentRoutineService.getRoutinesByIntensity("Moderado");

        assertNotNull(routines);
        assertEquals(4, routines.size());
        assertTrue(routines.stream().allMatch(r -> r.getTitle().contains("Moderado")));
    }

    @Test
    void testGetAllMulticomponentRoutines() {
        List<MulticomponentRoutineDTO> routines = multicomponentRoutineService.getAllMulticomponentRoutines();

        assertNotNull(routines);
        assertEquals(8, routines.size());
    }

    @Test
    void testGenerateAdaptedRoutine_DifferentLocations() {
        MulticomponentRoutineDTO homeRoutine = multicomponentRoutineService.generateAdaptedRoutine(70, "Moderado", "HOME");
        MulticomponentRoutineDTO gymRoutine = multicomponentRoutineService.generateAdaptedRoutine(70, "Moderado", "GYM");

        assertNotNull(homeRoutine);
        assertNotNull(gymRoutine);
        assertEquals(homeRoutine.getAgeGroup(), gymRoutine.getAgeGroup());
    }

    @Test
    void testRoutineHasAllComponents() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(70, "Moderado", "HOME");

        assertNotNull(routine.getWarmUpExercises());
        assertNotNull(routine.getStrengthExercises());
        assertNotNull(routine.getBalanceExercises());
        assertNotNull(routine.getFlexibilityExercises());
        assertNotNull(routine.getCardioExercises());
        assertNotNull(routine.getCoolDownExercises());
    }

    @Test
    void testRoutineHasDescription() {
        MulticomponentRoutineDTO routine = multicomponentRoutineService.generateAdaptedRoutine(75, "Suave", "HOME");

        assertNotNull(routine.getDescription());
        assertNotNull(routine.getBenefitsDescription());
        assertTrue(routine.getDescription().length() > 0);
    }

    @Test
    void testRoutineIntensityLevels() {
        MulticomponentRoutineDTO suaveRoutine = multicomponentRoutineService.generateAdaptedRoutine(70, "Suave", "HOME");
        MulticomponentRoutineDTO moderadoRoutine = multicomponentRoutineService.generateAdaptedRoutine(70, "Moderado", "HOME");

        assertEquals("Suave", suaveRoutine.getIntensityLevel());
        assertEquals("Moderado", moderadoRoutine.getIntensityLevel());
    }

    @Test
    void testRoutineAgeGroupBoundaries() {
        assertEquals("65-70", multicomponentRoutineService.generateAdaptedRoutine(65, "Moderado", "HOME").getAgeGroup());
        assertEquals("65-70", multicomponentRoutineService.generateAdaptedRoutine(70, "Moderado", "HOME").getAgeGroup());
        assertEquals("71-75", multicomponentRoutineService.generateAdaptedRoutine(71, "Moderado", "HOME").getAgeGroup());
        assertEquals("71-75", multicomponentRoutineService.generateAdaptedRoutine(75, "Moderado", "HOME").getAgeGroup());
        assertEquals("76-80", multicomponentRoutineService.generateAdaptedRoutine(76, "Moderado", "HOME").getAgeGroup());
        assertEquals("76-80", multicomponentRoutineService.generateAdaptedRoutine(80, "Moderado", "HOME").getAgeGroup());
        assertEquals("80+", multicomponentRoutineService.generateAdaptedRoutine(81, "Moderado", "HOME").getAgeGroup());
        assertEquals("80+", multicomponentRoutineService.generateAdaptedRoutine(90, "Moderado", "HOME").getAgeGroup());
    }
}
