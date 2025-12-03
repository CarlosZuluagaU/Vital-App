package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import com.vitalapp.presentation.dto.SignUpRequestDTO;

public class SignUpRequestDTOTest {

    @Test
    public void testDefaultConstructor() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        assertNotNull(dto);
    }

    @Test
    public void testParameterizedConstructor() {
        SignUpRequestDTO dto = new SignUpRequestDTO(
            "newuser", "newuser@example.com", "password123", "New User"
        );
        
        assertEquals("newuser", dto.getUsername());
        assertEquals("newuser@example.com", dto.getEmail());
        assertEquals("password123", dto.getPassword());
        assertEquals("New User", dto.getName());
    }

    @Test
    public void testSettersAndGetters() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        
        dto.setUsername("john_doe");
        dto.setEmail("john@example.com");
        dto.setPassword("securepass");
        dto.setName("John Doe");
        dto.setAge(30);
        dto.setPhone("+1234567890");
        
        assertEquals("john_doe", dto.getUsername());
        assertEquals("john@example.com", dto.getEmail());
        assertEquals("securepass", dto.getPassword());
        assertEquals("John Doe", dto.getName());
        assertEquals(30, dto.getAge());
        assertEquals("+1234567890", dto.getPhone());
    }

    @Test
    public void testMinimalRegistration() {
        SignUpRequestDTO dto = new SignUpRequestDTO(
            "user123", "user@test.com", "pass", "User Name"
        );
        
        assertNull(dto.getAge());
        assertNull(dto.getPhone());
    }

    @Test
    public void testCompleteRegistration() {
        SignUpRequestDTO dto = new SignUpRequestDTO(
            "fulluser", "full@example.com", "password123", "Full User"
        );
        dto.setAge(25);
        dto.setPhone("+34-612-345-678");
        
        assertEquals("fulluser", dto.getUsername());
        assertEquals("full@example.com", dto.getEmail());
        assertEquals("password123", dto.getPassword());
        assertEquals("Full User", dto.getName());
        assertEquals(25, dto.getAge());
        assertEquals("+34-612-345-678", dto.getPhone());
    }

    @Test
    public void testNullableAge() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setAge(null);
        
        assertNull(dto.getAge());
    }

    @Test
    public void testNullablePhone() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setPhone(null);
        
        assertNull(dto.getPhone());
    }

    @Test
    public void testYoungAge() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setAge(18);
        
        assertEquals(18, dto.getAge());
    }

    @Test
    public void testOldAge() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setAge(100);
        
        assertEquals(100, dto.getAge());
    }

    @Test
    public void testShortUsername() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setUsername("usr");
        
        assertEquals("usr", dto.getUsername());
    }

    @Test
    public void testLongUsername() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        String longUsername = "user_" + "x".repeat(45);
        dto.setUsername(longUsername);
        
        assertEquals(longUsername, dto.getUsername());
    }

    @Test
    public void testValidEmail() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setEmail("valid.email@example.com");
        
        assertEquals("valid.email@example.com", dto.getEmail());
    }

    @Test
    public void testEmailWithPlus() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setEmail("user+test@example.com");
        
        assertEquals("user+test@example.com", dto.getEmail());
    }

    @Test
    public void testShortPassword() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setPassword("pass");
        
        assertEquals("pass", dto.getPassword());
    }

    @Test
    public void testLongPassword() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        String longPassword = "P@ssw0rd" + "x".repeat(92);
        dto.setPassword(longPassword);
        
        assertEquals(longPassword, dto.getPassword());
    }

    @Test
    public void testPasswordWithSpecialChars() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setPassword("P@ssw0rd!#$%^&*()");
        
        assertEquals("P@ssw0rd!#$%^&*()", dto.getPassword());
    }

    @Test
    public void testShortName() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setName("Al");
        
        assertEquals("Al", dto.getName());
    }

    @Test
    public void testLongName() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        String longName = "A".repeat(100);
        dto.setName(longName);
        
        assertEquals(longName, dto.getName());
    }

    @Test
    public void testPhoneWithDashes() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setPhone("123-456-7890");
        
        assertEquals("123-456-7890", dto.getPhone());
    }

    @Test
    public void testInternationalPhone() {
        SignUpRequestDTO dto = new SignUpRequestDTO();
        dto.setPhone("+34-612-345-678");
        
        assertEquals("+34-612-345-678", dto.getPhone());
    }
}
