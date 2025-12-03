package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;

import com.vitalapp.presentation.dto.LoginRequestDTO;

public class LoginRequestDTOTest {

    @Test
    public void testDefaultConstructor() {
        LoginRequestDTO dto = new LoginRequestDTO();
        assertNotNull(dto);
    }

    @Test
    public void testParameterizedConstructor() {
        LoginRequestDTO dto = new LoginRequestDTO("john_doe", "password123");
        
        assertEquals("john_doe", dto.getUsernameOrEmail());
        assertEquals("password123", dto.getPassword());
    }

    @Test
    public void testSettersAndGetters() {
        LoginRequestDTO dto = new LoginRequestDTO();
        
        dto.setUsernameOrEmail("jane@example.com");
        dto.setPassword("securepass");
        
        assertEquals("jane@example.com", dto.getUsernameOrEmail());
        assertEquals("securepass", dto.getPassword());
    }

    @Test
    public void testLoginWithUsername() {
        LoginRequestDTO dto = new LoginRequestDTO("testuser", "mypassword");
        
        assertEquals("testuser", dto.getUsernameOrEmail());
        assertEquals("mypassword", dto.getPassword());
    }

    @Test
    public void testLoginWithEmail() {
        LoginRequestDTO dto = new LoginRequestDTO("user@example.com", "mypassword");
        
        assertEquals("user@example.com", dto.getUsernameOrEmail());
        assertEquals("mypassword", dto.getPassword());
    }

    @Test
    public void testEmptyUsername() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsernameOrEmail("");
        
        assertEquals("", dto.getUsernameOrEmail());
    }

    @Test
    public void testEmptyPassword() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setPassword("");
        
        assertEquals("", dto.getPassword());
    }

    @Test
    public void testNullUsername() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsernameOrEmail(null);
        
        assertNull(dto.getUsernameOrEmail());
    }

    @Test
    public void testNullPassword() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setPassword(null);
        
        assertNull(dto.getPassword());
    }

    @Test
    public void testLongUsername() {
        LoginRequestDTO dto = new LoginRequestDTO();
        String longUsername = "a".repeat(100);
        dto.setUsernameOrEmail(longUsername);
        
        assertEquals(longUsername, dto.getUsernameOrEmail());
    }

    @Test
    public void testLongPassword() {
        LoginRequestDTO dto = new LoginRequestDTO();
        String longPassword = "p".repeat(200);
        dto.setPassword(longPassword);
        
        assertEquals(longPassword, dto.getPassword());
    }

    @Test
    public void testSpecialCharactersInUsername() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setUsernameOrEmail("user+test@example.com");
        
        assertEquals("user+test@example.com", dto.getUsernameOrEmail());
    }

    @Test
    public void testSpecialCharactersInPassword() {
        LoginRequestDTO dto = new LoginRequestDTO();
        dto.setPassword("P@ssw0rd!#$%");
        
        assertEquals("P@ssw0rd!#$%", dto.getPassword());
    }
}
