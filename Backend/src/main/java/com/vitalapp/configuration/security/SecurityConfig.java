package com.vitalapp.configuration.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource; // <-- IMPORTACIÓN AÑADIDA
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.vitalapp.service.implementation.CustomUserDetailsService;
import com.vitalapp.service.implementation.SubscriptionAccessEvaluator;
import com.vitalapp.util.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private SubscriptionAccessEvaluator subscriptionAccessEvaluator;

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(customUserDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authz -> authz
                        // Endpoints públicos (autenticación, etc.)
                        .requestMatchers("/api/auth/**").permitAll()
                        .requestMatchers("/actuator/health").permitAll()

                        // Endpoints de desarrollo (Swagger, H2) - Se recomienda activarlos solo en el perfil 'dev'
                        .requestMatchers("/h2-console/**").permitAll() // Considerar @Profile("dev")
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll() // Considerar @Profile("dev")

                        // Endpoints que requieren plan básico o superior
                        .requestMatchers("/api/routines/**", "/api/exercises/basic/**", "/api/me/activities/**").hasRole("USER")

                        // Endpoints que requieren plan premium
                        // --- CÓDIGO CORREGIDO ---
                        .requestMatchers("/api/exercises/premium/**").access(new WebExpressionAuthorizationManager("@subscriptionAccessEvaluator.hasPremiumAccess(authentication)"))
                        .requestMatchers("/api/multicomponent/**").access(new WebExpressionAuthorizationManager("@subscriptionAccessEvaluator.hasPremiumAccess(authentication)"))

                        // Todos los demás endpoints requieren autenticación
                        .anyRequest().authenticated()
                )
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Necesario para que el frame de la H2 Console funcione
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // --- MEJORA DE SEGURIDAD ---
        // En lugar de "*", especifica los orígenes permitidos.
        // Para desarrollo, puedes usar "http://localhost:3000" (si usas React/Vue/Angular)
        // Para producción, sería "https://www.vitalapp.com"
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "http://12.0.0.1:3000"));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true); // Permitir credenciales es importante para JWT en cookies o headers

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

