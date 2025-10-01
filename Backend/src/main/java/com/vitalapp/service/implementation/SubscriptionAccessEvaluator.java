package com.vitalapp.service.implementation;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.vitalapp.persistence.entity.UserEntity;

@Component("subscriptionAccessEvaluator")
public class SubscriptionAccessEvaluator {
    
    public boolean hasPremiumAccess(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return user.hasActivePremiumSubscription();
    }
    
    public boolean hasBasicAccess(Authentication authentication) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }
        
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return user.hasActiveBasicSubscription() || user.hasActivePremiumSubscription();
    }
}
