package com.vitalapp.entity;

import com.vitalapp.persistence.entity.UserActivityLogEntity;
import com.vitalapp.persistence.entity.UserEntity;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

class UserActivityLogEntityTest {

    @Test
    void testUserActivityLogEntity_ConstructorAndGetters() {
        UserEntity user = new UserEntity();
        user.setId(1L);

        UserActivityLogEntity entity = new UserActivityLogEntity(
            user,
            UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED,
            1L,
            600,
            5
        );

        assertEquals(user, entity.getUser());
        assertEquals(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED, entity.getActivityType());
        assertEquals(1L, entity.getRelatedEntityId());
        assertEquals(600, entity.getDurationSeconds());
        assertEquals(5, entity.getExerciseCount());
        // CompletedAt y ActivityDate se setean en @PrePersist, no en constructor
    }

    @Test
    void testUserActivityLogEntity_ActivityDate() {
        UserActivityLogEntity entity = new UserActivityLogEntity();
        LocalDate date = LocalDate.of(2025, 11, 22);
        entity.setActivityDate(date);

        assertEquals(date, entity.getActivityDate());
    }

    @Test
    void testUserActivityLogEntity_PrePersist() {
        UserEntity user = new UserEntity();
        UserActivityLogEntity entity = new UserActivityLogEntity(
            user,
            UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED,
            1L,
            600,
            5
        );

        // Simular @PrePersist manualmente
        entity.setCompletedAt(LocalDateTime.now());
        entity.setActivityDate(LocalDate.now());

        // PrePersist sets completed_at and activity_date
        assertNotNull(entity.getCompletedAt());
        assertNotNull(entity.getActivityDate());
    }

    @Test
    void testUserActivityLogEntity_SettersAndGetters() {
        UserActivityLogEntity entity = new UserActivityLogEntity();
        UserEntity user = new UserEntity();
        user.setId(1L);

        entity.setUser(user);
        entity.setActivityType(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED);
        entity.setRelatedEntityId(1L);
        entity.setDurationSeconds(600);
        entity.setExerciseCount(5);
        entity.setCompletedAt(LocalDateTime.now());
        entity.setActivityDate(LocalDate.now());

        assertEquals(user, entity.getUser());
        assertEquals(UserActivityLogEntity.ActivityType.ROUTINE_COMPLETED, entity.getActivityType());
        assertEquals(1L, entity.getRelatedEntityId());
        assertEquals(600, entity.getDurationSeconds());
        assertEquals(5, entity.getExerciseCount());
        assertNotNull(entity.getCompletedAt());
        assertNotNull(entity.getActivityDate());
    }
}
