erDiagram
    users {
        bigint id PK "ID de Usuario"
        varchar full_name "Nombre Completo"
        varchar email UK "Correo Electrónico (único)"
        varchar password "Contraseña (cifrada)"
        varchar profile_picture_url "URL de Foto de Perfil"
        timestamp created_at "Fecha de Creación"
    }

    routines {
        bigint id PK "ID de Rutina"
        varchar title "Título"
        text description "Descripción"
        int duration_minutes "Duración en Minutos"
        enum intensity "Intensidad (SUAVE, MODERADO)"
        enum category "Categoría (EJ: CORAZON_CONTENTO)"
        varchar video_url "URL del Video"
    }

    clubs {
        bigint id PK "ID del Club"
        varchar name "Nombre del Club"
        text description "Descripción"
        varchar cover_image_url "URL Imagen de Portada"
    }

    events {
        bigint id PK "ID del Evento"
        varchar title "Título del Evento"
        text description "Descripción"
        datetime event_datetime "Fecha y Hora del Evento"
        bigint club_id FK "Club que organiza"
        bigint wellness_point_id FK "Lugar del evento"
        bigint created_by_user_id FK "Usuario creador"
    }

    wellness_points {
        bigint id PK "ID del Punto de Bienestar"
        varchar name "Nombre del Lugar"
        text description "Descripción"
        decimal latitude "Latitud"
        decimal longitude "Longitud"
        enum type "Tipo (PARQUE, RUTA_SEGURA)"
        json amenities "Comodidades (bancas, baños, etc.)"
    }

    club_members {
        bigint user_id FK "ID de Usuario"
        bigint club_id FK "ID de Club"
        timestamp joined_at "Fecha de Unión"
    }

    favorite_routines {
        bigint user_id FK "ID de Usuario"
        bigint routine_id FK "ID de Rutina"
        timestamp favorited_at "Fecha en que se marcó como favorita"
    }

    event_attendees {
        bigint user_id FK "ID de Usuario"
        bigint event_id FK "ID de Evento"
        timestamp registered_at "Fecha de Registro"
    }

    users ||--o{ favorite_routines : "tiene"
    routines ||--o{ favorite_routines : "es"
    users ||--o{ club_members : "es_miembro_de"
    clubs ||--o{ club_members : "tiene"
    users ||--o{ event_attendees : "asiste_a"
    events ||--o{ event_attendees : "tiene"
    clubs ||--o{ events : "organiza"
    users ||--o{ events : "crea"
    wellness_points ||--o{ events : "ocurre_en"
    