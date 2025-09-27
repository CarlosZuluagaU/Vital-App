package com.vitalapp.service.implementation;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.vitalapp.persistence.entity.SubscriptionPlanEntity;
import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.UserSubscriptionEntity;
import com.vitalapp.persistence.repository.SubscriptionPlanRepository;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.persistence.repository.UserSubscriptionRepository;
import com.vitalapp.presentation.dto.AuthResponseDTO;
import com.vitalapp.presentation.dto.LoginRequestDTO;
import com.vitalapp.presentation.dto.SignUpRequestDTO;
import com.vitalapp.presentation.dto.SubscriptionInfoDTO;
import com.vitalapp.presentation.dto.UserInfoDTO;
import com.vitalapp.service.interfaces.AuthService;
import com.vitalapp.util.JwtTokenProvider;

@Service
public class AuthServiceImpl implements AuthService {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private SubscriptionPlanRepository subscriptionPlanRepository;
    
    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider tokenProvider;
    
    @Override
    public AuthResponseDTO login(LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);
        
        UserEntity user = (UserEntity) authentication.getPrincipal();
        UserInfoDTO userInfo = convertToUserInfoDTO(user);
        
        return new AuthResponseDTO(jwt, userInfo);
    }
    
    @Override
    @Transactional
    public AuthResponseDTO register(SignUpRequestDTO signUpRequest) {
        // Verificar si el usuario ya existe
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            throw new RuntimeException("El nombre de usuario ya está en uso");
        }
        
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new RuntimeException("El email ya está registrado");
        }
        
        // Crear nuevo usuario
        UserEntity user = new UserEntity();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
        user.setName(signUpRequest.getName());
        user.setAge(signUpRequest.getAge());
        user.setPhone(signUpRequest.getPhone());
        user.setProvider(UserEntity.AuthProvider.LOCAL);
        // Establecer createdAt explícitamente para asegurar que no sea null
        user.setCreatedAt(LocalDateTime.now());
        
        UserEntity savedUser = userRepository.save(user);
        
        // Asignar plan básico por defecto
        assignBasicPlan(savedUser);
        
        // Generar token
        String jwt = tokenProvider.generateTokenFromUserId(savedUser.getId());
        UserInfoDTO userInfo = convertToUserInfoDTO(savedUser);
        
        return new AuthResponseDTO(jwt, userInfo);
    }
    
    @Override
    public UserInfoDTO getCurrentUser(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return convertToUserInfoDTO(user);
    }
    
    @Override
    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
    
    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
    private void assignBasicPlan(UserEntity user) {
        Optional<SubscriptionPlanEntity> basicPlan = subscriptionPlanRepository.findByNameIgnoreCase("Básico");
        if (basicPlan.isPresent()) {
            UserSubscriptionEntity subscription = new UserSubscriptionEntity();
            subscription.setUser(user);
            subscription.setPlan(basicPlan.get());
            subscription.setStartDate(LocalDateTime.now());
            subscription.setEndDate(LocalDateTime.now().plusMonths(basicPlan.get().getDurationMonths()));
            subscription.setStatus(UserSubscriptionEntity.SubscriptionStatus.ACTIVE);
            
            userSubscriptionRepository.save(subscription);
        }
    }
    
    private UserInfoDTO convertToUserInfoDTO(UserEntity user) {
        UserInfoDTO userInfo = new UserInfoDTO();
        userInfo.setId(user.getId());
        userInfo.setUsername(user.getUsername());
        userInfo.setEmail(user.getEmail());
        userInfo.setName(user.getName());
        userInfo.setAge(user.getAge());
        userInfo.setPhone(user.getPhone());
        userInfo.setProvider(user.getProvider().toString());
        // Validación para evitar NullPointerException con fechas
        userInfo.setCreatedAt(user.getCreatedAt() != null ? user.getCreatedAt() : LocalDateTime.now());
        
        // Obtener suscripción activa - validar que user.getId() no sea null
        if (user.getId() != null) {
            Optional<UserSubscriptionEntity> activeSubscription = userSubscriptionRepository
                    .findActiveSubscriptionsByUserId(user.getId(), LocalDateTime.now())
                    .stream()
                    .findFirst();
            
            if (activeSubscription.isPresent()) {
                UserSubscriptionEntity sub = activeSubscription.get();
                SubscriptionInfoDTO subInfo = new SubscriptionInfoDTO();
                subInfo.setId(sub.getId());
                subInfo.setPlanName(sub.getPlan().getName());
                subInfo.setPlanDescription(sub.getPlan().getDescription());
                subInfo.setPrice(sub.getPlan().getPrice());
                subInfo.setStatus(sub.getStatus().toString());
                subInfo.setStartDate(sub.getStartDate());
                subInfo.setEndDate(sub.getEndDate());
                
                userInfo.setCurrentSubscription(subInfo);
            }
        }
        
        return userInfo;
    }
}
