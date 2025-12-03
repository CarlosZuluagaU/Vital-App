package com.vitalapp.entity;

import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;

import com.vitalapp.persistence.entity.SubscriptionPlanEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.UserSubscriptionEntity;
import com.vitalapp.persistence.entity.UserSubscriptionEntity.SubscriptionStatus;

public class UserSubscriptionEntityTest {

    @Test
    public void testDefaultConstructor() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        assertNotNull(subscription);
    }

    @Test
    public void testParameterizedConstructor() {
        UserEntity user = new UserEntity();
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        LocalDateTime start = LocalDateTime.now();
        LocalDateTime end = start.plusMonths(12);
        
        UserSubscriptionEntity subscription = new UserSubscriptionEntity(user, plan, start, end);
        
        assertEquals(user, subscription.getUser());
        assertEquals(plan, subscription.getPlan());
        assertEquals(start, subscription.getStartDate());
        assertEquals(end, subscription.getEndDate());
        assertEquals(SubscriptionStatus.ACTIVE, subscription.getStatus());
    }

    @Test
    public void testSettersAndGetters() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        UserEntity user = new UserEntity();
        SubscriptionPlanEntity plan = new SubscriptionPlanEntity();
        LocalDateTime start = LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2025, 1, 1, 0, 0);
        
        subscription.setId(1L);
        subscription.setUser(user);
        subscription.setPlan(plan);
        subscription.setStartDate(start);
        subscription.setEndDate(end);
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setCreatedAt(LocalDateTime.now());
        
        assertEquals(1L, subscription.getId());
        assertEquals(user, subscription.getUser());
        assertEquals(plan, subscription.getPlan());
        assertEquals(start, subscription.getStartDate());
        assertEquals(end, subscription.getEndDate());
        assertEquals(SubscriptionStatus.ACTIVE, subscription.getStatus());
        assertNotNull(subscription.getCreatedAt());
    }

    @Test
    public void testIsActiveWithActiveStatus() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));
        
        assertTrue(subscription.isActive());
    }

    @Test
    public void testIsActiveWithExpiredStatus() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        subscription.setStatus(SubscriptionStatus.EXPIRED);
        subscription.setEndDate(LocalDateTime.now().minusMonths(1));
        
        assertFalse(subscription.isActive());
    }

    @Test
    public void testIsActiveWithCancelledStatus() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        subscription.setStatus(SubscriptionStatus.CANCELLED);
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));
        
        assertFalse(subscription.isActive());
    }

    @Test
    public void testIsActiveWithSuspendedStatus() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        subscription.setStatus(SubscriptionStatus.SUSPENDED);
        subscription.setEndDate(LocalDateTime.now().plusMonths(1));
        
        assertFalse(subscription.isActive());
    }

    @Test
    public void testIsActiveWithEndDateInPast() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        subscription.setStatus(SubscriptionStatus.ACTIVE);
        subscription.setEndDate(LocalDateTime.now().minusDays(1));
        
        assertFalse(subscription.isActive());
    }

    @Test
    public void testSubscriptionStatusEnumValues() {
        assertEquals(4, SubscriptionStatus.values().length);
        assertEquals(SubscriptionStatus.ACTIVE, SubscriptionStatus.valueOf("ACTIVE"));
        assertEquals(SubscriptionStatus.EXPIRED, SubscriptionStatus.valueOf("EXPIRED"));
        assertEquals(SubscriptionStatus.CANCELLED, SubscriptionStatus.valueOf("CANCELLED"));
        assertEquals(SubscriptionStatus.SUSPENDED, SubscriptionStatus.valueOf("SUSPENDED"));
    }

    @Test
    public void testStartDateBeforeEndDate() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        LocalDateTime start = LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime end = LocalDateTime.of(2024, 12, 31, 23, 59);
        
        subscription.setStartDate(start);
        subscription.setEndDate(end);
        
        assertTrue(subscription.getStartDate().isBefore(subscription.getEndDate()));
    }

    @Test
    public void testOneMonthSubscription() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        LocalDateTime start = LocalDateTime.of(2024, 6, 1, 0, 0);
        LocalDateTime end = start.plusMonths(1);
        
        subscription.setStartDate(start);
        subscription.setEndDate(end);
        
        assertEquals(LocalDateTime.of(2024, 7, 1, 0, 0), subscription.getEndDate());
    }

    @Test
    public void testTwelveMonthSubscription() {
        UserSubscriptionEntity subscription = new UserSubscriptionEntity();
        LocalDateTime start = LocalDateTime.of(2024, 1, 1, 0, 0);
        LocalDateTime end = start.plusMonths(12);
        
        subscription.setStartDate(start);
        subscription.setEndDate(end);
        
        assertEquals(LocalDateTime.of(2025, 1, 1, 0, 0), subscription.getEndDate());
    }
}
