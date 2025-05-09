# Parchify - App de Eventos por Estado de Ánimo

Parchify es una aplicación para descubrir eventos según tu estado de ánimo, permitiéndote organizar, guardar y compartir tus planes. 

## Características principales

- Descubre eventos filtrados por mood (estado de ánimo)
- Guarda tus eventos favoritos
- Visualiza eventos en modo calendario
- Guarda borradores de eventos para completar después
- Añade y administra tus propios moods personalizados

## Estructura del proyecto

El proyecto sigue una arquitectura modular basada en componentes, con una clara separación de responsabilidades:

```
src/
├── assets/        # Recursos estáticos (imágenes, iconos, etc.)
├── components/    # Componentes reutilizables
│   ├── calendar/  # Componentes específicos del calendario
│   ├── dashboard/ # Componentes del dashboard (moods)
│   ├── events/    # Componentes relacionados con eventos
│   └── layout/    # Componentes de estructura (navbar, sidebar)
├── constants/     # Constantes y configuración
├── pages/         # Páginas o vistas principales
│   ├── CalendarPage/
│   ├── Dashboard/
│   ├── DraftsPage/
│   ├── EventFormPage/
│   ├── EventsPage/
│   └── SavedEventsPage/
├── styles/        # Estilos globales y variables
│   └── abstracts/ # Variables y mixins SCSS
├── types/         # Definiciones de tipos TypeScript
├── App.tsx        # Componente principal
└── main.tsx       # Punto de entrada
```

## Convenciones de código

- **Componentes**: Cada componente tiene su propio archivo `.tsx` y archivos `.scss` asociados
- **Páginas**: Cada página encapsula uno o más componentes y maneja la lógica específica de esa vista
- **Tipos**: Definiciones de TypeScript centralizadas en la carpeta `types`
- **Estilos**: Utilizamos SCSS con variables y mixins centralizados

## Desarrollo

### Requisitos

- Node.js v16.0 o superior
- npm v8.0 o superior

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/BrianCodos/ParchifyUpdated.git

# Instalar dependencias
cd parchify
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm run lint`: Verifica errores de linting
- `npm run organize`: Ejecuta el script de organización y limpieza del proyecto

## Licencia

Este proyecto es propiedad de Parchify 2024.
