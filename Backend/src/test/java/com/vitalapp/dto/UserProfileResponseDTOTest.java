package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import com.vitalapp.presentation.dto.UserProfileResponseDTO;

public class UserProfileResponseDTOTest {

    @Test
    public void testDefaultConstructor() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        assertNotNull(dto);
    }

    @Test
    public void testFullConstructor() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO(
            1L, "John Doe", "john@example.com", "profile.jpg",
            "Intermediate", "Gym", "+1234567890", "1990-05-15",
            175.5, 70.0, "None", "Build muscle", "2024-01-01T10:00:00"
        );
        
        assertEquals(1L, dto.getId());
        assertEquals("John Doe", dto.getName());
        assertEquals("john@example.com", dto.getEmail());
        assertEquals("profile.jpg", dto.getProfilePicture());
        assertEquals("Intermediate", dto.getFitnessLevel());
        assertEquals("Gym", dto.getPreferredLocation());
        assertEquals("+1234567890", dto.getPhone());
        assertEquals("1990-05-15", dto.getDateOfBirth());
        assertEquals(175.5, dto.getHeight());
        assertEquals(70.0, dto.getWeight());
        assertEquals("None", dto.getHealthConditions());
        assertEquals("Build muscle", dto.getFitnessGoals());
        assertEquals("2024-01-01T10:00:00", dto.getCreatedAt());
    }

    @Test
    public void testSettersAndGetters() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        
        dto.setId(5L);
        dto.setName("Jane Smith");
        dto.setEmail("jane@example.com");
        dto.setProfilePicture("avatar.png");
        dto.setFitnessLevel("Advanced");
        dto.setPreferredLocation("Home");
        dto.setPhone("+34-612-345-678");
        dto.setDateOfBirth("1985-03-20");
        dto.setHeight(165.0);
        dto.setWeight(60.5);
        dto.setHealthConditions("Asthma");
        dto.setFitnessGoals("Improve endurance");
        dto.setCreatedAt("2024-06-15T14:30:00");
        
        assertEquals(5L, dto.getId());
        assertEquals("Jane Smith", dto.getName());
        assertEquals("jane@example.com", dto.getEmail());
        assertEquals("avatar.png", dto.getProfilePicture());
        assertEquals("Advanced", dto.getFitnessLevel());
        assertEquals("Home", dto.getPreferredLocation());
        assertEquals("+34-612-345-678", dto.getPhone());
        assertEquals("1985-03-20", dto.getDateOfBirth());
        assertEquals(165.0, dto.getHeight());
        assertEquals(60.5, dto.getWeight());
        assertEquals("Asthma", dto.getHealthConditions());
        assertEquals("Improve endurance", dto.getFitnessGoals());
        assertEquals("2024-06-15T14:30:00", dto.getCreatedAt());
    }

    @Test
    public void testBeginnerFitnessLevel() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setFitnessLevel("Beginner");
        
        assertEquals("Beginner", dto.getFitnessLevel());
    }

    @Test
    public void testIntermediateFitnessLevel() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setFitnessLevel("Intermediate");
        
        assertEquals("Intermediate", dto.getFitnessLevel());
    }

    @Test
    public void testAdvancedFitnessLevel() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setFitnessLevel("Advanced");
        
        assertEquals("Advanced", dto.getFitnessLevel());
    }

    @Test
    public void testHomePreferredLocation() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setPreferredLocation("Home");
        
        assertEquals("Home", dto.getPreferredLocation());
    }

    @Test
    public void testGymPreferredLocation() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setPreferredLocation("Gym");
        
        assertEquals("Gym", dto.getPreferredLocation());
    }

    @Test
    public void testNullableFields() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setProfilePicture(null);
        dto.setPhone(null);
        dto.setHeight(null);
        dto.setWeight(null);
        dto.setHealthConditions(null);
        
        assertNull(dto.getProfilePicture());
        assertNull(dto.getPhone());
        assertNull(dto.getHeight());
        assertNull(dto.getWeight());
        assertNull(dto.getHealthConditions());
    }

    @Test
    public void testHeightRange() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setHeight(150.0);
        assertEquals(150.0, dto.getHeight());
        
        dto.setHeight(200.0);
        assertEquals(200.0, dto.getHeight());
    }

    @Test
    public void testWeightRange() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setWeight(50.0);
        assertEquals(50.0, dto.getWeight());
        
        dto.setWeight(150.0);
        assertEquals(150.0, dto.getWeight());
    }

    @Test
    public void testMultipleHealthConditions() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        String conditions = "Diabetes, High blood pressure, Asthma";
        dto.setHealthConditions(conditions);
        
        assertEquals(conditions, dto.getHealthConditions());
    }

    @Test
    public void testLongFitnessGoals() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        String goals = "Build muscle, Improve cardiovascular health, Increase flexibility";
        dto.setFitnessGoals(goals);
        
        assertEquals(goals, dto.getFitnessGoals());
    }

    @Test
    public void testProfilePictureUrl() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        String url = "https://cdn.example.com/profiles/user123.jpg";
        dto.setProfilePicture(url);
        
        assertEquals(url, dto.getProfilePicture());
    }

    @Test
    public void testDateOfBirthFormat() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        dto.setDateOfBirth("2000-12-31");
        
        assertEquals("2000-12-31", dto.getDateOfBirth());
    }

    @Test
    public void testCreatedAtTimestamp() {
        UserProfileResponseDTO dto = new UserProfileResponseDTO();
        String timestamp = "2024-12-02T22:18:01";
        dto.setCreatedAt(timestamp);
        
        assertEquals(timestamp, dto.getCreatedAt());
    }
}
