package com.vitalapp.configuration.app;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Configuración de recursos estáticos - DESHABILITADA
 * 
 * Esta configuración se ha comentado porque ahora usamos videos desde Google Drive
 * en lugar de servir videos localmente desde el servidor.
 * 
 * Los videos se acceden directamente desde URLs de Google Drive:
 * https://drive.google.com/file/d/FILE_ID/preview
 */
@Configuration
public class StaticResourceConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // CONFIGURACIÓN DESHABILITADA - USANDO GOOGLE DRIVE
        // Los videos ahora se sirven desde Google Drive, no localmente
        
        /*
        // Configuración para servir videos de ejercicios (YA NO NECESARIA)
        registry.addResourceHandler("/videos/**")
                .addResourceLocations("classpath:/static/videos/")
                .setCachePeriod(3600); // Cache por 1 hora
        
        // Configuración para servir imágenes de ejercicios (YA NO NECESARIA)
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/")
                .setCachePeriod(3600); // Cache por 1 hora
        */
                
        // Mantener solo configuración general para otros recursos estáticos (CSS, JS, etc.)
        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/")
                .setCachePeriod(3600);
    }
}