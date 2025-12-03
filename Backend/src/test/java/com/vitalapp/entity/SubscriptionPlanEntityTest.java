package com.vitalapp.entity;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import com.vitalapp.persistence.entity.SubscriptionPlanEntity;

public class SubscriptionPlanEntityTest {

    @Test
    public void testDefaultConstructor() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        assertNotNull(plan);
        assertTrue(plan.getIsActive());
    }

    @Test
    public void testParameterizedConstructor() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity(
            "Premium", "Plan premium con todas las características", 49.99, 12
        );
        
        assertEquals("Premium", plan.getName());
        assertEquals("Plan premium con todas las características", plan.getDescription());
        assertEquals(49.99, plan.getPrice());
        assertEquals(12, plan.getDurationMonths());
    }

    @Test
    public void testSettersAndGetters() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        
        plan.setId(1L);
        plan.setName("Básico");
        plan.setDescription("Plan básico");
        plan.setPrice(9.99);
        plan.setDurationMonths(1);
        plan.setFeatures("{\"feature1\": \"value1\"}");
        plan.setIsActive(true);
        plan.setCreatedAt(LocalDateTime.now());
        
        assertEquals(1L, plan.getId());
        assertEquals("Básico", plan.getName());
        assertEquals("Plan básico", plan.getDescription());
        assertEquals(9.99, plan.getPrice());
        assertEquals(1, plan.getDurationMonths());
        assertEquals("{\"feature1\": \"value1\"}", plan.getFeatures());
        assertTrue(plan.getIsActive());
        assertNotNull(plan.getCreatedAt());
    }

    @Test
    public void testFreePrice() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setPrice(0.0);
        assertEquals(0.0, plan.getPrice());
    }

    @Test
    public void testHighPrice() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setPrice(999.99);
        assertEquals(999.99, plan.getPrice());
    }

    @Test
    public void testShortDuration() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setDurationMonths(1);
        assertEquals(1, plan.getDurationMonths());
    }

    @Test
    public void testLongDuration() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setDurationMonths(24);
        assertEquals(24, plan.getDurationMonths());
    }

    @Test
    public void testInactivePlan() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setIsActive(false);
        assertFalse(plan.getIsActive());
    }

    @Test
    public void testJsonFeatures() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        String jsonFeatures = "{\"maxUsers\": 10, \"storage\": \"unlimited\"}";
        plan.setFeatures(jsonFeatures);
        assertEquals(jsonFeatures, plan.getFeatures());
    }

    @Test
    public void testNullDescription() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        plan.setDescription(null);
        assertNull(plan.getDescription());
    }

    @Test
    public void testLongDescription() {
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        String longDesc = "A".repeat(500);
        plan.setDescription(longDesc);
        assertEquals(longDesc, plan.getDescription());
    }
}
