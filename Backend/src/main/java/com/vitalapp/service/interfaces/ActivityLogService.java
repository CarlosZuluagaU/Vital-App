package com.vitalapp.service.interfaces;

import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;

public interface ActivityLogService {
    
    ActivityLogConfirmationDTO logActivity(ActivityLogRequestDTO requestDTO, Long userId);
}
