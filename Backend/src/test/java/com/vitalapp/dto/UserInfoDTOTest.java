package com.vitalapp.dto;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

import com.vitalapp.presentation.dto.UserInfoDTO;

public class UserInfoDTOTest {

    @Test
    public void testDefaultConstructor() {
        UserInfoDTO dto = new UserInfoDTO();
        assertNotNull(dto);
    }

    @Test
    public void testSettersAndGetters() {
        UserInfoDTO dto = new UserInfoDTO();
        LocalDateTime now = LocalDateTime.now();
        
        dto.setId(1L);
        dto.setUsername("testuser");
        dto.setEmail("test@example.com");
        dto.setName("Test User");
        dto.setAge(30);
        dto.setPhone("+1234567890");
        dto.setProvider("LOCAL");
        dto.setCreatedAt(now);
        
        assertEquals(1L, dto.getId());
        assertEquals("testuser", dto.getUsername());
        assertEquals("test@example.com", dto.getEmail());
        assertEquals("Test User", dto.getName());
        assertEquals(30, dto.getAge());
        assertEquals("+1234567890", dto.getPhone());
        assertEquals("LOCAL", dto.getProvider());
        assertEquals(now, dto.getCreatedAt());
    }

    @Test
    public void testLocalProvider() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setProvider("LOCAL");
        
        assertEquals("LOCAL", dto.getProvider());
    }

    @Test
    public void testGoogleProvider() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setProvider("GOOGLE");
        
        assertEquals("GOOGLE", dto.getProvider());
    }

    @Test
    public void testFacebookProvider() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setProvider("FACEBOOK");
        
        assertEquals("FACEBOOK", dto.getProvider());
    }

    @Test
    public void testNullableAge() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setAge(null);
        
        assertNull(dto.getAge());
    }

    @Test
    public void testNullablePhone() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setPhone(null);
        
        assertNull(dto.getPhone());
    }

    @Test
    public void testYoungUser() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setAge(18);
        
        assertEquals(18, dto.getAge());
    }

    @Test
    public void testOldUser() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setAge(100);
        
        assertEquals(100, dto.getAge());
    }

    @Test
    public void testCreatedAtInPast() {
        UserInfoDTO dto = new UserInfoDTO();
        LocalDateTime past = LocalDateTime.now().minusDays(30);
        dto.setCreatedAt(past);
        
        assertTrue(dto.getCreatedAt().isBefore(LocalDateTime.now()));
    }

    @Test
    public void testCreatedAtRecent() {
        UserInfoDTO dto = new UserInfoDTO();
        LocalDateTime recent = LocalDateTime.now().minusHours(1);
        dto.setCreatedAt(recent);
        
        assertTrue(dto.getCreatedAt().isBefore(LocalDateTime.now()));
    }

    @Test
    public void testNullCreatedAt() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setCreatedAt(null);
        
        assertNull(dto.getCreatedAt());
    }

    @Test
    public void testLongUsername() {
        UserInfoDTO dto = new UserInfoDTO();
        String longUsername = "user_" + "x".repeat(45);
        dto.setUsername(longUsername);
        
        assertEquals(longUsername, dto.getUsername());
    }

    @Test
    public void testLongEmail() {
        UserInfoDTO dto = new UserInfoDTO();
        String longEmail = "verylongemailaddress@verylongdomainname.com";
        dto.setEmail(longEmail);
        
        assertEquals(longEmail, dto.getEmail());
    }

    @Test
    public void testLongName() {
        UserInfoDTO dto = new UserInfoDTO();
        String longName = "Very Long Name ".repeat(5);
        dto.setName(longName);
        
        assertEquals(longName, dto.getName());
    }

    @Test
    public void testInternationalPhone() {
        UserInfoDTO dto = new UserInfoDTO();
        dto.setPhone("+34-612-345-678");
        
        assertEquals("+34-612-345-678", dto.getPhone());
    }
}
