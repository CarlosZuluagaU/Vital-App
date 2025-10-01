package com.vitalapp.service.implementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.RoutineEntity;
import com.vitalapp.persistence.entity.UserActivityLogEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.repository.RoutineRepository;
import com.vitalapp.persistence.repository.UserActivityLogRepository;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.service.interfaces.ActivityLogService;

@Service
public class ActivityLogServiceImpl implements ActivityLogService {
    
    @Autowired
    private UserActivityLogRepository activityLogRepository;
    
    @Autowired
    private RoutineRepository routineRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public ActivityLogConfirmationDTO logActivity(ActivityLogRequestDTO requestDTO, Long userId) {
        try {
            // Validar que la rutina existe
            Optional<RoutineEntity> routineOpt = routineRepository.findById(requestDTO.getRelatedEntityId());
            if (!routineOpt.isPresent()) {
                throw new RuntimeException("Routine not found with id: " + requestDTO.getRelatedEntityId());
            }
            
            // Obtener el usuario de la base de datos
            Optional<UserEntity> userOpt = userRepository.findById(userId);
            if (!userOpt.isPresent()) {
                throw new RuntimeException("User not found with id: " + userId);
            }
            
            UserEntity user = userOpt.get();
            
            // Crear el log de actividad
            UserActivityLogEntity activityLog = new UserActivityLogEntity(
                    user,
                    UserActivityLogEntity.ActivityType.valueOf(requestDTO.getActivityType()),
                    requestDTO.getRelatedEntityId()
            );
            
            activityLogRepository.save(activityLog);
            
            // Por ahora, retornamos una confirmación simple
            // En el futuro aquí se pueden calcular logros/medallas
            return new ActivityLogConfirmationDTO("success", "Actividad registrada correctamente.");
            
        } catch (Exception e) {
            return new ActivityLogConfirmationDTO("error", "Error al registrar la actividad: " + e.getMessage());
        }
    }
}
