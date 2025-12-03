package com.vitalapp.dto;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import com.vitalapp.presentation.dto.SubscriptionInfoDTO;

public class SubscriptionInfoDTOTest {

    @Test
    public void testDefaultConstructor() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        assertNotNull(dto);
        assertFalse(dto.isActive());
        assertFalse(dto.isPremium());
    }

    @Test
    public void testParameterizedConstructor() {
        LocalDateTime start = LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2025, 1, 1, 0, 0);
        
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO(1L, "Premium", "ACTIVE", start, end);
        
        assertEquals(1L, dto.getId());
        assertEquals("Premium", dto.getPlanName());
        assertEquals("ACTIVE", dto.getStatus());
        assertEquals(start, dto.getStartDate());
        assertEquals(end, dto.getEndDate());
    }

    @Test
    public void testSettersAndGetters() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusMonths(12);
        
        dto.setId(10L);
        dto.setPlanName("Básico");
        dto.setPlanDescription("Plan básico mensual");
        dto.setPrice(9.99);
        dto.setStatus("ACTIVE");
        dto.setStartDate(start);
        dto.setEndDate(end);
        dto.setActive(true);
        dto.setPremium(false);
        
        assertEquals(10L, dto.getId());
        assertEquals("Básico", dto.getPlanName());
        assertEquals("Plan básico mensual", dto.getPlanDescription());
        assertEquals(9.99, dto.getPrice());
        assertEquals("ACTIVE", dto.getStatus());
        assertEquals(start, dto.getStartDate());
        assertEquals(end, dto.getEndDate());
        assertTrue(dto.isActive());
        assertFalse(dto.isPremium());
    }

    @Test
    public void testPremiumPlan() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setPremium(true);
        dto.setPlanName("Premium");
        dto.setPrice(49.99);
        
        assertTrue(dto.isPremium());
        assertEquals("Premium", dto.getPlanName());
        assertEquals(49.99, dto.getPrice());
    }

    @Test
    public void testBasicPlan() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setPremium(false);
        dto.setPlanName("Básico");
        dto.setPrice(0.0);
        
        assertFalse(dto.isPremium());
        assertEquals("Básico", dto.getPlanName());
        assertEquals(0.0, dto.getPrice());
    }

    @Test
    public void testActiveStatus() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setStatus("ACTIVE");
        dto.setActive(true);
        
        assertEquals("ACTIVE", dto.getStatus());
        assertTrue(dto.isActive());
    }

    @Test
    public void testExpiredStatus() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setStatus("EXPIRED");
        dto.setActive(false);
        
        assertEquals("EXPIRED", dto.getStatus());
        assertFalse(dto.isActive());
    }

    @Test
    public void testCancelledStatus() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setStatus("CANCELLED");
        dto.setActive(false);
        
        assertEquals("CANCELLED", dto.getStatus());
        assertFalse(dto.isActive());
    }

    @Test
    public void testNullDescription() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setPlanDescription(null);
        assertNull(dto.getPlanDescription());
    }

    @Test
    public void testEmptyPlanName() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setPlanName("");
        assertEquals("", dto.getPlanName());
    }

    @Test
    public void testHighPrice() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        dto.setPrice(999.99);
        assertEquals(999.99, dto.getPrice());
    }

    @Test
    public void testFutureEndDate() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        LocalDateTime future = LocalDateTime.now().plusYears(1);
        dto.setEndDate(future);
        
        assertTrue(dto.getEndDate().isAfter(LocalDateTime.now()));
    }

    @Test
    public void testPastStartDate() {
        SubscriptionInfoDTO dto = new SubscriptionInfoDTO();
        LocalDateTime past = LocalDateTime.now().minusMonths(6);
        dto.setStartDate(past);
        
        assertTrue(dto.getStartDate().isBefore(LocalDateTime.now()));
    }
}
