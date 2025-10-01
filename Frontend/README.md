# VitalApp Frontend MVP

Frontend accesible, responsive y simple para VitalApp.

## Requisitos
- Node.js 20+
- npm 9+

## Variables de entorno
Crea un archivo `.env` en la raíz con:

```
VITE_API_BASE=http://localhost:8080
```

## Instalación y uso

```sh
npm install
npm run dev
```

## Páginas y flujos
- **Home** (`/`): selector de nivel (Básico/Intermedio), lista de rutinas.
- **Detalle de rutina** (`/rutina/:id`): ejercicios y formulario para registrar minutos.
- **Resumen semanal** (`/resumen`): consulta de progreso por semana.

## Accesibilidad
- Texto grande, alto contraste opcional, foco visible, navegación por teclado.
- Controles ≥44px.
- `skip link` para saltar al contenido principal.

## Notas
- Si el backend no está corriendo, verás mensajes de error manejados.
- No se usan librerías pesadas extra (solo React, React Router, Tailwind).
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
