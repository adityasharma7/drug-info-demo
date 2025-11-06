# Frontend - Drug Info Demo

React + TypeScript + Vite frontend application.

## Features

- ⚡️ Vite - Lightning fast HMR and build tool
- ⚛️ React 18 - Modern React with hooks
- 🔷 TypeScript - Type-safe development
- 🎨 Modern CSS - Clean and responsive design
- 🔍 ESLint - Code quality and consistency
- 🔗 Backend Integration - Connected to NestJS API

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- Proxy configuration to connect to the backend API at `http://localhost:3000`

## Building for Production

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
frontend/
├── public/           # Static assets
├── src/
│   ├── App.tsx      # Main application component
│   ├── App.css      # Application styles
│   ├── main.tsx     # Application entry point
│   ├── index.css    # Global styles
│   └── vite-env.d.ts # Vite type definitions
├── index.html       # HTML entry point
├── vite.config.ts   # Vite configuration
├── tsconfig.json    # TypeScript configuration
└── package.json     # Dependencies and scripts
```

## Backend Integration

The frontend is configured to communicate with the NestJS backend running on `http://localhost:3000`. Make sure the backend is running before starting the frontend development server.

The Vite dev server includes a proxy configuration for `/api` routes that forwards requests to the backend.

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **ESLint** - Code linting
- **CSS3** - Styling

## License

MIT

