package com.vitalapp.util;

import java.io.IOException;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Filtro que intercepta peticiones a /api/* sin autenticación válida
 * y devuelve 401 JSON en lugar de redirigir a OAuth2
 */
@Component
public class ApiAuthenticationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String uri = request.getRequestURI();
        
        // NO interceptar rutas de OAuth2 ni rutas públicas (modo invitado)
        if (uri.startsWith("/oauth2/") || 
            uri.startsWith("/login/oauth2/") ||
            uri.startsWith("/api/auth/") ||           // Todos los endpoints de auth son públicos
            uri.startsWith("/api/health") ||
            uri.startsWith("/api/exercises") ||       // Ejercicios públicos (sin trailing slash)
            uri.startsWith("/api/routines") ||        // Rutinas públicas
            uri.startsWith("/api/categories") ||      // Categorías públicas
            uri.startsWith("/api/intensities") ||     // Intensidades públicas
            uri.startsWith("/api/exercise-types")) {  // Tipos públicos
            // Rutas públicas - continuar sin validar autenticación
            filterChain.doFilter(request, response);
            return;
        }
        
        // Solo validar peticiones a /api/* (excepto las públicas de arriba)
        if (uri.startsWith("/api/")) {
            // Verificar si hay token de Authorization
            String authHeader = request.getHeader("Authorization");
            boolean hasValidAuth = (authHeader != null && authHeader.startsWith("Bearer "));
            
            // Si no hay token válido en una petición a /api/*, devolver 401 inmediatamente
            if (!hasValidAuth) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                response.getWriter().write("{\"error\":\"No autenticado\",\"message\":\"Se requiere token de autorización\"}");
                response.getWriter().flush();
                return; // No continuar con la cadena de filtros
            }
        }
        
        // Continuar con la cadena de filtros
        filterChain.doFilter(request, response);
    }
}
