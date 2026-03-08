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

## 📁 Project Structure

```text
.
├── src/                # Source code
│   ├── components/     # Shared React components (Layout, Common)
│   ├── context/        # React Context API (BlogContext)
│   ├── hooks/          # Custom React hooks (TODO: Add hooks)
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

No environment variables are currently required for this project.

- [ ] **TODO**: If needed, add `.env.example` file and document variables here.

## 🧪 Tests

Currently, there are no tests in this project.

- [ ] **TODO**: Add unit tests (e.g., using [Vitest](https://vitest.dev/)).
- [ ] **TODO**: Add E2E tests (e.g., using [Playwright](https://playwright.dev/)).

## 📄 License

- [ ] **TODO**: Add a `LICENSE` file and specify the license type here.
