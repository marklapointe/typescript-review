# React + TS Blog Review

A modern blog review application built with React, TypeScript, and Vite, styled with Tailwind CSS.

## 🚀 Overview

This project is a web application for managing and reviewing blog posts. It features:
- **Post Management**: List, view, and create blog posts.
- **Modern Routing**: Powered by React Router 7.
- **State Management**: Built-in React Context API.
- **Type Safety**: Fully typed with TypeScript.
- **Styling**: Modern CSS with Tailwind CSS 4.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📋 Requirements

- **Node.js**: v18 or later (v20+ recommended)
- **Package Manager**: [npm](https://www.npmjs.com/) (recommended) or yarn

## ⚙️ Setup & Run

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for production**:
   ```bash
   npm run build
   ```
   The production build will be generated in the `dist` directory.

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode with Vite. |
| `npm run build` | Compiles TypeScript and builds the production app. |
| `npm run preview` | Locally previews the production build. |
| `npm run test` | Runs tests with Vitest in watch mode. |
| `npm run test:ui` | Runs tests with the Vitest UI browser interface. |

## 📁 Project Structure

```text
.
├── src/                # Source code
│   ├── components/     # Shared React components (Layout, Common)
│   ├── context/        # React Context API (BlogContext)
│   ├── pages/          # Page components (PostList, PostDetail, PostForm)
│   ├── types/          # TypeScript interfaces and types (blog.ts)
│   ├── App.tsx         # Main App component with Routing
│   ├── index.css       # Global styles (Tailwind imports)
│   └── main.tsx        # Application entry point
├── dist/               # Production build output
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration
```

## 🔐 Environment Variables

No environment variables are required for this project.

## 🧪 Tests

Tests are set up using [Vitest](https://vitest.dev/) with [React Testing Library](https://testing-library.com/).

| Script | Description |
| :--- | :--- |
| `npm run test` | Runs tests in watch mode. |
| `npm run test:ui` | Runs tests with the Vitest UI browser interface. |

## 📄 License

This project is unlicensed (public domain). Add a `LICENSE` file to specify a license if needed.

---

## 🏗️ Creating from Scratch

To recreate this project from scratch, follow these steps:

1. **Initialize the Project with Vite**:
   ```bash
   npm create vite@latest my-blog-project -- --template react-ts
   cd my-blog-project
   ```

2. **Install Core Dependencies**:
   ```bash
   npm install react-router-dom lucide-react
   ```

3. **Set Up Tailwind CSS 4**:
   Vite 7 and Tailwind CSS 4 work seamlessly together. Install the Tailwind CSS package and its Vite plugin:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

4. **Configure Vite**:
   Update `vite.config.ts` to include the Tailwind CSS plugin:
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [
       react(),
       tailwindcss(),
     ],
   })
   ```

5. **Import Tailwind in CSS**:
   In `src/index.css`, replace the default content with:
   ```css
   @import "tailwindcss";
   ```

6. **Set Up Testing (Vitest)**:
   To include the testing suite, install the following:
   ```bash
   npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
   ```
   Add a `test` script to your `package.json`:
   ```json
   "scripts": {
     "test": "vitest",
     "test:ui": "vitest --ui"
   }
   ```

7. **Project Scaffolding**:
   Create the directory structure as outlined in the **Project Structure** section above and start building your components!
