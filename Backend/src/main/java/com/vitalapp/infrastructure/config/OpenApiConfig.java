package com.vitalapp.infrastructure.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(title = "VitalApp API (MVP)", version = "1.0", description = "API MVP para VitalApp")
)
@Configuration
public class OpenApiConfig {
}
