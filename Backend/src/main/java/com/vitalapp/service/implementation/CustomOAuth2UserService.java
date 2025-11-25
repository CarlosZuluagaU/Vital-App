package com.vitalapp.service.implementation;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.UserEntity.AuthProvider;
import com.vitalapp.persistence.repository.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        logger.info("=== CustomOAuth2UserService loadUser STARTED ===");
        logger.info("Registration ID: " + userRequest.getClientRegistration().getRegistrationId());
        
        OAuth2User oAuth2User = super.loadUser(userRequest);
        logger.info("OAuth2User loaded from provider");
        
        try {
            OAuth2User result = processOAuth2User(userRequest, oAuth2User);
            logger.info("=== CustomOAuth2UserService loadUser COMPLETED ===");
            return result;
        } catch (Exception ex) {
            logger.error("=== CustomOAuth2UserService loadUser FAILED ===", ex);
            throw new OAuth2AuthenticationException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        logger.info("Processing OAuth2 user - registrationId: " + registrationId);
        logger.info("Attributes keys: " + attributes.keySet());

        // Extraer información según el proveedor
        String email;
        String name;
        String providerId;
        AuthProvider provider;

        switch (registrationId.toLowerCase()) {
            case "google" -> {
                provider = AuthProvider.GOOGLE;
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                providerId = (String) attributes.get("sub");
                logger.info("Google user - email: " + email + ", name: " + name);
            }
            case "facebook" -> {
                provider = AuthProvider.FACEBOOK;
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                providerId = (String) attributes.get("id");
                logger.info("Facebook user - email: " + email + ", name: " + name);
            }
            default -> {
                logger.error("Unsupported OAuth2 provider: " + registrationId);
                throw new OAuth2AuthenticationException("Proveedor OAuth2 no soportado: " + registrationId);
            }
        }

        if (email == null || email.isEmpty()) {
            logger.error("Email is null or empty from OAuth2 provider");
            throw new OAuth2AuthenticationException("Email no proporcionado por el proveedor OAuth2");
        }

        // Buscar o crear usuario
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        UserEntity user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            logger.info("User found in database - userId: " + user.getId());
            // Actualizar proveedor si es diferente
            if (!user.getProvider().equals(provider) || 
                !providerId.equals(user.getProviderId())) {
                user.setProvider(provider);
                user.setProviderId(providerId);
                user.setName(name);
                userRepository.save(user);
                logger.info("User provider updated");
            }
        } else {
            // Crear nuevo usuario
            logger.info("Creating new user for email: " + email);
            user = new UserEntity();
            user.setEmail(email);
            user.setName(name);
            user.setUsername(generateUniqueUsername(email));
            user.setProvider(provider);
            user.setProviderId(providerId);
            user.setIsEnabled(true);
            user.setIsAccountNonExpired(true);
            user.setIsAccountNonLocked(true);
            user.setIsCredentialsNonExpired(true);
            user = userRepository.save(user);
            logger.info("New user created - userId: " + user.getId());
        }

        // Retornar el OAuth2User original (Spring Security lo necesita)
        logger.info("Returning OAuth2User to Spring Security");
        return oAuth2User;
    }

    private String generateUniqueUsername(String email) {
        String baseUsername = email.split("@")[0];
        String username = baseUsername;
        int counter = 1;
        
        while (userRepository.findByUsername(username).isPresent()) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }
}
