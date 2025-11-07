package com.vitalapp.service.implementation;

import java.util.Map;
import java.util.Optional;

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

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        try {
            return processOAuth2User(userRequest, oAuth2User);
        } catch (Exception ex) {
            throw new OAuth2AuthenticationException(ex.getMessage());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        Map<String, Object> attributes = oAuth2User.getAttributes();

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
            }
            case "facebook" -> {
                provider = AuthProvider.FACEBOOK;
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                providerId = (String) attributes.get("id");
            }
            default -> throw new OAuth2AuthenticationException("Proveedor OAuth2 no soportado: " + registrationId);
        }

        if (email == null || email.isEmpty()) {
            throw new OAuth2AuthenticationException("Email no proporcionado por el proveedor OAuth2");
        }

        // Buscar o crear usuario
        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
        UserEntity user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Actualizar proveedor si es diferente
            if (!user.getProvider().equals(provider) || 
                !providerId.equals(user.getProviderId())) {
                user.setProvider(provider);
                user.setProviderId(providerId);
                user.setName(name);
                userRepository.save(user);
            }
        } else {
            // Crear nuevo usuario
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
        }

        // Retornar el OAuth2User original (Spring Security lo necesita)
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
