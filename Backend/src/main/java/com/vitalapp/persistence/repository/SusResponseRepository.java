package com.vitalapp.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.SusResponseEntity;

@Repository
public interface SusResponseRepository extends JpaRepository<SusResponseEntity, Long> {
    
    /**
     * Encuentra todas las respuestas de un usuario específico
     */
    List<SusResponseEntity> findByUserId(Long userId);
    
    /**
     * Encuentra respuestas por versión
     */
    List<SusResponseEntity> findByVersion(String version);
    
    /**
     * Encuentra respuestas por ambiente
     */
    List<SusResponseEntity> findByEnvironment(String environment);
    
    /**
     * Encuentra respuestas por versión y ambiente
     */
    List<SusResponseEntity> findByVersionAndEnvironment(String version, String environment);
    
    /**
     * Encuentra respuestas en un rango de fechas
     */
    List<SusResponseEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    /**
     * Calcula el promedio de puntaje SUS
     */
    @Query("SELECT AVG(s.susScore) FROM SusResponseEntity s")
    Double getAverageSusScore();
    
    /**
     * Calcula el promedio de puntaje SUS por versión
     */
    @Query("SELECT AVG(s.susScore) FROM SusResponseEntity s WHERE s.version = :version")
    Double getAverageSusScoreByVersion(@Param("version") String version);
    
    /**
     * Calcula el promedio de puntaje SUS por ambiente
     */
    @Query("SELECT AVG(s.susScore) FROM SusResponseEntity s WHERE s.environment = :environment")
    Double getAverageSusScoreByEnvironment(@Param("environment") String environment);
    
    /**
     * Cuenta respuestas que cumplen la meta (≥75)
     */
    @Query("SELECT COUNT(s) FROM SusResponseEntity s WHERE s.susScore >= 75")
    Long countResponsesMeetingTarget();
    
    /**
     * Cuenta respuestas que cumplen la meta por versión
     */
    @Query("SELECT COUNT(s) FROM SusResponseEntity s WHERE s.version = :version AND s.susScore >= 75")
    Long countResponsesMeetingTargetByVersion(@Param("version") String version);
    
    /**
     * Obtiene las últimas N respuestas
     */
    List<SusResponseEntity> findTop10ByOrderByCreatedAtDesc();
    
    /**
     * Obtiene respuestas con puntaje menor a la meta
     */
    @Query("SELECT s FROM SusResponseEntity s WHERE s.susScore < 75 ORDER BY s.susScore ASC")
    List<SusResponseEntity> findResponsesBelowTarget();
}
