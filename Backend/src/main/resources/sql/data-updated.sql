-- Script de datos iniciales para VitalApp con sistema de seguridad
-- Este script debe ejecutarse después de que Hibernate cree las tablas

-- Insertar planes de suscripción
INSERT INTO subscription_plans (name, description, price, duration_months, features, is_active, created_at) VALUES 
('Básico', 'Plan básico con ejercicios fundamentales para adultos mayores', 0.0, 12, '{"exercises": "basic", "routines": "limited", "support": "community"}', true, CURRENT_TIMESTAMP),
('Premium', 'Plan premium con acceso completo a todos los ejercicios y funcionalidades', 29.99, 1, '{"exercises": "all", "routines": "unlimited", "support": "priority", "analytics": true, "personal_trainer": true}', true, CURRENT_TIMESTAMP);

-- Insertar categorías
INSERT INTO categories (name, description) VALUES 
('Fortalece tu Equilibrio', 'Ejercicios diseñados para mejorar el equilibrio y la estabilidad corporal'),
('Articulaciones Felices', 'Rutinas enfocadas en la movilidad y salud articular'),
('Fuerza Funcional', 'Ejercicios para desarrollar fuerza aplicable a actividades diarias'),
('Corazón Contento', 'Ejercicios cardiovasculares de bajo impacto'),
('Tren Inferior', 'Ejercicios para fortalecer piernas y glúteos'),
('Tren Superior', 'Ejercicios para fortalecer brazos, hombros y espalda');

-- Insertar intensidades
INSERT INTO intensities (name, level) VALUES 
('Suave', 1),
('Moderado', 2),
('Intenso', 3);

-- Insertar tipos de ejercicios
INSERT INTO exercise_types (name, description, location_type, created_at) VALUES 
('Equilibrio', 'Ejercicios para mejorar el equilibrio y prevenir caídas', 'HOME', CURRENT_TIMESTAMP),
('Movilidad Articular', 'Ejercicios de flexibilidad y movilidad', 'HOME', CURRENT_TIMESTAMP),
('Cardio Bajo Impacto', 'Ejercicios cardiovasculares suaves', 'HOME', CURRENT_TIMESTAMP),
('Fuerza Funcional Casa', 'Ejercicios de fuerza que se pueden hacer en casa', 'HOME', CURRENT_TIMESTAMP),
('Máquinas de Gimnasio', 'Ejercicios con máquinas de gimnasio', 'GYM', CURRENT_TIMESTAMP),
('Cardio Gimnasio', 'Ejercicios cardiovasculares en gimnasio', 'GYM', CURRENT_TIMESTAMP);

