package com.vitalapp.service;

import com.vitalapp.persistence.entity.CategoryEntity;
import com.vitalapp.persistence.entity.IntensityEntity;
import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.repository.RoutineExerciseRepository;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.presentation.dto.RoutineDetailDTO;
import com.vitalapp.presentation.dto.RoutineSummaryDTO;
import com.vitalapp.service.implementation.RoutineServiceImpl;
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
class RoutineServiceImplTest {

    @Mock
    private RoutineRepository routineRepository;

    @Mock
    private RoutineExerciseRepository routineExerciseRepository;

    @InjectMocks
    private RoutineServiceImpl routineService;

    private RoutineEntity mockRoutine;
    private CategoryEntity mockCategory;
    private IntensityEntity mockIntensity;

    @BeforeEach
    void setUp() {
        mockCategory = new CategoryEntity();
        mockCategory.setName("Cardio");

        mockIntensity = new IntensityEntity();
        mockIntensity.setName("Moderate");

        mockRoutine = new RoutineEntity();
        mockRoutine.setId(1L);
        mockRoutine.setTitle("Morning Cardio");
        mockRoutine.setDescription("Great morning workout");
        mockRoutine.setDurationMinutes(30);
        mockRoutine.setCategory(mockCategory);
        mockRoutine.setIntensity(mockIntensity);
        mockRoutine.setThumbnailUrl("https://example.com/thumb.jpg");
        mockRoutine.setVideoUrl("https://example.com/video.mp4");
        mockRoutine.setIsPremium(false);
    }

    @Test
    void testGetAllRoutines_NoFilters() {
        when(routineRepository.findAll()).thenReturn(Arrays.asList(mockRoutine));

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(null, null);

        assertNotNull(results);
        assertEquals(1, results.size());
        assertEquals("Morning Cardio", results.get(0).getTitle());
        assertEquals(30, results.get(0).getDurationMinutes());
    }

    @Test
    void testGetAllRoutines_WithCategoryFilter() {
        when(routineRepository.findByFilters(eq(1L), eq(null)))
                .thenReturn(Arrays.asList(mockRoutine));

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(1L, null);

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetAllRoutines_WithIntensityFilter() {
        when(routineRepository.findByFilters(eq(null), eq(2L)))
                .thenReturn(Arrays.asList(mockRoutine));

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(null, 2L);

        assertNotNull(results);
        assertEquals(1, results.size());
    }

    @Test
    void testGetAllRoutines_EmptyResult() {
        when(routineRepository.findAll()).thenReturn(Collections.emptyList());

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(null, null);

        assertNotNull(results);
        assertTrue(results.isEmpty());
    }

    @Test
    void testGetRoutineById_Success() {
        when(routineRepository.findById(eq(1L))).thenReturn(Optional.of(mockRoutine));
        when(routineExerciseRepository.findByRoutineIdWithExercises(eq(1L)))
                .thenReturn(Collections.emptyList());

        RoutineDetailDTO result = routineService.getRoutineById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("Morning Cardio", result.getTitle());
        assertEquals("Great morning workout", result.getDescription());
        assertEquals(30, result.getDurationMinutes());
        assertEquals("Cardio", result.getCategoryName());
        assertEquals("Moderate", result.getIntensityName());
    }

    @Test
    void testGetRoutineById_NotFound() {
        when(routineRepository.findById(eq(999L))).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            routineService.getRoutineById(999L);
        });

        assertEquals("Routine not found with id: 999", exception.getMessage());
    }

    @Test
    void testGetAllRoutines_MultipleRoutines() {
        RoutineEntity routine2 = new RoutineEntity();
        routine2.setId(2L);
        routine2.setTitle("Evening Strength");
        routine2.setDurationMinutes(45);
        routine2.setCategory(mockCategory);
        routine2.setIntensity(mockIntensity);
        routine2.setThumbnailUrl("https://example.com/thumb2.jpg");

        when(routineRepository.findAll()).thenReturn(Arrays.asList(mockRoutine, routine2));

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(null, null);

        assertNotNull(results);
        assertEquals(2, results.size());
        assertEquals("Morning Cardio", results.get(0).getTitle());
        assertEquals("Evening Strength", results.get(1).getTitle());
    }

    @Test
    void testRoutineSummaryMapping() {
        when(routineRepository.findAll()).thenReturn(Arrays.asList(mockRoutine));

        List<RoutineSummaryDTO> results = routineService.getAllRoutines(null, null);

        RoutineSummaryDTO summary = results.get(0);
        assertEquals(mockRoutine.getId(), summary.getId());
        assertEquals(mockRoutine.getTitle(), summary.getTitle());
        assertEquals(mockRoutine.getDurationMinutes(), summary.getDurationMinutes());
        assertEquals(mockRoutine.getIntensity().getName(), summary.getIntensityName());
        assertEquals(mockRoutine.getCategory().getName(), summary.getCategoryName());
        assertEquals(mockRoutine.getThumbnailUrl(), summary.getThumbnailUrl());
    }
}
