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
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.vitalapp.service.implementation.CustomOAuth2UserService;
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

    @Autowired
    private CustomOAuth2UserService customOAuth2UserService;

    @Autowired
    private OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler;

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
                        // Endpoints públicos (autenticación - login, register, etc.)
                        .requestMatchers("/api/auth/login", "/api/auth/register").permitAll()
                        .requestMatchers("/api/auth/check-username/**", "/api/auth/check-email/**").permitAll()
                        .requestMatchers("/api/health").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        
                        // Endpoint protegido - requiere autenticación
                        .requestMatchers("/api/auth/me").authenticated()
                        
                        // OAuth2 endpoints
                        .requestMatchers("/oauth2/**", "/login/oauth2/**").permitAll()

                        // Endpoints de desarrollo (Swagger, H2) - Se recomienda activarlos solo en el perfil 'dev'
                        .requestMatchers("/h2-console/**").permitAll() // Considerar @Profile("dev")
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**", "/swagger-resources/**", "/webjars/**").permitAll() // Considerar @Profile("dev")

                        // Endpoints públicos para pruebas (temporalmente)
                        //.requestMatchers("/api/exercises/**", "/api/routines/**").permitAll()

                        // Endpoints públicos (acceso libre)
                        .requestMatchers("/api/exercises/").permitAll()          // Todos los ejercicios (básicos y premium)
                        .requestMatchers("/api/routines/").permitAll()           // Todas las rutinas
                        .requestMatchers("/api/categories/").permitAll()         // Categorías
                        .requestMatchers("/api/intensities/").permitAll()        // Intensidades
                        .requestMatchers("/api/exercise-types/**").permitAll()
                        
                        // Endpoints que requieren plan básico o superior
                        .requestMatchers("/api/me/activities/**").hasRole("USER")

                        // Endpoints que requieren plan premium
                        .requestMatchers("/api/exercises/premium/**").access(new WebExpressionAuthorizationManager("@subscriptionAccessEvaluator.hasPremiumAccess(authentication)"))
                        .requestMatchers("/api/multicomponent/**").access(new WebExpressionAuthorizationManager("@subscriptionAccessEvaluator.hasPremiumAccess(authentication)"))

                        // Todos los demás endpoints requieren autenticación
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage("/oauth2/authorization/google")  // Deshabilita página de login por defecto
                        .defaultSuccessUrl("http://localhost:5173/oauth2/redirect", true)  // URL por defecto después de login exitoso
                        .userInfoEndpoint(userInfo -> userInfo
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(oAuth2AuthenticationSuccessHandler)
                )
                .formLogin(form -> form.disable()) // Deshabilitar formulario de login por defecto
                .httpBasic(basic -> basic.disable()) // Deshabilitar HTTP Basic
                .authenticationProvider(authenticationProvider())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        // Necesario para que el frame de la H2 Console funcione
        http.headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()));

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Orígenes permitidos (no usar "*" con allowCredentials=true)
        configuration.setAllowedOrigins(Arrays.asList(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "http://localhost:8080"
        ));

        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        configuration.setAllowedHeaders(Arrays.asList(
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin",
            "X-Requested-With"
        ));
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);
        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}