-- Insertar usuarios de prueba (contraseñas: password123)
INSERT INTO users (username, email, password, name, age, phone, provider, is_enabled, is_account_non_expired, is_account_non_locked, is_credentials_non_expired, created_at) VALUES 
('admin', 'admin@vitalapp.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Administrador', 45, '+1234567890', 'LOCAL', true, true, true, true, CURRENT_TIMESTAMP),
('usuario_basico', 'basico@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Usuario Básico', 65, '+1234567891', 'LOCAL', true, true, true, true, CURRENT_TIMESTAMP),
('usuario_premium', 'premium@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'Usuario Premium', 70, '+1234567892', 'LOCAL', true, true, true, true, CURRENT_TIMESTAMP);

-- Asignar suscripciones a usuarios
INSERT INTO user_subscriptions (user_id, plan_id, start_date, end_date, status, created_at) VALUES 
(2, 1, CURRENT_TIMESTAMP, DATEADD('MONTH', 12, CURRENT_TIMESTAMP), 'ACTIVE', CURRENT_TIMESTAMP),
(3, 2, CURRENT_TIMESTAMP, DATEADD('MONTH', 1, CURRENT_TIMESTAMP), 'ACTIVE', CURRENT_TIMESTAMP);

-- Insertar rutinas de ejemplo
INSERT INTO routines (title, description, duration_minutes, video_url, thumbnail_url, category_id, intensity_id, is_premium, created_at) VALUES 
(
    'Equilibrio para Empezar el Día',
    'Una serie de ejercicios suaves diseñados para activar los músculos estabilizadores y mejorar la confianza al caminar.',
    15,
    'https://drive.google.com/file/d/1ABCD123/view?usp=sharing',
    'https://ejemplo.com/thumbnail1.jpg',
    1, -- Fortalece tu Equilibrio
    1, -- Suave
    false, -- Básico
    CURRENT_TIMESTAMP
),
(
    'Movilidad de Hombros Sentado',
    'Ejercicios de movilidad articular para hombros que se pueden realizar sentado, ideales para aliviar la tensión.',
    10,
    'https://drive.google.com/file/d/2EFGH456/view?usp=sharing',
    'https://ejemplo.com/thumbnail2.jpg',
    2, -- Articulaciones Felices
    1, -- Suave
    false, -- Básico
    CURRENT_TIMESTAMP
),
(
    'Cardio Suave en Casa',
    'Rutina cardiovascular de bajo impacto que se puede realizar en casa sin equipos.',
    20,
    'https://drive.google.com/file/d/3IJKL789/view?usp=sharing',
    'https://ejemplo.com/thumbnail3.jpg',
    4, -- Corazón Contento
    1, -- Suave
    false, -- Básico
    CURRENT_TIMESTAMP
),
(
    'Fuerza Funcional Avanzada Premium',
    'Rutina avanzada de fortalecimiento con análisis personal y seguimiento detallado.',
    25,
    'https://drive.google.com/file/d/4MNOP012/view?usp=sharing',
    'https://ejemplo.com/thumbnail4.jpg',
    3, -- Fuerza Funcional
    2, -- Moderado
    true, -- Premium
    CURRENT_TIMESTAMP
),
(
    'Rutina Completa Premium con Equipos',
    'Rutina completa con equipos especializados y seguimiento personalizado.',
    30,
    'https://drive.google.com/file/d/5QRST345/view?usp=sharing',
    'https://ejemplo.com/thumbnail5.jpg',
    3, -- Fuerza Funcional
    3, -- Intenso
    true, -- Premium
    CURRENT_TIMESTAMP
);

-- Insertar ejercicios de CASA - Categoría "Fortalece tu Equilibrio"
INSERT INTO exercises (name, description, instructions, safety_tips, modifications, benefits, duration_seconds, repetitions, sets, exercise_type_id, category_id, intensity_id, is_premium, is_active, created_at) VALUES 
(
    'Equilibrio sobre un Pie',
    'Ejercicio fundamental para mejorar la estabilidad y prevenir caídas.',
    'De pie, detrás de una silla, sujetándola con una o dos manos. Levantar lentamente un pie del suelo y mantener el equilibrio por 10-15 segundos. Cambiar de pie.',
    'Manténgase siempre cerca de una silla o pared para apoyo. Nunca intente este ejercicio sin apoyo disponible.',
    'Levantar el pie solo unos centímetros del suelo si es principiante.',
    'Mejora la estabilidad, fortalece los músculos del core y previene caídas.',
    15, 1, 3, 1, 1, 1, false, true, CURRENT_TIMESTAMP
),
(
    'Caminar Talón-Punta',
    'Ejercicio de equilibrio dinámico que simula caminar por una línea.',
    'De pie, cerca de una pared para apoyarse. Dar un paso hacia adelante colocando el talón de un pie justo delante de los dedos del otro pie.',
    'Mantenga siempre una mano cerca de la pared para apoyo inmediato.',
    'Hacerlo con una mano siempre apoyada en la pared.',
    'Mejora el equilibrio dinámico y la coordinación para caminar.',
    30, 10, 2, 1, 1, 1, false, true, CURRENT_TIMESTAMP
),
(
    'Equilibrio Avanzado Premium',
    'Ejercicios de equilibrio avanzados con análisis biomecánico y corrección personalizada.',
    'Ejercicios de equilibrio dinámico con seguimiento de progreso y análisis personalizado.',
    'Requiere supervisión virtual premium y monitoreo en tiempo real.',
    'Adaptaciones personalizadas según análisis biomecánico.',
    'Mejora significativa del equilibrio con seguimiento científico.',
    45, 1, 3, 1, 1, 2, true, true, CURRENT_TIMESTAMP
);

-- Insertar ejercicios de GIMNASIO - Premium
INSERT INTO exercises (name, description, instructions, safety_tips, modifications, benefits, duration_seconds, repetitions, sets, exercise_type_id, category_id, intensity_id, is_premium, is_active, created_at) VALUES 
(
    'Máquina de Prensa Premium con Análisis',
    'Entrenamiento con máquina de prensa incluyendo análisis biomecánico y plan personalizado.',
    'Uso de máquina de prensa con sensores de fuerza y análisis en tiempo real de la técnica.',
    'Supervisión virtual premium con alertas de seguridad automáticas.',
    'Ajustes automáticos según el análisis biomecánico personal.',
    'Fortalecimiento óptimo con prevención de lesiones mediante tecnología avanzada.',
    180, 12, 3, 5, 5, 2, true, true, CURRENT_TIMESTAMP
),
(
    'Rutina Cardiovascular Premium',
    'Programa cardiovascular personalizado con monitoreo cardíaco.',
    'Entrenamiento cardiovascular con monitoreo de frecuencia cardíaca y ajuste automático.',
    'Monitoreo cardíaco continuo con alertas automáticas.',
    'Intensidad ajustada automáticamente según la respuesta cardíaca.',
    'Optimización cardiovascular segura con tecnología de monitoreo avanzada.',
    1200, 1, 1, 6, 4, 2, true, true, CURRENT_TIMESTAMP
);

-- Insertar algunos logs de actividad de prueba
INSERT INTO user_activity_log (user_id, activity_type, related_entity_id, completed_at) VALUES 
(2, 'ROUTINE_COMPLETED', 1, DATEADD('DAY', -1, CURRENT_TIMESTAMP)),
(2, 'ROUTINE_COMPLETED', 2, DATEADD('HOUR', -2, CURRENT_TIMESTAMP)),
(3, 'ROUTINE_COMPLETED', 1, DATEADD('DAY', -3, CURRENT_TIMESTAMP)),
(3, 'ROUTINE_COMPLETED', 4, DATEADD('HOUR', -1, CURRENT_TIMESTAMP)),
(3, 'ROUTINE_COMPLETED', 5, DATEADD('MINUTE', -30, CURRENT_TIMESTAMP));
