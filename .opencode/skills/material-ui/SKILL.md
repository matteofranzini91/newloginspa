---
name: material-ui
description: Expert guidance for Material UI component selection, customization, and best practices
license: MIT
compatibility: opencode
metadata:
  audience: developers
  framework: react
---

## When to use me

Use this skill when working with React projects that use Material UI. Ask me about:
- Choosing the right MUI component
- Component props and API
- Theming and customization
- Migration between versions
- Best practices and common patterns

## Documentation Index

Use this index to find the right documentation:

### Getting Started
- Installation: https://mui.com/material-ui/getting-started/installation.md
- Usage: https://mui.com/material-ui/getting-started/usage.md
- FAQ: https://mui.com/material-ui/getting-started/faq.md

### Core Components
- Button: https://mui.com/material-ui/react-button.md
- TextField: https://mui.com/material-ui/react-text-field.md
- AppBar: https://mui.com/material-ui/react-app-bar.md
- Card: https://mui.com/material-ui/react-card.md
- Dialog: https://mui.com/material-ui/react-dialog.md
- Drawer: https://mui.com/material-ui/react-drawer.md
- Grid: https://mui.com/material-ui/react-grid.md
- Table: https://mui.com/material-ui/react-table.md
- Tabs: https://mui.com/material-ui/react-tabs.md

### Feedback Components
- Alert: https://mui.com/material-ui/react-alert.md
- Snackbar: https://mui.com/material-ui/react-snackbar.md
- Progress: https://mui.com/material-ui/react-progress.md
- Skeleton: https://mui.com/material-ui/react-skeleton.md

### Input Components
- Checkbox: https://mui.com/material-ui/react-checkbox.md
- Radio: https://mui.com/material-ui/react-radio-button.md
- Select: https://mui.com/material-ui/react-select.md
- Autocomplete: https://mui.com/material-ui/react-autocomplete.md
- Slider: https://mui.com/material-ui/react-slider.md
- Switch: https://mui.com/material-ui/react-switch.md
- Rating: https://mui.com/material-ui/react-rating.md

### Layout Components
- Box: https://mui.com/material-ui/react-box.md
- Container: https://mui.com/material-ui/react-container.md
- Stack: https://mui.com/material-ui/react-stack.md
- Paper: https://mui.com/material-ui/react-paper.md
- Divider: https://mui.com/material-ui/react-divider.md

### Navigation Components
- Link: https://mui.com/material-ui/react-link.md
- Menu: https://mui.com/material-ui/react-menu.md
- Breadcrumbs: https://mui.com/material-ui/react-breadcrumbs.md
- Bottom Navigation: https://mui.com/material-ui/react-bottom-navigation.md

### MUI X Date and Time Pickers
- Overview: https://mui.com/x/react-date-pickers/
- Date Picker: https://mui.com/x/react-date-pickers/date-picker
- Date Picker API: https://mui.com/api/date-picker/
- Base Concepts: https://mui.com/x/react-date-pickers/base-concepts/

### Customization
- Theming: https://mui.com/material-ui/customization/theming.md
- Dark mode: https://mui.com/material-ui/customization/dark-mode.md
- Color: https://mui.com/material-ui/customization/color.md
- Typography: https://mui.com/material-ui/customization/typography.md
- How to customize: https://mui.com/material-ui/customization/how-to-customize.md

### Migration
- Upgrade to v9: https://mui.com/material-ui/migration/upgrade-to-v9.md
- Migration v4 to v5: https://mui.com/material-ui/migration/migration-v4.md

### Integrations
- Next.js: https://mui.com/material-ui/integrations/nextjs.md
- Routing: https://mui.com/material-ui/integrations/routing.md
- styled-components: https://mui.com/material-ui/integrations/styled-components.md

## How I work

1. When you ask about MUI, I will identify the right component
2. I'll fetch the relevant documentation using the URLs above
3. I'll provide working code examples with proper imports
4. I'll suggest theming options when applicable
5. For migrations, I'll provide step-by-step guides

## DatePicker (MUI X)

**Ubicación**: Paquete `@mui/x-date-pickers` (separado del core de MUI)

**Paquetes requeridos**:
```bash
npm install @mui/x-date-pickers
# Plus un adapter de fecha (dayjs, date-fns, luxon, o moment.js)
npm install dayjs
```

**Variantes disponibles**:
| Componente | Descripción |
|------------|-------------|
| `DatePicker` | Responsivo (auto-detecta desktop/mobile) |
| `DesktopDatePicker` | Mejor para mouse/escritorio (popover) |
| `MobileDatePicker` | Mejor para touch/móvil (modal) |
| `StaticDatePicker` | Sin popover/modal |

**Estructura básica**:
```tsx
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Selecciona fecha"
    value={value}
    onChange={(newValue) => setValue(newValue)}
  />
</LocalizationProvider>
```

**Props principales**:
- `value` / `defaultValue`: Fecha seleccionada
- `onChange`: Callback al cambiar fecha
- `disableFuture` / `disablePast`: Restringir fechas futuras/pasadas
- `minDate` / `maxDate`: Rango de fechas válido
- `views`: `['day', 'month', 'year']` - vistas habilitadas
- `openTo`: Vista inicial al abrir
- `format`: Formato de fecha personalizado
- `disabled` / `readOnly`: Estados deshabilitado/solo lectura
- `clearable`: Habilitar botón de limpiar
- `slotProps`: Personalizar componentes internos (field, popper, etc.)

**Notas**:
- Requiere `LocalizationProvider` con un adapter de fecha
- Para Date Range Pickers: usar `@mui/x-date-pickers-pro` (versión Pro)
- Compatible con múltiples librerías de fecha: dayjs, date-fns, luxon, moment.js