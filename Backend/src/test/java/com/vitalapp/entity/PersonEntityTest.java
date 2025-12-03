package com.vitalapp.entity;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.vitalapp.persistence.entity.PersonEntity;

import java.time.LocalDateTime;

public class PersonEntityTest {

    @Test
    public void testDefaultConstructor() {
        PersonEntity person = new PersonEntity();
        assertNotNull(person);
    }

    @Test
    public void testParameterizedConstructor() {
        PersonEntity person = new PersonEntity("Juan Pérez", "juan@example.com", 30);
        
        assertEquals("Juan Pérez", person.getName());
        assertEquals("juan@example.com", person.getEmail());
        assertEquals(30, person.getAge());
    }

    @Test
    public void testSettersAndGetters() {
        PersonEntity person = new PersonEntity();
        
        person.setId(1L);
        person.setName("María González");
        person.setEmail("maria@example.com");
        person.setAge(25);
        person.setCreatedAt(LocalDateTime.now());
        person.setUpdatedAt(LocalDateTime.now());
        
        assertEquals(1L, person.getId());
        assertEquals("María González", person.getName());
        assertEquals("maria@example.com", person.getEmail());
        assertEquals(25, person.getAge());
        assertNotNull(person.getCreatedAt());
        assertNotNull(person.getUpdatedAt());
    }

    @Test
    public void testNullableAge() {
        PersonEntity person = new PersonEntity("Pedro", "pedro@example.com", null);
        assertNull(person.getAge());
    }

    @Test
    public void testWithZeroAge() {
        PersonEntity person = new PersonEntity();
        person.setAge(0);
        assertEquals(0, person.getAge());
    }

    @Test
    public void testWithNegativeAge() {
        PersonEntity person = new PersonEntity();
        person.setAge(-5);
        assertEquals(-5, person.getAge());
    }

    @Test
    public void testWithVeryLargeAge() {
        PersonEntity person = new PersonEntity();
        person.setAge(150);
        assertEquals(150, person.getAge());
    }

    @Test
    public void testEmailFormat() {
        PersonEntity person = new PersonEntity();
        person.setEmail("test.user+filter@example.co.uk");
        assertEquals("test.user+filter@example.co.uk", person.getEmail());
    }

    @Test
    public void testLongName() {
        String longName = "A".repeat(100);
        PersonEntity person = new PersonEntity(longName, "email@test.com", 50);
        assertEquals(longName, person.getName());
    }

    @Test
    public void testEmptyName() {
        PersonEntity person = new PersonEntity("", "email@test.com", 20);
        assertEquals("", person.getName());
    }
}
