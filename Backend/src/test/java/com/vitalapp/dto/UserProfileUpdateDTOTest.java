package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitalapp.presentation.dto.UserProfileUpdateDTO;

@ExtendWith(MockitoExtension.class)
public class UserProfileUpdateDTOTest {
    
    @Test
    public void testDefaultConstructor() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        
        assertNotNull(dto);
        assertNull(dto.getName());
        assertNull(dto.getEmail());
        assertNull(dto.getProfilePicture());
        assertNull(dto.getFitnessLevel());
        assertNull(dto.getPreferredLocation());
        assertNull(dto.getPhone());
        assertNull(dto.getDateOfBirth());
        assertNull(dto.getHeight());
        assertNull(dto.getWeight());
        assertNull(dto.getHealthConditions());
        assertNull(dto.getFitnessGoals());
    }
    
    @Test
    public void testParameterizedConstructor() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO(
            "John Doe", 
            "john@example.com", 
            "https://example.com/profile.jpg",
            "Intermediate",
            "Gym",
            "+1-234-567-8900",
            "1990-05-15",
            175.0,
            70.0,
            "None",
            "Build muscle and improve cardio"
        );
        
        assertEquals("John Doe", dto.getName());
        assertEquals("john@example.com", dto.getEmail());
        assertEquals("https://example.com/profile.jpg", dto.getProfilePicture());
        assertEquals("Intermediate", dto.getFitnessLevel());
        assertEquals("Gym", dto.getPreferredLocation());
        assertEquals("+1-234-567-8900", dto.getPhone());
        assertEquals("1990-05-15", dto.getDateOfBirth());
        assertEquals(175.0, dto.getHeight());
        assertEquals(70.0, dto.getWeight());
        assertEquals("None", dto.getHealthConditions());
        assertEquals("Build muscle and improve cardio", dto.getFitnessGoals());
    }
    
    @Test
    public void testSettersAndGetters() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        
        dto.setName("Jane Smith");
        dto.setEmail("jane@example.com");
        dto.setProfilePicture("https://example.com/jane.jpg");
        dto.setFitnessLevel("Advanced");
        dto.setPreferredLocation("Home");
        dto.setPhone("+34-612-345-678");
        dto.setDateOfBirth("1985-08-20");
        dto.setHeight(165.0);
        dto.setWeight(60.0);
        dto.setHealthConditions("Asthma");
        dto.setFitnessGoals("Improve flexibility");
        
        assertEquals("Jane Smith", dto.getName());
        assertEquals("jane@example.com", dto.getEmail());
        assertEquals("https://example.com/jane.jpg", dto.getProfilePicture());
        assertEquals("Advanced", dto.getFitnessLevel());
        assertEquals("Home", dto.getPreferredLocation());
        assertEquals("+34-612-345-678", dto.getPhone());
        assertEquals("1985-08-20", dto.getDateOfBirth());
        assertEquals(165.0, dto.getHeight());
        assertEquals(60.0, dto.getWeight());
        assertEquals("Asthma", dto.getHealthConditions());
        assertEquals("Improve flexibility", dto.getFitnessGoals());
    }
    
    @Test
    public void testBeginnerFitnessLevel() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setFitnessLevel("Beginner");
        
        assertEquals("Beginner", dto.getFitnessLevel());
    }
    
    @Test
    public void testIntermediateFitnessLevel() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setFitnessLevel("Intermediate");
        
        assertEquals("Intermediate", dto.getFitnessLevel());
    }
    
    @Test
    public void testAdvancedFitnessLevel() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setFitnessLevel("Advanced");
        
        assertEquals("Advanced", dto.getFitnessLevel());
    }
    
    @Test
    public void testHomeLocation() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setPreferredLocation("Home");
        
        assertEquals("Home", dto.getPreferredLocation());
    }
    
    @Test
    public void testGymLocation() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setPreferredLocation("Gym");
        
        assertEquals("Gym", dto.getPreferredLocation());
    }
    
    @Test
    public void testNullableFields() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        
        dto.setName("Test User");
        dto.setEmail("test@example.com");
        dto.setProfilePicture(null);
        dto.setPhone(null);
        dto.setHeight(null);
        dto.setWeight(null);
        dto.setHealthConditions(null);
        
        assertEquals("Test User", dto.getName());
        assertEquals("test@example.com", dto.getEmail());
        assertNull(dto.getProfilePicture());
        assertNull(dto.getPhone());
        assertNull(dto.getHeight());
        assertNull(dto.getWeight());
        assertNull(dto.getHealthConditions());
    }
    
    @Test
    public void testHeightRange() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        
        dto.setHeight(150.0);
        assertEquals(150.0, dto.getHeight());
        
        dto.setHeight(200.0);
        assertEquals(200.0, dto.getHeight());
    }
    
    @Test
    public void testWeightRange() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        
        dto.setWeight(50.0);
        assertEquals(50.0, dto.getWeight());
        
        dto.setWeight(150.0);
        assertEquals(150.0, dto.getWeight());
    }
    
    @Test
    public void testMultipleHealthConditions() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setHealthConditions("Diabetes, High blood pressure, Asthma");
        
        assertEquals("Diabetes, High blood pressure, Asthma", dto.getHealthConditions());
    }
    
    @Test
    public void testLongFitnessGoals() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        String longGoal = "I want to improve my overall fitness by building muscle mass, increasing cardiovascular endurance, and improving flexibility through regular exercise and proper nutrition.";
        dto.setFitnessGoals(longGoal);
        
        assertEquals(longGoal, dto.getFitnessGoals());
    }
    
    @Test
    public void testProfilePictureUrl() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setProfilePicture("https://cdn.example.com/users/12345/profile.png");
        
        assertTrue(dto.getProfilePicture().startsWith("https://"));
    }
    
    @Test
    public void testDateOfBirthFormat() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setDateOfBirth("1995-12-25");
        
        assertEquals("1995-12-25", dto.getDateOfBirth());
        assertTrue(dto.getDateOfBirth().matches("\\d{4}-\\d{2}-\\d{2}"));
    }
    
    @Test
    public void testInternationalPhone() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        dto.setPhone("+44-20-1234-5678");
        
        assertEquals("+44-20-1234-5678", dto.getPhone());
    }
    
    @Test
    public void testLongName() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        String longName = "A".repeat(100);
        dto.setName(longName);
        
        assertEquals(longName, dto.getName());
        assertEquals(100, dto.getName().length());
    }
    
    @Test
    public void testLongEmail() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO();
        String longEmail = "a".repeat(50) + "@example.com";
        dto.setEmail(longEmail);
        
        assertEquals(longEmail, dto.getEmail());
    }
    
    @Test
    public void testCompleteUpdate() {
        UserProfileUpdateDTO dto = new UserProfileUpdateDTO(
            "Complete User",
            "complete@example.com",
            "https://example.com/complete.jpg",
            "Advanced",
            "Gym",
            "+1-555-0100",
            "1988-03-10",
            180.0,
            80.0,
            "Healthy",
            "Maintain fitness and strength"
        );
        
        assertNotNull(dto.getName());
        assertNotNull(dto.getEmail());
        assertNotNull(dto.getProfilePicture());
        assertNotNull(dto.getFitnessLevel());
        assertNotNull(dto.getPreferredLocation());
        assertNotNull(dto.getPhone());
        assertNotNull(dto.getDateOfBirth());
        assertNotNull(dto.getHeight());
        assertNotNull(dto.getWeight());
        assertNotNull(dto.getHealthConditions());
        assertNotNull(dto.getFitnessGoals());
    }
}
