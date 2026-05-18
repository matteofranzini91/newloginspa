# newloginspa

Single Page Application (SPA) built with **React 19**, **TypeScript**, **Vite**, and **Material UI**. Demonstrates a complete authentication flow with i18n support and state management.

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 19.2.6 + TypeScript 6 |
| **Build** | Vite 8.0.11 |
| **UI Library** | Material UI v9 |
| **State Management** | Redux Toolkit 2.11.2 + RTK Query |
| **HTTP Client** | Axios 1.16.0 |
| **Routing** | React Router DOM 7.15.0 |
| **i18n** | i18next + react-i18next |
| **Testing** | Vitest 4.1.6 + Testing Library |
| **Linting** | ESLint + Prettier |
| **Pre-commit** | Husky + lint-staged |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CommonButton/
│   ├── FormBuilder/      # Dynamic form fields (text, email, password, date)
│   ├── FormFooter/
│   ├── LanguageSelector/
│   ├── LoginForm/
│   ├── Navbar/
│   ├── NewPasswordForm/
│   ├── PageLoader/
│   ├── RegisterForm/
│   ├── SubmitButton/
│   ├── TranslatedText/
│   └── UserCard/         # User profile display with skeleton
├── pages/
│   ├── Login/            # Login, Register, Forgot Password flows
│   └── Welcome/          # Protected page after authentication
├── layouts/
│   └── MainLayout.tsx    # App shell with Navbar
├── providers/            # Context providers
│   ├── AuthProvider/     # Authentication state management
│   ├── LanguageProvider/  # i18n context
│   └── NotificationsProvider/ # Toast notifications (notistack)
├── router/
│   ├── AppRouter.tsx     # Route definitions with lazy loading
│   ├── ProtectedRoute/   # Route guard for authenticated users
│   └── routes.ts         # Route constants
├── store/                # Redux Toolkit store
│   ├── api/              # RTK Query API slices (auth, user)
│   ├── hooks.ts          # Typed Redux hooks
│   └── store.ts          # Store configuration
├── services/
│   ├── auth/             # Auth API endpoints
│   ├── http/             # Axios interceptors & config
│   └── user/             # User API endpoints
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── models/               # TypeScript interfaces
├── constants/            # App constants
└── config/               # App configuration
```

---

## Features

- **Authentication Flow**: Login, Register, Password Recovery
- **Protected Routes**: Private pages require valid token
- **i18n Support**: Multi-language (ES, EN) with automatic detection
- **RTK Query**: Data fetching with caching, invalidation, and optimistic updates
- **Axios Interceptors**: Automatic token injection, error handling
- **Form Validation**: Dynamic field types with validation rules
- **Skeleton Loading**: Loading states for better UX
- **Toast Notifications**: User feedback via notistack

---

## Scripts

```bash
pnpm dev         # Start dev server (port 5173)
pnpm build       # Production build to ./build
pnpm test         # Run Vitest tests
pnpm test:watch   # Watch mode for tests
pnpm lint         # ESLint with auto-fix
pnpm format       # Prettier auto-format
pnpm json-server  # Mock API server (port 8090)
pnpm dev:all      # Run dev + mock API concurrently
```

---

## API Configuration

The mock API runs at `http://localhost:8090` with Vite proxy at `/api`:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/register` | POST | User registration |
| `/auth/forgot-password` | POST | Request password reset |
| `/auth/reset-password` | POST | Reset password with token |
| `/users` | GET | Get user profile |

---

## Architecture Highlights

### Redux Store Structure
```typescript
store/
├── api/          // RTK Query endpoints
│   ├── auth.api.ts   // Auth operations
│   └── user.api.ts   // User operations
├── hooks.ts      // useAppSelector, useAppDispatch
└── store.ts      // Central store config
```

### Protected Route Pattern
```typescript
// Ensures user is authenticated before accessing protected pages
<ProtectedRoute>
  <Welcome />
</ProtectedRoute>
```

### Axios Interceptors
```typescript
// - Injects Authorization header with JWT token
// - Handles 401 by clearing auth state
// - Global error notification via notistack
```

### Lazy Loading
```typescript
const Login = lazy(() => import('#Pages/Login/Login'));
// Routes are code-split for optimal bundle size
```

---

## Testing

- **Vitest** for unit testing with jsdom environment
- **@testing-library/react** for component testing
- **@testing-library/jest-dom** for assertions
- Tests colocated with components or in `src/__tests__/`

Run tests: `pnpm test`