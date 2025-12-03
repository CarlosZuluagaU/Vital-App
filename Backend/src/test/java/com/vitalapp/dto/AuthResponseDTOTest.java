package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import com.vitalapp.presentation.dto.AuthResponseDTO;
import com.vitalapp.presentation.dto.UserInfoDTO;

@ExtendWith(MockitoExtension.class)
public class AuthResponseDTOTest {
    
    @Test
    public void testDefaultConstructor() {
        AuthResponseDTO dto = new AuthResponseDTO();
        
        assertNotNull(dto);
        assertNull(dto.getAccessToken());
        assertEquals("Bearer", dto.getTokenType());
        assertNull(dto.getUser());
    }
    
    @Test
    public void testParameterizedConstructor() {
        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setId(1L);
        userInfo.setUsername("testuser");
        String token = "eyJhbGciOiJIUzUxMiJ9.test.token";
        
        AuthResponseDTO dto = new AuthResponseDTO(token, userInfo);
        
        assertNotNull(dto);
        assertEquals(token, dto.getAccessToken());
        assertEquals("Bearer", dto.getTokenType());
        assertEquals(userInfo, dto.getUser());
    }
    
    @Test
    public void testSettersAndGetters() {
        AuthResponseDTO dto = new AuthResponseDTO();
        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setId(1L);
        String token = "test.jwt.token";
        
        dto.setAccessToken(token);
        dto.setTokenType("Custom");
        dto.setUser(userInfo);
        
        assertEquals(token, dto.getAccessToken());
        assertEquals("Custom", dto.getTokenType());
        assertEquals(userInfo, dto.getUser());
    }
    
    @Test
    public void testTokenTypeDefaultValue() {
        AuthResponseDTO dto = new AuthResponseDTO();
        
        assertEquals("Bearer", dto.getTokenType());
    }
    
    @Test
    public void testSetTokenType() {
        AuthResponseDTO dto = new AuthResponseDTO();
        dto.setTokenType("JWT");
        
        assertEquals("JWT", dto.getTokenType());
    }
    
    @Test
    public void testNullAccessToken() {
        AuthResponseDTO dto = new AuthResponseDTO(null, new UserInfoDTO());
        
        assertNull(dto.getAccessToken());
    }
    
    @Test
    public void testNullUser() {
        AuthResponseDTO dto = new AuthResponseDTO("token123", null);
        
        assertNull(dto.getUser());
    }
    
    @Test
    public void testCompleteAuthResponse() {
        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setId(123L);
        userInfo.setUsername("john_doe");
        userInfo.setEmail("john@example.com");
        userInfo.setName("John Doe");
        
        String token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE2MDAwMDAwMDAsImV4cCI6MTYwMDYwNDgwMH0.signature";
        
        AuthResponseDTO dto = new AuthResponseDTO(token, userInfo);
        
        assertEquals(token, dto.getAccessToken());
        assertEquals("Bearer", dto.getTokenType());
        assertEquals(123L, dto.getUser().getId());
        assertEquals("john_doe", dto.getUser().getUsername());
        assertEquals("john@example.com", dto.getUser().getEmail());
        assertEquals("John Doe", dto.getUser().getName());
    }
    
    @Test
    public void testLongAccessToken() {
        String longToken = "a".repeat(500);
        UserInfoDTO userInfo = new UserInfoDTO();
        
        AuthResponseDTO dto = new AuthResponseDTO(longToken, userInfo);
        
        assertEquals(longToken, dto.getAccessToken());
        assertEquals(500, dto.getAccessToken().length());
    }
    
    @Test
    public void testEmptyAccessToken() {
        AuthResponseDTO dto = new AuthResponseDTO("", new UserInfoDTO());
        
        assertEquals("", dto.getAccessToken());
    }
    
    @Test
    public void testUserInfoWithProvider() {
        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setId(1L);
        userInfo.setUsername("google_user");
        userInfo.setProvider("GOOGLE");
        
        AuthResponseDTO dto = new AuthResponseDTO("token", userInfo);
        
        assertEquals("GOOGLE", dto.getUser().getProvider());
    }
}
