# Guía para Conversión de CSS a SASS

## Pasos a seguir para convertir cada archivo CSS a SCSS

Para cada componente que tenga un archivo CSS asociado, sigue estos pasos:

1. **Crear archivo SCSS**: Crea un nuevo archivo con la misma ruta pero cambiando la extensión `.css` por `.scss`
2. **Importar abstracts**: Al inicio de cada archivo SCSS, añade las importaciones:

```scss
@import '../../styles/abstracts/variables';
@import '../../styles/abstracts/mixins';
```

3. **Convertir estilos usando variables y mixins**:
   - Reemplaza colores hardcodeados con variables (ej: `#e2e8f0` → `$color-text`)
   - Reemplaza valores repetidos de margin/padding con variables de espaciado (ej: `1rem` → `$spacing-base`)
   - Usa los mixins para patrones comunes (ej: `display: flex; flex-direction: column;` → `@include flex-column;`)
   - Implementa anidación SASS para reducir repetición (ej: `.class-name {} .class-name-item {}` → `.class-name { &-item {} }`)

4. **Actualizar importaciones en componentes**: En cada archivo de componente `.tsx`, actualiza la importación de CSS a SCSS:

```diff
- import './ComponentName.css';
+ import './ComponentName.scss';
```

## Archivos para convertir

Aquí está la lista de archivos CSS que necesitan ser convertidos a SCSS:

### Layout
- ✅ src/components/layout/Sidebar.css → src/components/layout/Sidebar.scss
- ✅ src/components/layout/Navbar.css → src/components/layout/Navbar.scss

### Events
- ✅ src/components/events/EventList.css → src/components/events/EventList.scss
- src/components/events/EventCard.css → src/components/events/EventCard.scss
- src/components/events/EventForm.css → src/components/events/EventForm.scss
- src/components/events/EventTableView.css → src/components/events/EventTableView.scss
- src/components/events/EventDetailView.css → src/components/events/EventDetailView.scss
- src/components/events/SavedEventsView.css → src/components/events/SavedEventsView.scss
- src/components/events/DraftsView.css → src/components/events/DraftsView.scss

### Dashboard
- src/components/dashboard/Dashboard.css → src/components/dashboard/Dashboard.scss

### Calendar
- src/components/calendar/CalendarView.css → src/components/calendar/CalendarView.scss
- src/components/calendar/CalendarEventCard.css → src/components/calendar/CalendarEventCard.scss

## Archivos globales
- ✅ src/App.css → src/styles/App.scss
- ✅ src/index.css → src/styles/main.scss

## Proceso de refactorización

1. Para cada archivo CSS, sigue el patrón establecido en los archivos ya convertidos
2. Usa las variables definidas en `_variables.scss` para reemplazar valores hardcodeados
3. Aplica los mixins de `_mixins.scss` para patrones repetitivos
4. Implementa anidación SASS para mejorar la legibilidad y manteniblidad
5. Actualiza las importaciones en los archivos de componentes

## Ejemplo de conversión

**Antes (CSS):**
```css
.component-container {
  display: flex;
  flex-direction: column;
  background-color: #1e293b;
  padding: 1rem;
}

.component-title {
  color: #e2e8f0;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

@media (min-width: 768px) {
  .component-container {
    padding: 1.5rem;
  }
}
```

**Después (SCSS):**
```scss
@import '../../styles/abstracts/variables';
@import '../../styles/abstracts/mixins';

.component {
  &-container {
    @include flex-column;
    background-color: $color-bg-secondary;
    padding: $spacing-base;
    
    @include screen-md {
      padding: $spacing-lg;
    }
  }
  
  &-title {
    color: $color-text;
    font-size: $font-size-xl;
    margin-bottom: $spacing-sm;
  }
}
``` 