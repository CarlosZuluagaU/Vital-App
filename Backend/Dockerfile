# ============================================
# Dockerfile para Vital App Backend
# Spring Boot 3.3.0 + Java 17
# ============================================

# Etapa 1: Build (compilación)
FROM maven:3.9.9-eclipse-temurin-17 AS build

WORKDIR /app

# Copiar archivos de configuración Maven
COPY pom.xml .
COPY src ./src

# Compilar la aplicación (saltando tests para build más rápido)
RUN mvn clean package -DskipTests

# Etapa 2: Runtime (ejecución)
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Crear usuario no-root para seguridad
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copiar el JAR compilado desde la etapa de build
COPY --from=build /app/target/*.jar app.jar

# Exponer puerto 8080
EXPOSE 8080

# Variables de entorno (se pueden sobrescribir en docker-compose)
ENV SPRING_PROFILES_ACTIVE=docker
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Ejecutar la aplicación
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
