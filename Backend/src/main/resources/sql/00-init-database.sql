-- =====================================================
-- SCRIPT DE INICIALIZACIÓN COMPLETA PARA VITAL APP
-- Versión: 2.0 - Organizado y Limpio
-- =====================================================

-- Configurar charset y collation para la sesión
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET character_set_connection=utf8mb4;

USE vital_app_db;

-- Configurar charset de la base de datos
ALTER DATABASE vital_app_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- =====================================================
-- PASO 1: CREACIÓN DE TABLAS
-- =====================================================

-- Tabla: categories
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: intensities
CREATE TABLE IF NOT EXISTS intensities (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    level INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: exercise_types
CREATE TABLE IF NOT EXISTS exercise_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    location_type VARCHAR(20) DEFAULT 'HOME',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: exercises
CREATE TABLE IF NOT EXISTS exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    instructions TEXT,
    duration_seconds INTEGER,
    repetitions INTEGER,
    sets INTEGER DEFAULT 1,
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    image_url VARCHAR(500),
    category_id BIGINT,
    intensity_id BIGINT,
    exercise_type_id BIGINT,
    benefits TEXT,
    safety_tips TEXT,
    modifications TEXT,
    location_type VARCHAR(20) DEFAULT 'HOME',
    is_active BOOLEAN DEFAULT TRUE,
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (intensity_id) REFERENCES intensities(id) ON DELETE SET NULL,
    FOREIGN KEY (exercise_type_id) REFERENCES exercise_types(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_intensity (intensity_id),
    INDEX idx_exercise_type (exercise_type_id),
    INDEX idx_location (location_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: routines
CREATE TABLE IF NOT EXISTS routines (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    duration_minutes INTEGER,
    category_id BIGINT,
    intensity_id BIGINT,
    video_url VARCHAR(500),
    thumbnail_url VARCHAR(500),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (intensity_id) REFERENCES intensities(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_intensity (intensity_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: routine_exercises (relación muchos a muchos)
CREATE TABLE IF NOT EXISTS routine_exercises (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    routine_id BIGINT NOT NULL,
    exercise_id BIGINT NOT NULL,
    exercise_order INTEGER DEFAULT 0,
    duration_seconds INTEGER,
    repetitions INTEGER,
    sets INTEGER,
    rest_seconds INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE,
    INDEX idx_routine (routine_id),
    INDEX idx_exercise (exercise_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: users
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    name VARCHAR(255),
    age INTEGER,
    phone VARCHAR(20),
    provider VARCHAR(50) DEFAULT 'LOCAL',
    provider_id VARCHAR(255),
    image_url VARCHAR(500),
    email_verified BOOLEAN DEFAULT FALSE,
    is_enabled BOOLEAN DEFAULT TRUE,
    is_account_non_expired BOOLEAN DEFAULT TRUE,
    is_account_non_locked BOOLEAN DEFAULT TRUE,
    is_credentials_non_expired BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_provider (provider, provider_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: persons
CREATE TABLE IF NOT EXISTS persons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: subscription_plans
CREATE TABLE IF NOT EXISTS subscription_plans (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    duration_months INTEGER NOT NULL,
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: user_subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_id BIGINT NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES subscription_plans(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_plan (plan_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla: activity_logs
CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    exercise_id BIGINT,
    routine_id BIGINT,
    duration_minutes INTEGER,
    calories_burned DECIMAL(10,2),
    activity_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE SET NULL,
    FOREIGN KEY (routine_id) REFERENCES routines(id) ON DELETE SET NULL,
    INDEX idx_user_date (user_id, activity_date),
    INDEX idx_activity_date (activity_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- PASO 2: INSERTAR DATOS SEED
-- =====================================================

-- =====================================================
-- 1. SUBSCRIPTION PLANS
-- =====================================================
INSERT INTO subscription_plans (name, description, price, duration_months, features, is_active) VALUES 
('Básico', 'Plan básico con ejercicios fundamentales para adultos mayores', 0.0, 12, '{"exercises": "basic", "routines": "limited", "support": "community"}', true),
('Premium', 'Plan premium con acceso completo a todos los ejercicios y funcionalidades', 29.99, 1, '{"exercises": "all", "routines": "unlimited", "support": "priority", "analytics": true, "personal_trainer": true}', true);

SELECT 'OK - Subscription plans insertados:' as status, COUNT(*) as cantidad FROM subscription_plans;

-- =====================================================
-- 2. CATEGORIES
-- =====================================================
INSERT INTO categories (name, description) VALUES 
('Fortalecimiento', 'Ejercicios para desarrollar y mantener la fuerza muscular'),
('Equilibrio', 'Ejercicios para mejorar la estabilidad y prevenir caídas'),
('Flexibilidad', 'Ejercicios para mantener y mejorar la movilidad articular'),
('Cardio', 'Ejercicios cardiovasculares de bajo impacto'),
('Movilidad', 'Ejercicios para mantener el rango de movimiento articular');

SELECT 'OK - Categorias insertadas:' as status, COUNT(*) as cantidad FROM categories;

-- =====================================================
-- 3. INTENSITIES
-- =====================================================
INSERT INTO intensities (name, level, description) VALUES 
('Suave', 1, 'Ideal para principiantes y personas con movilidad limitada'),
('Moderado', 2, 'Para personas con experiencia en ejercicio regular'),
('Intermedio', 3, 'Requiere fuerza y resistencia moderada');

SELECT 'OK - Intensidades insertadas:' as status, COUNT(*) as cantidad FROM intensities;

-- =====================================================
-- 4. EXERCISE TYPES
-- =====================================================
INSERT INTO exercise_types (name, description, location_type) VALUES 
('Ejercicio Sentado', 'Ejercicios que se realizan desde una silla', 'HOME'),
('Ejercicio de Pie', 'Ejercicios que se realizan de pie con apoyo', 'HOME'),
('Con Implementos', 'Ejercicios que requieren bandas elásticas o pesas', 'HOME'),
('Funcional', 'Ejercicios que simulan movimientos de la vida diaria', 'HOME'),
('Resistencia', 'Ejercicios que mejoran la resistencia muscular', 'HOME');

SELECT 'OK - Tipos de ejercicio insertados:' as status, COUNT(*) as cantidad FROM exercise_types;

-- =====================================================
-- 5. EXERCISES
-- =====================================================

-- FORTALECIMIENTO - SUAVE
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES
-- 1. Abductores
('Abductores', 
'Ejercicio para fortalecer los músculos abductores de la cadera, esenciales para la estabilidad pélvica.',
'Sentado en una silla, coloque las manos en las rodillas. Separe las piernas contra la resistencia de sus manos. Mantenga 3 segundos y relaje.',
'Fortalece músculos de cadera, mejora estabilidad pélvica, previene caídas',
'Mantenga la espalda recta. No fuerce el movimiento. Respire normalmente.',
'Puede usar una banda elástica entre las rodillas para mayor resistencia.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'https://drive.google.com/file/d/1J6sxowcvmAJxo1A8S6aooPnm8S-fm05H/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1-oTnwJF2sEVjxM5igJFVfPuNsN0OTnPT'),

-- 2. Extensión de Cuadríceps  
('Extensión de Cuadríceps',
'Ejercicio sentado para fortalecer los músculos cuádriceps, fundamentales para levantarse y caminar.',
'Sentado en una silla, extienda lentamente una pierna hasta que esté recta. Mantenga 3 segundos y baje lentamente. Alterne piernas.',
'Fortalece cuádriceps, mejora capacidad para levantarse, estabiliza rodillas',
'Movimientos lentos y controlados. No bloquee completamente la rodilla.',
'Agregue peso en el tobillo para mayor dificultad.',
NULL, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'https://drive.google.com/file/d/1AC--CGD0trWIbbEmBodSzYuD2mGJABAO/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1Sr0WC4sOy1SWIEd3GoeAFwbrod5q4ZaZ');

-- CARDIO - SUAVE
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES
-- 3. Puñetazos al Aire
('Puñetazos al Aire',
'Ejercicio cardiovascular suave que combina coordinación y fortalecimiento de brazos.',
'De pie o sentado, alterne puñetazos hacia adelante con cada brazo. Mantenga movimientos controlados y rítmicos.',
'Mejora coordinación, fortalece brazos y core, ejercicio cardiovascular suave',
'Evite movimientos bruscos. Mantenga los hombros relajados.',
'Puede realizarse sentado para mayor estabilidad.',
180, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Cardio'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/1qy7qToU3n44lJT2IJT-lBfEW_rKoQ7gA/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=13kLNkQ7jjm2_-Jp_w5-Bmu4qMPVSI3QT');

-- EQUILIBRIO - MODERADO
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES
-- 4. Equilibrio sobre un Pie
('Equilibrio sobre un Pie',
'Ejercicio fundamental para mejorar el equilibrio y prevenir caídas.',
'De pie cerca de una silla para apoyo, levante un pie del suelo y mantenga el equilibrio. Comience con 10 segundos y aumente gradualmente.',
'Mejora equilibrio, fortalece músculos estabilizadores, previene caídas',
'Mantenga siempre una silla cerca para apoyo. Comience con tiempos cortos.',
'Apoye un dedo en la silla si es necesario. Cierre los ojos para mayor dificultad.',
30, NULL, 3, false, true,
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/1yPI4qOE-WOLTTGpzp9tam7Am6z6Sp-EG/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1Pu077sE3QL22e1MX-SITjVQ2MGT5LdOp'),

-- 5. Caminar Talón-Punta
('Caminar Talón-Punta',
'Ejercicio de equilibrio dinámico que mejora la coordinación y estabilidad.',
'Camine en línea recta colocando el talón de un pie directamente frente a los dedos del otro pie. Use los brazos para equilibrarse.',
'Mejora equilibrio dinámico, coordinación, confianza al caminar',
'Realice cerca de una pared para apoyo. Vaya lentamente.',
'Puede separar ligeramente los pies si es muy difícil.',
240, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Equilibrio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/1hUHxF3iDZ_2jGViFT3H6cqlaLS7SwkJ1/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=13cX7egRaeK9zeewbs7SA_3Y1uIDuj_Nx');

-- MOVILIDAD - SUAVE
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES
-- 6. Rotación de Cuello
('Rotación de Cuello',
'Ejercicio suave de movilidad para el cuello que reduce tensión y mejora rango de movimiento.',
'Sentado con espalda recta, gire lentamente la cabeza hacia un lado, regrese al centro, luego al otro lado. Movimientos suaves y controlados.',
'Alivia tensión cervical, mejora movilidad del cuello, reduce rigidez',
'Movimientos lentos. Nunca forzar. Detenerse si hay mareo.',
'Reducir rango de movimiento si hay molestia.',
180, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'https://drive.google.com/file/d/1SH_qLOr5jaFQyiUTCY1-FjNcN5TmSS_x/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1uarQnmcFWA09fLSWxHXVOlJmyvZBXxsJ'),

-- 7. Círculos de Tobillo
('Círculos de Tobillo',
'Ejercicio de movilidad para mejorar la flexibilidad y circulación en los tobillos.',
'Sentado, levante un pie del suelo. Realice círculos con el tobillo en sentido horario, luego antihorario. Cambie de pie.',
'Mejora movilidad del tobillo, reduce rigidez, estimula circulación',
'Movimientos suaves y controlados, no forzar el rango de movimiento.',
'Reducir tamaño de los círculos, hacer más despacio.',
180, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'https://drive.google.com/file/d/1Pu077sE3QL22e1MX-SITjVQ2MGT5LdOp/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=11vETSPFrcfHyHE8FpmXtU7eAT6gNGF01'),

-- 8. Elevación de Brazos y Hombros
('Elevación de Brazos y Hombros',
'Ejercicio para mantener movilidad y fuerza en hombros y brazos.',
'Levante ambos brazos hacia adelante, continúe hasta arriba de la cabeza si es posible. Baje lentamente. Respire profundamente.',
'Mejora movilidad de hombros, mantiene rango de movimiento, alivia tensión',
'No forzar si hay dolor, mantener hombros relajados.',
'Elevar solo hasta donde sea cómodo, alternar brazos.',
240, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/1yvNBjUb0zZ3VM1bu6ERSRNF0j05gkj2k/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1AC--CGD0trWIbbEmBodSzYuD2mGJABAO'),

-- 9. Rotación de Hombros (Falta el video)
('Rotación de Hombros',
'Ejercicio de movilidad que reduce tensión en hombros y mejora postura.',
'De pie o sentado, realice círculos con los hombros hacia atrás, luego hacia adelante. Mantenga movimientos amplios y controlados.',
'Alivia tensión de hombros, mejora postura, aumenta movilidad',
'Movimientos lentos y amplios. Mantener cuello relajado.',
'Reducir tamaño de círculos si hay molestia.',
180, 10, 2, false, true,
(SELECT id FROM categories WHERE name = 'Movilidad'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/14J9030mEBfAXSMpQvNHsV9GC3FdbTo-q/preview',
'https://drive.google.com/uc?export=view&id=14J9030mEBfAXSMpQvNHsV9GC3FdbTo-q');

-- FORTALECIMIENTO - MODERADO
INSERT INTO exercises (
    name, description, instructions, benefits, safety_tips, modifications,
    duration_seconds, repetitions, sets, is_premium, is_active,
    category_id, intensity_id, exercise_type_id, 
    video_url, image_url
) VALUES
-- 10. Elevación de Rodilla (Sentado)
('Elevación de Rodilla (Sentado)',
'Ejercicio para fortalecer músculos abdominales y flexores de cadera desde posición sentada.',
'Siéntese en el borde de una silla. Agarre los lados. Levante una rodilla hacia el pecho. Baje sin tocar el suelo. Alterne piernas.',
'Fortalece abdomen y flexores de cadera, mejora control del core',
'Silla estable, mantener espalda erguida, no balancearse.',
'Reducir altura de elevación, aumentar tiempo de descanso.',
NULL, 8, 2, false, true,
(SELECT id FROM categories WHERE name = 'Fortalecimiento'),
(SELECT id FROM intensities WHERE name = 'Suave'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio Sentado'),
'https://drive.google.com/file/d/1_RT3mZ4cLctx1JLk6L_bYwUorCvy7Lih/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=15v3Px30RI9g-1jnElGXg24eKaB4u-6_v'),

-- 11. Marcha en el Sitio
('Marcha en el Sitio',
'Ejercicio cardiovascular suave que mejora coordinación y resistencia.',
'De pie con apoyo de silla si es necesario, levante rodillas alternadamente como si caminara en el mismo lugar. Mantenga ritmo constante.',
'Mejora resistencia cardiovascular, coordinación, fortalece piernas',
'Mantener postura erguida. Usar silla para apoyo si es necesario.',
'Reducir altura de rodillas, ir más despacio.',
300, NULL, NULL, false, true,
(SELECT id FROM categories WHERE name = 'Cardio'),
(SELECT id FROM intensities WHERE name = 'Moderado'),
(SELECT id FROM exercise_types WHERE name = 'Ejercicio de Pie'),
'https://drive.google.com/file/d/1IRb5e6PHvtQj6cxkieeuGE-u_ehkNX5A/view?usp=drive_link',
'https://drive.google.com/uc?export=view&id=1h784l-aYYANrX02al64zGZPjL5DM_mVb');

SELECT 'OK - Ejercicios insertados:' as status, COUNT(*) as cantidad FROM exercises;

-- =====================================================
-- 6. ROUTINES
-- =====================================================

-- RUTINA 1: Calentamiento y Movilidad Matutina
INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id) 
VALUES (
    'Calentamiento y Movilidad Matutina',
    'Rutina suave de calentamiento perfecta para comenzar el día. Incluye ejercicios de movilidad articular y estiramientos suaves que preparan el cuerpo para las actividades diarias.',
    15,
    false,
    (SELECT id FROM categories WHERE name = 'Flexibilidad'),
    (SELECT id FROM intensities WHERE name = 'Suave')
);

-- RUTINA 2: Fortalecimiento Suave en Casa
INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id)
VALUES (
    'Fortalecimiento Suave en Casa',
    'Rutina de fortalecimiento diseñada para adultos mayores. Ejercicios seguros y efectivos que se pueden realizar en casa con una silla como apoyo principal.',
    20,
    false,
    (SELECT id FROM categories WHERE name = 'Fortalecimiento'),
    (SELECT id FROM intensities WHERE name = 'Suave')
);

-- RUTINA 3: Equilibrio y Coordinación
INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id)
VALUES (
    'Equilibrio y Coordinación',
    'Rutina especializada en mejorar el equilibrio y la coordinación. Esencial para prevenir caídas y mantener la independencia en las actividades diarias.',
    18,
    false,
    (SELECT id FROM categories WHERE name = 'Equilibrio'),
    (SELECT id FROM intensities WHERE name = 'Moderado')
);

-- RUTINA 4: Cardio Activo y Suave
INSERT INTO routines (title, description, duration_minutes, is_premium, category_id, intensity_id)
VALUES (
    'Cardio Activo y Suave',
    'Rutina cardiovascular de bajo impacto diseñada para mejorar la resistencia y energía. Ejercicios dinámicos pero seguros para el sistema cardiovascular.',
    25,
    false,
    (SELECT id FROM categories WHERE name = 'Cardio'),
    (SELECT id FROM intensities WHERE name = 'Moderado')
);

SELECT 'OK - Rutinas insertadas:' as status, COUNT(*) as cantidad FROM routines;

-- =====================================================
-- 7. ROUTINE_EXERCISES (RELACIONES)
-- =====================================================

-- RUTINA 1: Calentamiento y Movilidad Matutina (5 ejercicios)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds) 
VALUES
((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Rotación de Cuello'), 1, 180, 30),
((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Círculos de Tobillo'), 2, 180, 30),
((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Elevación de Brazos y Hombros'), 3, 240, 30),
((SELECT id FROM routines WHERE title = 'Calentamiento y Movilidad Matutina'), 
 (SELECT id FROM exercises WHERE name = 'Rotación de Hombros'), 4, 180, 0);

-- RUTINA 2: Fortalecimiento Suave en Casa (5 ejercicios)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, sets, repetitions, rest_seconds)
VALUES
((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Abductores'), 1, 2, 10, 60),
((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Extensión de Cuadríceps'), 2, 2, 10, 60),
((SELECT id FROM routines WHERE title = 'Fortalecimiento Suave en Casa'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 3, 2, 8, 0);

-- RUTINA 3: Equilibrio y Coordinación (4 ejercicios)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)
VALUES
((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Caminar Talón-Punta'), 1, 240, 60),
((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Equilibrio sobre un Pie'), 2, 90, 60),
((SELECT id FROM routines WHERE title = 'Equilibrio y Coordinación'),
 (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 3, 180, 0);

-- RUTINA 4: Cardio Activo y Suave (4 ejercicios)
INSERT INTO routine_exercises (routine_id, exercise_id, exercise_order, duration_seconds, rest_seconds)
VALUES
((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Marcha en el Sitio'), 1, 300, 60),
((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Puñetazos al Aire'), 2, 300, 60),
((SELECT id FROM routines WHERE title = 'Cardio Activo y Suave'),
 (SELECT id FROM exercises WHERE name = 'Elevación de Rodilla (Sentado)'), 3, 180, 0);

SELECT 'OK - Relaciones rutina-ejercicio insertadas:' as status, COUNT(*) as cantidad FROM routine_exercises;

-- =====================================================
-- VERIFICACIÓN FINAL
-- =====================================================

SELECT '========================================' as `separador`;
SELECT 'RESUMEN FINAL DE DATOS CARGADOS' as titulo;
SELECT '========================================' as `separador`;

SELECT 'Categorias:' as tabla, COUNT(*) as registros FROM categories
UNION ALL
SELECT 'Intensidades:' as tabla, COUNT(*) as registros FROM intensities
UNION ALL
SELECT 'Tipos de Ejercicio:' as tabla, COUNT(*) as registros FROM exercise_types
UNION ALL
SELECT 'Ejercicios:' as tabla, COUNT(*) as registros FROM exercises
UNION ALL
SELECT 'Rutinas:' as tabla, COUNT(*) as registros FROM routines
UNION ALL
SELECT 'Relaciones Rutina-Ejercicio:' as tabla, COUNT(*) as registros FROM routine_exercises;

SELECT '========================================' as `separador`;
SELECT 'DATOS CARGADOS EXITOSAMENTE' as resultado;
SELECT '========================================' as `separador`;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
