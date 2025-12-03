package com.vitalapp.dto;

import com.vitalapp.presentation.dto.RoutineSummaryDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RoutineSummaryDTOTest {

    @Test
    void testConstructorAndGetters() {
        RoutineSummaryDTO dto = new RoutineSummaryDTO(
                1L, "Morning Yoga", 30, "Moderate", "Flexibility", "thumb.jpg"
        );

        assertEquals(1L, dto.getId());
        assertEquals("Morning Yoga", dto.getTitle());
        assertEquals(30, dto.getDurationMinutes());
        assertEquals("Moderate", dto.getIntensityName());
        assertEquals("Flexibility", dto.getCategoryName());
        assertEquals("thumb.jpg", dto.getThumbnailUrl());
    }

    @Test
    void testSetters() {
        RoutineSummaryDTO dto = new RoutineSummaryDTO();
        dto.setId(2L);
        dto.setTitle("Evening Workout");
        dto.setDurationMinutes(45);
        dto.setIntensityName("High");
        dto.setCategoryName("Strength");
        dto.setThumbnailUrl("workout.jpg");

        assertEquals(2L, dto.getId());
        assertEquals("Evening Workout", dto.getTitle());
        assertEquals(45, dto.getDurationMinutes());
        assertEquals("High", dto.getIntensityName());
        assertEquals("Strength", dto.getCategoryName());
        assertEquals("workout.jpg", dto.getThumbnailUrl());
    }

    @Test
    void testDefaultConstructor() {
        RoutineSummaryDTO dto = new RoutineSummaryDTO();
        assertNotNull(dto);
        assertNull(dto.getId());
        assertNull(dto.getTitle());
    }

    @Test
    void testAllFieldsPopulated() {
        RoutineSummaryDTO dto = new RoutineSummaryDTO(
                100L, "Complete Routine", 60, "Advanced", "Mixed", "complete.jpg"
        );

        assertNotNull(dto.getId());
        assertNotNull(dto.getTitle());
        assertNotNull(dto.getDurationMinutes());
        assertNotNull(dto.getIntensityName());
        assertNotNull(dto.getCategoryName());
        assertNotNull(dto.getThumbnailUrl());
    }
}
