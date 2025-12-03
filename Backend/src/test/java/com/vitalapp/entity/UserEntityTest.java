package com.vitalapp.entity;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.UserEntity.AuthProvider;
import com.vitalapp.persistence.entity.UserSubscriptionEntity;

public class UserEntityTest {

    @Test
    public void testDefaultConstructor() {
        UserEntity user = new UserEntity();
        assertNotNull(user);
        assertEquals(AuthProvider.LOCAL, user.getProvider());
        assertTrue(user.getIsEnabled());
        assertTrue(user.getIsAccountNonExpired());
        assertTrue(user.getIsAccountNonLocked());
        assertTrue(user.getIsCredentialsNonExpired());
    }

    @Test
    public void testParameterizedConstructor() {
        UserEntity user = new UserEntity("testuser", "test@example.com", "password123", "Test User");
        
        assertEquals("testuser", user.getUsername());
        assertEquals("test@example.com", user.getEmail());
        assertEquals("password123", user.getPassword());
        assertEquals("Test User", user.getName());
    }

    @Test
    public void testAllSettersAndGetters() {
        UserEntity user = new UserEntity();
        
        user.setId(1L);
        user.setUsername("john_doe");
        user.setEmail("john@example.com");
        user.setPassword("securepass");
        user.setName("John Doe");
        user.setAge(30);
        user.setPhone("+1234567890");
        user.setProfilePicture("http://example.com/pic.jpg");
        user.setFitnessLevel("Intermediate");
        user.setPreferredLocation("Gym");
        user.setDateOfBirth("1993-01-15");
        user.setHeight(175.5);
        user.setWeight(70.0);
        user.setHealthConditions("None");
        user.setFitnessGoals("Build muscle");
        user.setProvider(AuthProvider.GOOGLE);
        user.setProviderId("google123");
        user.setIsEnabled(true);
        user.setIsAccountNonExpired(true);
        user.setIsAccountNonLocked(true);
        user.setIsCredentialsNonExpired(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        assertEquals(1L, user.getId());
        assertEquals("john_doe", user.getUsername());
        assertEquals("john@example.com", user.getEmail());
        assertEquals("securepass", user.getPassword());
        assertEquals("John Doe", user.getName());
        assertEquals(30, user.getAge());
        assertEquals("+1234567890", user.getPhone());
        assertEquals("http://example.com/pic.jpg", user.getProfilePicture());
        assertEquals("Intermediate", user.getFitnessLevel());
        assertEquals("Gym", user.getPreferredLocation());
        assertEquals("1993-01-15", user.getDateOfBirth());
        assertEquals(175.5, user.getHeight());
        assertEquals(70.0, user.getWeight());
        assertEquals("None", user.getHealthConditions());
        assertEquals("Build muscle", user.getFitnessGoals());
        assertEquals(AuthProvider.GOOGLE, user.getProvider());
        assertEquals("google123", user.getProviderId());
        assertTrue(user.getIsEnabled());
        assertTrue(user.getIsAccountNonExpired());
        assertTrue(user.getIsAccountNonLocked());
        assertTrue(user.getIsCredentialsNonExpired());
        assertNotNull(user.getCreatedAt());
        assertNotNull(user.getUpdatedAt());
    }

    @Test
    public void testAuthProviderEnum() {
        assertEquals(3, AuthProvider.values().length);
        assertEquals(AuthProvider.LOCAL, AuthProvider.valueOf("LOCAL"));
        assertEquals(AuthProvider.GOOGLE, AuthProvider.valueOf("GOOGLE"));
        assertEquals(AuthProvider.FACEBOOK, AuthProvider.valueOf("FACEBOOK"));
    }

    @Test
    public void testLocalAuthProvider() {
        UserEntity user = new UserEntity();
        user.setProvider(AuthProvider.LOCAL);
        assertEquals(AuthProvider.LOCAL, user.getProvider());
    }

    @Test
    public void testGoogleAuthProvider() {
        UserEntity user = new UserEntity();
        user.setProvider(AuthProvider.GOOGLE);
        user.setProviderId("google_12345");
        
        assertEquals(AuthProvider.GOOGLE, user.getProvider());
        assertEquals("google_12345", user.getProviderId());
    }

    @Test
    public void testFacebookAuthProvider() {
        UserEntity user = new UserEntity();
        user.setProvider(AuthProvider.FACEBOOK);
        user.setProviderId("fb_98765");
        
        assertEquals(AuthProvider.FACEBOOK, user.getProvider());
        assertEquals("fb_98765", user.getProviderId());
    }

    @Test
    public void testUserDetailsIsAccountNonExpired() {
        UserEntity user = new UserEntity();
        assertTrue(user.isAccountNonExpired());
        
        user.setIsAccountNonExpired(false);
        assertFalse(user.isAccountNonExpired());
    }

    @Test
    public void testUserDetailsIsAccountNonLocked() {
        UserEntity user = new UserEntity();
        assertTrue(user.isAccountNonLocked());
        
        user.setIsAccountNonLocked(false);
        assertFalse(user.isAccountNonLocked());
    }

    @Test
    public void testUserDetailsIsCredentialsNonExpired() {
        UserEntity user = new UserEntity();
        assertTrue(user.isCredentialsNonExpired());
        
        user.setIsCredentialsNonExpired(false);
        assertFalse(user.isCredentialsNonExpired());
    }

    @Test
    public void testUserDetailsIsEnabled() {
        UserEntity user = new UserEntity();
        assertTrue(user.isEnabled());
        
        user.setIsEnabled(false);
        assertFalse(user.isEnabled());
    }

    @Test
    public void testUserDetailsGetAuthorities() {
        UserEntity user = new UserEntity();
        assertNotNull(user.getAuthorities());
        assertEquals(1, user.getAuthorities().size());
        assertTrue(user.getAuthorities().stream()
            .anyMatch(auth -> auth.getAuthority().equals("ROLE_USER")));
    }

    @Test
    public void testSubscriptionsCollection() {
        UserEntity user = new UserEntity();
        List<UserSubscriptionEntity> subscriptions = new ArrayList<>();
        
        user.setSubscriptions(subscriptions);
        assertNotNull(user.getSubscriptions());
        assertEquals(0, user.getSubscriptions().size());
    }

    @Test
    public void testHasActivePremiumSubscriptionWithNoSubscriptions() {
        UserEntity user = new UserEntity();
        user.setSubscriptions(null);
        assertFalse(user.hasActivePremiumSubscription());
    }

    @Test
    public void testHasActiveBasicSubscriptionWithNoSubscriptions() {
        UserEntity user = new UserEntity();
        user.setSubscriptions(null);
        assertFalse(user.hasActiveBasicSubscription());
    }

    @Test
    public void testNullableFields() {
        UserEntity user = new UserEntity();
        user.setAge(null);
        user.setPhone(null);
        user.setHeight(null);
        user.setWeight(null);
        user.setHealthConditions(null);
        
        assertNull(user.getAge());
        assertNull(user.getPhone());
        assertNull(user.getHeight());
        assertNull(user.getWeight());
        assertNull(user.getHealthConditions());
    }

    @Test
    public void testHeightAndWeight() {
        UserEntity user = new UserEntity();
        user.setHeight(180.5);
        user.setWeight(75.2);
        
        assertEquals(180.5, user.getHeight());
        assertEquals(75.2, user.getWeight());
    }

    @Test
    public void testFitnessAttributes() {
        UserEntity user = new UserEntity();
        user.setFitnessLevel("Advanced");
        user.setFitnessGoals("Lose weight");
        user.setPreferredLocation("Home");
        
        assertEquals("Advanced", user.getFitnessLevel());
        assertEquals("Lose weight", user.getFitnessGoals());
        assertEquals("Home", user.getPreferredLocation());
    }

    @Test
    public void testHealthConditions() {
        UserEntity user = new UserEntity();
        String conditions = "Diabetes, High blood pressure";
        user.setHealthConditions(conditions);
        
        assertEquals(conditions, user.getHealthConditions());
    }

    @Test
    public void testDateOfBirth() {
        UserEntity user = new UserEntity();
        user.setDateOfBirth("1990-05-15");
        
        assertEquals("1990-05-15", user.getDateOfBirth());
    }

    @Test
    public void testProfilePictureUrl() {
        UserEntity user = new UserEntity();
        String url = "https://example.com/profiles/user123.jpg";
        user.setProfilePicture(url);
        
        assertEquals(url, user.getProfilePicture());
    }

    @Test
    public void testPhoneFormat() {
        UserEntity user = new UserEntity();
        user.setPhone("+34-612-345-678");
        assertEquals("+34-612-345-678", user.getPhone());
    }

    @Test
    public void testEmptySubscriptionsList() {
        UserEntity user = new UserEntity();
        user.setSubscriptions(new ArrayList<>());
        
        assertFalse(user.hasActivePremiumSubscription());
        assertFalse(user.hasActiveBasicSubscription());
    }

    @Test
    public void testLongUsername() {
        UserEntity user = new UserEntity();
        String longUsername = "a".repeat(50);
        user.setUsername(longUsername);
        
        assertEquals(longUsername, user.getUsername());
    }

    @Test
    public void testLongEmail() {
        UserEntity user = new UserEntity();
        String longEmail = "verylongemailaddress@verylongdomainname.com";
        user.setEmail(longEmail);
        
        assertEquals(longEmail, user.getEmail());
    }

    @Test
    public void testZeroAge() {
        UserEntity user = new UserEntity();
        user.setAge(0);
        assertEquals(0, user.getAge());
    }

    @Test
    public void testVeryOldAge() {
        UserEntity user = new UserEntity();
        user.setAge(120);
        assertEquals(120, user.getAge());
    }
}
