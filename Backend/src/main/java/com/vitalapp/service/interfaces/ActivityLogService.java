package com.vitalapp.service.interfaces;

import com.vitalapp.presentation.dto.ActivityLogConfirmationDTO;
import com.vitalapp.presentation.dto.ActivityLogRequestDTO;
import com.vitalapp.presentation.dto.WeeklyStatsDTO;

public interface ActivityLogService {
    
    ActivityLogConfirmationDTO logActivity(ActivityLogRequestDTO requestDTO, Long userId);
    
    WeeklyStatsDTO getWeeklyStats(Long userId);
    
    WeeklyStatsDTO getWeeklyStats(Long userId, String startDateIso, Integer days);
}
