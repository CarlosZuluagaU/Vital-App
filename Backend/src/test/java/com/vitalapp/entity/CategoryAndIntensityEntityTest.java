package com.vitalapp.entity;

import com.vitalapp.persistence.entity.CategoryEntity;
import com.vitalapp.persistence.entity.IntensityEntity;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CategoryAndIntensityEntityTest {

    @Test
    void testCategoryEntity_DefaultConstructor() {
        CategoryEntity category = new CategoryEntity();
        assertNotNull(category);
    }

    @Test
    void testCategoryEntity_ParameterizedConstructor() {
        CategoryEntity category = new CategoryEntity("Cardio", "Cardiovascular exercises");
        
        assertEquals("Cardio", category.getName());
        assertEquals("Cardiovascular exercises", category.getDescription());
    }

    @Test
    void testCategoryEntity_SettersAndGetters() {
        CategoryEntity category = new CategoryEntity();
        
        category.setId(1L);
        category.setName("Strength");
        category.setDescription("Strength training");

        assertEquals(1L, category.getId());
        assertEquals("Strength", category.getName());
        assertEquals("Strength training", category.getDescription());
    }

    @Test
    void testIntensityEntity_DefaultConstructor() {
        IntensityEntity intensity = new IntensityEntity();
        assertNotNull(intensity);
    }

    @Test
    void testIntensityEntity_ParameterizedConstructor() {
        IntensityEntity intensity = new IntensityEntity("Moderate", 2);
        
        assertEquals("Moderate", intensity.getName());
        assertEquals(2, intensity.getLevel());
    }

    @Test
    void testIntensityEntity_SettersAndGetters() {
        IntensityEntity intensity = new IntensityEntity();
        
        intensity.setId(1L);
        intensity.setName("High");
        intensity.setLevel(3);

        assertEquals(1L, intensity.getId());
        assertEquals("High", intensity.getName());
        assertEquals(3, intensity.getLevel());
    }

    @Test
    void testIntensityEntity_LevelValidation() {
        IntensityEntity low = new IntensityEntity("Low", 1);
        IntensityEntity moderate = new IntensityEntity("Moderate", 2);
        IntensityEntity high = new IntensityEntity("High", 3);
        
        assertEquals(1, low.getLevel());
        assertEquals(2, moderate.getLevel());
        assertEquals(3, high.getLevel());
    }
}