package com.vitalapp.service;

import com.vitalapp.persistence.entity.CategoryEntity;
import com.vitalapp.persistence.entity.ExerciseEntity;
import com.vitalapp.persistence.entity.ExerciseTypeEntity;
import com.vitalapp.persistence.entity.IntensityEntity;
import com.vitalapp.persistence.repository.ExerciseRepository;
import com.vitalapp.presentation.dto.ExerciseDetailDTO;
import com.vitalapp.presentation.dto.ExerciseSummaryDTO;
import com.vitalapp.service.implementation.ExerciseServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ExerciseServiceImplTest {

    @Mock
    private ExerciseRepository exerciseRepository;

    @InjectMocks
    private ExerciseServiceImpl exerciseService;

    private ExerciseEntity mockExercise;
    private CategoryEntity mockCategory;
    private IntensityEntity mockIntensity;
    private ExerciseTypeEntity mockExerciseType;

    @BeforeEach
    void setUp() {
        mockCategory = new CategoryEntity();
        mockCategory.setName("Strength");

        mockIntensity = new IntensityEntity();
        mockIntensity.setName("Moderate");

        mockExerciseType = new ExerciseTypeEntity();
        mockExerciseType.setName("Weight Training");
        mockExerciseType.setLocationType(ExerciseTypeEntity.LocationType.GYM);

        mockExercise = new ExerciseEntity();
        mockExercise.setId(1L);
        mockExercise.setName("Push Up");
        mockExercise.setDescription("Classic push up exercise");
        mockExercise.setCategory(mockCategory);
        mockExercise.setIntensity(mockIntensity);
        mockExercise.setExerciseType(mockExerciseType);
        mockExercise.setDurationSeconds(60);
        mockExercise.setRepetitions(15);
        mockExercise.setSets(3);
    }

    @Test
    void testGetAllExercises_NoFilters() {
        when(exerciseRepository.findByFilters(any(), any(), any(), any()))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getAllExercises(null, null, null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("Push Up", results.get(0).getName());
    }

    @Test
    void testGetAllExercises_WithCategoryFilter() {
        when(exerciseRepository.findByFilters(eq(1L), any(), any(), any()))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getAllExercises(1L, null, null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetGymExercises() {
        when(exerciseRepository.findByFilters(any(), any(), any(), eq(ExerciseTypeEntity.LocationType.GYM)))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getGymExercises(null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetHomeExercises() {
        ExerciseTypeEntity homeType = new ExerciseTypeEntity();
        homeType.setName("Bodyweight");
        homeType.setLocationType(ExerciseTypeEntity.LocationType.HOME);

        ExerciseEntity homeExercise = new ExerciseEntity();
        homeExercise.setId(2L);
        homeExercise.setName("Burpee");
        homeExercise.setDescription("Full body exercise");
        homeExercise.setCategory(mockCategory);
        homeExercise.setIntensity(mockIntensity);
        homeExercise.setExerciseType(homeType);

        when(exerciseRepository.findByFilters(any(), any(), any(), eq(ExerciseTypeEntity.LocationType.HOME)))
                .thenReturn(Arrays.asList(homeExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getHomeExercises(null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetExerciseById_Success() {
        when(exerciseRepository.findById(eq(1L))).thenReturn(Optional.of(mockExercise));

        ExerciseDetailDTO result = exerciseService.getExerciseById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Push Up", result.getName());
        assertEquals("Classic push up exercise", result.getDescription());
    }

    @Test
    void testGetExerciseById_NotFound() {
        when(exerciseRepository.findById(eq(999L))).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            exerciseService.getExerciseById(999L);
        });

        assertEquals("Exercise not found with id: 999", exception.getMessage());
    }

    @Test
    void testGetExercisesByCategory_WithLocation() {
        when(exerciseRepository.findByLocationTypeAndCategory(
                eq(ExerciseTypeEntity.LocationType.GYM), eq(1L)))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getExercisesByCategory(1L, "GYM");

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetExercisesByCategory_InvalidLocation() {
        when(exerciseRepository.findByCategoryIdAndIsActive(eq(1L), eq(true)))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getExercisesByCategory(1L, "INVALID");

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetAllExercises_EmptyResult() {
        when(exerciseRepository.findByFilters(any(), any(), any(), any()))
                .thenReturn(Collections.emptyList());

        List<ExerciseSummaryDTO> results = exerciseService.getAllExercises(null, null, null, null);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void testExerciseSummaryMapping() {
        when(exerciseRepository.findByFilters(any(), any(), any(), any()))
                .thenReturn(Arrays.asList(mockExercise));

        List<ExerciseSummaryDTO> results = exerciseService.getAllExercises(null, null, null, null);

        ExerciseSummaryDTO summary = results.get(0);
        assertEquals(mockExercise.getId(), summary.getId());
        assertEquals(mockExercise.getName(), summary.getName());
        assertEquals(mockExercise.getDescription(), summary.getDescription());
        assertEquals(mockExercise.getCategory().getName(), summary.getCategoryName());
        assertEquals(mockExercise.getIntensity().getName(), summary.getIntensityName());
    }
}
