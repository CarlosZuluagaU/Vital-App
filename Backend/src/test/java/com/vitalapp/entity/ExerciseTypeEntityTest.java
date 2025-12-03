package com.vitalapp.entity;

import com.vitalapp.persistence.entity.ExerciseTypeEntity;
import com.vitalapp.persistence.entity.ExerciseTypeEntity.LocationType;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ExerciseTypeEntityTest {

    @Test
    void testExerciseTypeEntity_DefaultConstructor() {
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        assertNotNull(type);
    }

    @Test
    void testExerciseTypeEntity_ParameterizedConstructor() {
        ExerciseTypeEntity type = new ExerciseTypeEntity(
            "Aerobic", 
            "Aerobic exercises", 
            LocationType.HOME
        );
        
        assertEquals("Aerobic", type.getName());
        assertEquals("Aerobic exercises", type.getDescription());
        assertEquals(LocationType.HOME, type.getLocationType());
    }

    @Test
    void testExerciseTypeEntity_SettersAndGetters() {
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        
        type.setId(1L);
        type.setName("Strength");
        type.setDescription("Strength exercises");
        type.setLocationType(LocationType.GYM);

        assertEquals(1L, type.getId());
        assertEquals("Strength", type.getName());
        assertEquals("Strength exercises", type.getDescription());
        assertEquals(LocationType.GYM, type.getLocationType());
    }

    @Test
    void testLocationTypeEnum_HOME() {
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        type.setLocationType(LocationType.HOME);
        
        assertEquals(LocationType.HOME, type.getLocationType());
        assertEquals("HOME", type.getLocationType().name());
    }

    @Test
    void testLocationTypeEnum_GYM() {
        ExerciseTypeEntity type = new ExerciseTypeEntity();
        type.setLocationType(LocationType.GYM);
        
        assertEquals(LocationType.GYM, type.getLocationType());
        assertEquals("GYM", type.getLocationType().name());
    }

    @Test
    void testLocationTypeEnum_Values() {
        LocationType[] values = LocationType.values();
        
        assertEquals(2, values.length);
        assertTrue(java.util.Arrays.asList(values).contains(LocationType.HOME));
        assertTrue(java.util.Arrays.asList(values).contains(LocationType.GYM));
    }
}