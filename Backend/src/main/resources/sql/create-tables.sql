-- =====================================================
-- SCRIPT DE CREACIÓN DE TABLAS PARA VITAL APP
-- Base de datos: vital_app_db
-- =====================================================

USE vital_app_db;

-- =====================================================
-- TABLA: categories
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: intensities
-- =====================================================
CREATE TABLE IF NOT EXISTS intensities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    level INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: exercise_types
-- =====================================================
CREATE TABLE IF NOT EXISTS exercise_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: exercises
-- =====================================================
CREATE TABLE IF NOT EXISTS exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    duration_seconds INTEGER,
    repetitions INTEGER,
    sets INTEGER,
    calories_per_minute DECIMAL(5,2),
    difficulty_level INTEGER,
    image_url VARCHAR(500),
    video_url VARCHAR(500),
    benefits TEXT,
    safety_tips TEXT,
    modifications TEXT,
    category_id BIGINT,
    intensity_id BIGINT,
    exercise_type_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (intensity_id) REFERENCES intensities(id),
    FOREIGN KEY (exercise_type_id) REFERENCES exercise_types(id)
);

-- =====================================================
-- TABLA: routines
-- =====================================================
CREATE TABLE IF NOT EXISTS routines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE,
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    category_id BIGINT,
    intensity_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (intensity_id) REFERENCES intensities(id)
);

-- =====================================================
-- TABLA: routine_exercises (relación muchos a muchos)
-- =====================================================
CREATE TABLE IF NOT EXISTS routine_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    routine_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    exercise_order INTEGER NOT NULL,
    duration_seconds INTEGER,
    repetitions INTEGER,
    sets INTEGER,
    rest_seconds INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    UNIQUE KEY unique_routine_exercise_order (routine_id, exercise_order)
);

-- =====================================================
-- TABLA: users
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    date_of_birth DATE,
    gender ENUM('MALE', 'FEMALE', 'OTHER'),
    phone VARCHAR(20),
    profile_image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT TRUE,
    email_verified BOOLEAN DEFAULT FALSE,
    provider ENUM('LOCAL', 'GOOGLE', 'FACEBOOK') DEFAULT 'LOCAL',
    provider_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- ÍNDICES ADICIONALES PARA RENDIMIENTO
-- =====================================================
CREATE INDEX idx_exercises_category ON exercises(category_id);
CREATE INDEX idx_exercises_intensity ON exercises(intensity_id);
CREATE INDEX idx_exercises_type ON exercises(exercise_type_id);
CREATE INDEX idx_routines_category ON routines(category_id);
CREATE INDEX idx_routines_intensity ON routines(intensity_id);
CREATE INDEX idx_routine_exercises_routine ON routine_exercises(routine_id);
CREATE INDEX idx_routine_exercises_exercise ON routine_exercises(exercise_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_provider ON users(provider, provider_id);

-- =====================================================
-- VERIFICAR CREACIÓN DE TABLAS
-- =====================================================
SHOW TABLES;

-- =====================================================
-- MENSAJE DE CONFIRMACIÓN
-- =====================================================
SELECT 'Tablas creadas exitosamente para VitalApp!' as mensaje;