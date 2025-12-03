package com.vitalapp.service;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.presentation.dto.UserProfileResponseDTO;
import com.vitalapp.presentation.dto.UserProfileUpdateDTO;
import com.vitalapp.service.implementation.UserProfileServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserProfileServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserProfileServiceImpl userProfileService;

    private UserEntity testUser;

    @BeforeEach
    void setUp() {
        testUser = new UserEntity();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setName("Test User");
        testUser.setAge(30);
        testUser.setPhone("1234567890");
    }

    @Test
    void testGetUserProfile_Success() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        // Act
        UserProfileResponseDTO result = userProfileService.getUserProfile(1L);

        // Assert
        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());
        assertEquals("Test User", result.getName());
        assertEquals("1234567890", result.getPhone());
    }

    @Test
    void testGetUserProfile_NotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            userProfileService.getUserProfile(1L);
        });
    }

    @Test
    void testUpdateUserProfile_Success() {
        // Arrange
        UserProfileUpdateDTO updateDTO = new UserProfileUpdateDTO();
        updateDTO.setName("Updated Name");
        updateDTO.setPhone("9876543210");

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(UserEntity.class))).thenReturn(testUser);

        // Act
        UserProfileResponseDTO result = userProfileService.updateUserProfile(1L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("Updated Name", testUser.getName());
        assertEquals("9876543210", testUser.getPhone());
        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    void testUpdateUserProfile_PartialUpdate() {
        // Arrange
        UserProfileUpdateDTO updateDTO = new UserProfileUpdateDTO();
        updateDTO.setName("New Name");
        // phone is null (not updated)

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(UserEntity.class))).thenReturn(testUser);

        // Act
        UserProfileResponseDTO result = userProfileService.updateUserProfile(1L, updateDTO);

        // Assert
        assertNotNull(result);
        assertEquals("New Name", testUser.getName());
        assertEquals("1234567890", testUser.getPhone()); // unchanged
    }

    @Test
    void testUpdateUserProfile_UserNotFound() {
        // Arrange
        UserProfileUpdateDTO updateDTO = new UserProfileUpdateDTO();
        updateDTO.setName("New Name");

        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(RuntimeException.class, () -> {
            userProfileService.updateUserProfile(1L, updateDTO);
        });
    }
}
