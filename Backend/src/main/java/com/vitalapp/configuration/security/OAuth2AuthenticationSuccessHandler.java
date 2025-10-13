package com.vitalapp.configuration.security;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import com.vitalapp.persistence.entity.UserEntity;
import com.vitalapp.persistence.entity.UserEntity.AuthProvider;
import com.vitalapp.persistence.repository.UserRepository;
import com.vitalapp.service.interfaces.AuthService;
import com.vitalapp.util.JwtTokenProvider;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthService authService;

    @Value("${app.oauth2.authorizedRedirectUris:}")
    private List<String> authorizedRedirectUris;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {

        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {

        Optional<String> redirectUri = Optional.ofNullable(request.getParameter("redirect_uri"));

        if (redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new RuntimeException("Unauthorized Redirect URI");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Procesar el usuario OAuth2
        UserEntity user = processOAuth2User(oAuth2User, authentication);

        // Generar JWT token
        String token = jwtTokenProvider.generateTokenFromUserId(user.getId());

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", token)
                .queryParam("error", "")
                .build().toUriString();
    }

    private UserEntity processOAuth2User(OAuth2User oAuth2User, Authentication authentication) {
        Map<String, Object> attributes = oAuth2User.getAttributes();
        
        // Determinar el proveedor (Google o Facebook)
        AuthProvider provider = determineProvider(authentication);
        
        String email;
        String name;
        String providerId;

        switch (provider) {
            case GOOGLE -> {
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                providerId = (String) attributes.get("sub");
            }
            case FACEBOOK -> {
                email = (String) attributes.get("email");
                name = (String) attributes.get("name");
                providerId = (String) attributes.get("id");
            }
            default -> throw new RuntimeException("Proveedor OAuth2 no soportado: " + provider);
        }

        // Buscar usuario existente por email
        Optional<UserEntity> existingUser = userRepository.findByEmail(email);
        
        if (existingUser.isPresent()) {
            UserEntity user = existingUser.get();
            // Actualizar información si es necesario
            if (!user.getProvider().equals(provider)) {
                user.setProvider(provider);
                user.setProviderId(providerId);
                userRepository.save(user);
            }
            return user;
        } else {
            // Crear nuevo usuario
            UserEntity newUser = new UserEntity();
            newUser.setEmail(email);
            newUser.setName(name);
            newUser.setUsername(generateUniqueUsername(email));
            newUser.setProvider(provider);
            newUser.setProviderId(providerId);
            newUser.setIsEnabled(true);
            newUser.setIsAccountNonExpired(true);
            newUser.setIsAccountNonLocked(true);
            newUser.setIsCredentialsNonExpired(true);
            
            return userRepository.save(newUser);
        }
    }

    private AuthProvider determineProvider(Authentication authentication) {
        // El nombre del proveedor se puede obtener del contexto de la petición
        // o del nombre del registro del cliente OAuth2
        String clientName = authentication.getName();
        
        if (clientName != null && clientName.contains("google")) {
            return AuthProvider.GOOGLE;
        } else if (clientName != null && clientName.contains("facebook")) {
            return AuthProvider.FACEBOOK;
        }
        
        // Alternativa: obtener desde los atributos del OAuth2User
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oauth2User.getAttributes();
        
        // Google tiene "sub" como identificador
        if (attributes.containsKey("sub")) {
            return AuthProvider.GOOGLE;
        }
        // Facebook tiene "id" como identificador único
        else if (attributes.containsKey("id") && !attributes.containsKey("sub")) {
            return AuthProvider.FACEBOOK;
        }
        
        throw new RuntimeException("Proveedor OAuth2 desconocido");
    }

    private String generateUniqueUsername(String email) {
        String baseUsername = email.split("@")[0];
        String username = baseUsername;
        int counter = 1;
        
        while (authService.existsByUsername(username)) {
            username = baseUsername + counter;
            counter++;
        }
        
        return username;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        if (authorizedRedirectUris == null || authorizedRedirectUris.isEmpty()) {
            // Default to localhost if no configuration is provided
            return uri.startsWith("http://localhost:5173/oauth2/redirect");
        }
        
        for (String authorizedUri : authorizedRedirectUris) {
            if (uri.startsWith(authorizedUri.trim())) {
                return true;
            }
        }
        return false;
    }
}