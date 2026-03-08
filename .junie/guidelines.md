# Project Development Guidelines

This document provides essential information for advanced developers to build, test, and develop this project.

## 1. Build and Configuration Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
Run the following command to install dependencies:
```bash
npm install
```

### Build for Production
To compile the TypeScript code and build the production-ready assets using Vite:
```bash
npm run build
```
The output will be generated in the `dist` directory.

### Development Mode
To start the Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```

---

## 2. Testing Information

The project currently does not have a pre-configured test runner. For future development, it is recommended to use **Vitest** along with **React Testing Library**.

### Configuring Vitest
1. Install Vitest and testing library:
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```
2. Add a `test` script to `package.json`:
   ```json
   "scripts": {
     "test": "vitest"
   }
   ```

### Running Tests
To run tests once:
```bash
npx vitest run
```
To run tests in watch mode:
```bash
npx vitest
```

### Adding New Tests
Create test files with the `.test.ts` or `.test.tsx` extension. A simple test example is provided below.

#### Example Test (`src/simple.test.ts`)
```typescript
import { describe, it, expect } from 'vitest';

describe('Math Logic', () => {
  it('correctly adds 1 + 2', () => {
    expect(1 + 2).toBe(3);
  });
});
```

---

## 3. Additional Development Information

### Code Style and Standards
- **Component Pattern**: Use Functional Components with TypeScript (`React.FC`).
- **State Management**: Utilize the Context API for global state (see `src/context/BlogContext.tsx`).
- **Styling**: The project uses **Tailwind CSS v4**. Avoid using plain CSS files; instead, leverage utility classes directly in components.
- **Icons**: Use the `lucide-react` library for consistent iconography.
- **Type Safety**: Strictly define interfaces in `src/types/` (e.g., `src/types/blog.ts`).

### Key Project Structure
- `src/components/`: Reusable UI components (Layout, Common UI).
- `src/pages/`: Main page-level components corresponding to routes.
- `src/hooks/`: Custom React hooks for business logic.
- `src/context/`: Context Providers and state management logic.

### Troubleshooting
- If build fails due to TypeScript errors, run `tsc --noEmit` to diagnose.
- Vite configuration can be adjusted in `vite.config.ts`.
