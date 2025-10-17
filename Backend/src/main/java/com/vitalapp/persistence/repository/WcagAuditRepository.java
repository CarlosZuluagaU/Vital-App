package com.vitalapp.persistence.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vitalapp.persistence.entity.WcagAuditEntity;
import com.vitalapp.persistence.entity.WcagAuditEntity.AuditStatus;

@Repository
public interface WcagAuditRepository extends JpaRepository<WcagAuditEntity, Long> {
    
    /**
     * Encuentra auditorías por versión
     */
    List<WcagAuditEntity> findByVersion(String version);
    
    /**
     * Encuentra auditorías por ambiente
     */
    List<WcagAuditEntity> findByEnvironment(String environment);
    
    /**
     * Encuentra auditorías por versión y ambiente
     */
    List<WcagAuditEntity> findByVersionAndEnvironment(String version, String environment);
    
    /**
     * Encuentra la última auditoría por versión
     */
    WcagAuditEntity findFirstByVersionOrderByCreatedAtDesc(String version);
    
    /**
     * Encuentra auditorías por estado
     */
    List<WcagAuditEntity> findByStatus(AuditStatus status);
    
    /**
     * Encuentra auditorías con fallos críticos
     */
    @Query("SELECT w FROM WcagAuditEntity w WHERE w.criticalIssues > 0 ORDER BY w.criticalIssues DESC")
    List<WcagAuditEntity> findAuditsWithCriticalIssues();
    
    /**
     * Encuentra auditorías en un rango de fechas
     */
    List<WcagAuditEntity> findByCreatedAtBetween(LocalDateTime start, LocalDateTime end);
    
    /**
     * Cuenta auditorías sin fallos críticos
     */
    @Query("SELECT COUNT(w) FROM WcagAuditEntity w WHERE w.criticalIssues = 0")
    Long countAuditsWithoutCriticalIssues();
    
    /**
     * Obtiene el promedio de cumplimiento
     */
    @Query("SELECT AVG(CAST(w.passedChecks AS double) / w.totalChecks * 100) FROM WcagAuditEntity w")
    Double getAverageCompliancePercentage();
    
    /**
     * Obtiene el promedio de cumplimiento por versión
     */
    @Query("SELECT AVG(CAST(w.passedChecks AS double) / w.totalChecks * 100) FROM WcagAuditEntity w WHERE w.version = :version")
    Double getAverageCompliancePercentageByVersion(@Param("version") String version);
    
    /**
     * Obtiene las últimas 10 auditorías
     */
    List<WcagAuditEntity> findTop10ByOrderByCreatedAtDesc();
}
