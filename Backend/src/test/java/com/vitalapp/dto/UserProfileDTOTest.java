package com.vitalapp.dto;

import com.vitalapp.presentation.dto.UserProfileResponseDTO;
import com.vitalapp.presentation.dto.UserProfileUpdateDTO;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class UserProfileDTOTest {

    @Test
    void testUserProfileResponseDTO_DefaultConstructor() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        assertNotNull(dto);
    }

    @Test
    void testUserProfileResponseDTO_FullConstructor() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO(
            1L, "John Doe", "john@example.com", "photo.jpg",
            "INTERMEDIATE", "HOME", "1234567890",
            "1990-01-01", 180.0, 75.0,
            "None", "Weight loss", "2025-01-01"
        );
        
        assertEquals(1L, dto.getId());
        assertEquals("John Doe", dto.getName());
        assertEquals("john@example.com", dto.getEmail());
        assertEquals("photo.jpg", dto.getProfilePicture());
        assertEquals("INTERMEDIATE", dto.getFitnessLevel());
        assertEquals("HOME", dto.getPreferredLocation());
        assertEquals("1234567890", dto.getPhone());
        assertEquals("1990-01-01", dto.getDateOfBirth());
        assertEquals(180.0, dto.getHeight());
        assertEquals(75.0, dto.getWeight());
        assertEquals("None", dto.getHealthConditions());
        assertEquals("Weight loss", dto.getFitnessGoals());
        assertEquals("2025-01-01", dto.getCreatedAt());
    }

    @Test
    void testUserProfileResponseDTO_Setters() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setId(1L);
        dto.setName("Jane Doe");
        dto.setEmail("jane@example.com");
        dto.setProfilePicture("profile.jpg");
        dto.setFitnessLevel("BEGINNER");
        dto.setPreferredLocation("GYM");
        dto.setPhone("9876543210");
        dto.setDateOfBirth("1995-05-15");
        dto.setHeight(165.0);
        dto.setWeight(60.0);
        dto.setHealthConditions("Asthma");
        dto.setFitnessGoals("Muscle gain");
        dto.setCreatedAt("2025-02-01");
        
        assertEquals(1L, dto.getId());
        assertEquals("Jane Doe", dto.getName());
        assertEquals("jane@example.com", dto.getEmail());
        assertEquals("profile.jpg", dto.getProfilePicture());
        assertEquals("BEGINNER", dto.getFitnessLevel());
        assertEquals("GYM", dto.getPreferredLocation());
        assertEquals("9876543210", dto.getPhone());
        assertEquals("1995-05-15", dto.getDateOfBirth());
        assertEquals(165.0, dto.getHeight());
        assertEquals(60.0, dto.getWeight());
        assertEquals("Asthma", dto.getHealthConditions());
        assertEquals("Muscle gain", dto.getFitnessGoals());
        assertEquals("2025-02-01", dto.getCreatedAt());
    }

    @Test
    void testUserProfileUpdateDTO_DefaultConstructor() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        assertNotNull(dto);
    }

    @Test
    void testUserProfileUpdateDTO_FullConstructor() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO(
            "John Doe", "john@example.com", "photo.jpg",
            "ADVANCED", "GYM", "1234567890",
            "1990-01-01", 180.0, 75.0,
            "None", "Endurance"
        );
        
        assertEquals("John Doe", dto.getName());
        assertEquals("john@example.com", dto.getEmail());
        assertEquals("photo.jpg", dto.getProfilePicture());
        assertEquals("ADVANCED", dto.getFitnessLevel());
        assertEquals("GYM", dto.getPreferredLocation());
        assertEquals("1234567890", dto.getPhone());
        assertEquals("1990-01-01", dto.getDateOfBirth());
        assertEquals(180.0, dto.getHeight());
        assertEquals(75.0, dto.getWeight());
        assertEquals("None", dto.getHealthConditions());
        assertEquals("Endurance", dto.getFitnessGoals());
    }

    @Test
    void testUserProfileUpdateDTO_Setters() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setName("Updated Name");
        dto.setEmail("updated@example.com");
        dto.setProfilePicture("new-photo.jpg");
        dto.setFitnessLevel("EXPERT");
        dto.setPreferredLocation("OUTDOOR");
        dto.setPhone("5555555555");
        dto.setDateOfBirth("1988-08-08");
        dto.setHeight(175.0);
        dto.setWeight(70.0);
        dto.setHealthConditions("Diabetes");
        dto.setFitnessGoals("Flexibility");
        
        assertEquals("Updated Name", dto.getName());
        assertEquals("updated@example.com", dto.getEmail());
        assertEquals("new-photo.jpg", dto.getProfilePicture());
        assertEquals("EXPERT", dto.getFitnessLevel());
        assertEquals("OUTDOOR", dto.getPreferredLocation());
        assertEquals("5555555555", dto.getPhone());
        assertEquals("1988-08-08", dto.getDateOfBirth());
        assertEquals(175.0, dto.getHeight());
        assertEquals(70.0, dto.getWeight());
        assertEquals("Diabetes", dto.getHealthConditions());
        assertEquals("Flexibility", dto.getFitnessGoals());
    }

    @Test
    void testUserProfileUpdateDTO_PartialUpdate() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setName("Partial Name");
        dto.setPhone("1111111111");
        
        assertEquals("Partial Name", dto.getName());
        assertEquals("1111111111", dto.getPhone());
        assertNull(dto.getEmail());
        assertNull(dto.getFitnessLevel());
        assertNull(dto.getHeight());
    }
}
