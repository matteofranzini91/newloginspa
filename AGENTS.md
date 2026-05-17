# AGENTS.md

## Commands

```bash
pnpm dev              # Dev server at http://localhost:5173
pnpm build           # Production build to ./build
pnpm test            # Run Vitest (jsdom)
pnpm test:watch      # Watch mode
pnpm lint            # ESLint --fix
pnpm lint:verify     # ESLint check-only
pnpm format          # Prettier write
pnpm format:verify   # Prettier check-only
pnpm json-server     # Mock API at http://localhost:8090
```

## Path Aliases

Use `#` prefix for imports (defined in tsconfig.paths.json):
- `#Components/*` → `./src/components/*`
- `#Pages/*` → `./src/pages/*`
- `#Services/*` → `./src/services/*`
- `#Store/*` → `./src/store/*`
- `#Hooks/*`, `#Layouts/*`, `#Utils/*`, `#Config/*`, `#Models/*`, `#Router/*`, `#Providers/*`, `#Assets/*`

## Non-Standard Locations

- Vite config: `config/vite/vite.config.ts` (not root)
- Vitest setup: `config/vite/vitest-setup.ts`
- Env files: `env/.env.dev`, `env/.env.prod`

## Dev Server

- Port: 5173
- API proxy: `/api` → `http://localhost:8090` (json-server default)
- BASENAME: `/`

## Testing

- Framework: Vitest with jsdom
- Setup includes: `@testing-library/jest-dom`, localStorage/sessionStorage mocks, matchMedia mock
- Test files should be colocated or in `src/__tests__/`

## Pre-commit

Husky runs `lint-staged` which auto-fixes and formats staged `.js, .jsx, .ts, .tsx` files before commit.

## Build Output

- Output directory: `./build` (not `./dist`)
- Mode flag: `--mode prod` for production

## Project Skills

This project includes the following skills that agents should use when working on specific technologies:

- **Material UI**: Component selection, theming, and best practices (`skill:material-ui`)
- **React Best Practices**: Performance optimization guidelines (`skill:vercel-react-best-practices`)
- **Web Design Guidelines**: UI/UX compliance checking (`skill:web-design-guidelines`)
- **React Router**: Routing patterns and navigation (`skill:react-router`)
- **Redux Toolkit**: State management patterns (`skill:redux-toolkit`)
- **Frontend Design**: Design system implementation (`skill:frontend-design`)

## Code Standards

All code must follow these standards:

### TypeScript Rules

- **Never use the `any` type** - Always use proper TypeScript types. If a type is unknown, create a specific interface or use `unknown` with proper type narrowing.
- Enable `strict` mode in TypeScript configuration
- Prefer explicit types over implicit inference for function parameters and return types
- Use type guards for runtime type checking when needed

### Component Folder Structure

When creating a new component, use the following folder structure:

```
components/
  └── ComponentName/
      ├── ComponentName.tsx        # Main component (required)
      ├── ComponentName.utils.ts   # Local utility functions (optional)
      ├── ComponentName.styles.ts  # Local styles (optional)
      ├── ComponentName.model.ts   # Local type definitions (optional)
      ├── hooks/                    # Local hooks (optional)
      │   └── useComponentName.ts
      ├── provider/                 # Local context providers (optional)
      │   └── ComponentNameContext.tsx
      └── components/               # Local subcomponents (optional)
          └── SubComponent.tsx
```

- Create `.utils.ts` files only if the component needs local utility functions that cannot be shared globally
- Create `.styles.ts` files only if the component needs local styles that cannot be part of the theme
- Create `.model.ts` files only if the component needs local type definitions that cannot be reused
- If a utility function can be used globally, place it in the `#Utils/*` directory
- If styles belong to the theme, define them in `theme.ts` (MaterialUI)

### Styling Guidelines

- **Never use inline styles** (`style={{ ... }}`) in JSX
- Global styles should be defined in the theme configuration (e.g., MaterialUI theme.ts)
- Component-specific styles should be in `.styles.ts` files using the project's styling solution (styled-components, CSS modules, etc.)
- Use theme tokens and design tokens for colors, spacing, typography
- Prefer composition over duplication

### Code Quality

- Keep code clean, clear, and easy to read
- Use meaningful variable and function names
- Keep functions small and focused on a single responsibility
- Add proper comments only when the logic is complex or non-obvious
- Remove dead code and unused imports
- Follow consistent formatting (use `pnpm format` before committing)

### SOLID Principles

Apply SOLID principles when designing code:

- **S**ingle Responsibility: Each component, function, and class should do one thing well
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Subtypes should be substitutable for their base types
- **I**nterface Segregation: Prefer small, specific interfaces over large ones
- **D**ependency Inversion: Depend on abstractions, not concretions

### Decision Making

- **When in doubt, ask the user** - Do not guess or make assumptions about requirements
- If there are multiple ways to implement something, present options and let the user decide
- Do not exceed in reasoning or invent requirements not stated by the user
- Ask clarifying questions before writing code that involves significant architecture decisions

### Component Organization

When a component needs hooks, context providers, or subcomponents:

- Create them in subdirectories within the component folder (`hooks/`, `provider/`, `components/`)
- This keeps the component self-contained and easy to export
- Use index files for clean exports when needed
- Local subcomponents should be prefixed with the parent component name to avoid naming conflicts