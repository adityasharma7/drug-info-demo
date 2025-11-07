# Drug Info Demo

A full-stack demonstration application with a React frontend and NestJS backend for drug information management.

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **Backend**: NestJS + TypeScript + TypeORM
- **Database**: PostgreSQL
- **Styling**: Tailwind CSS (utility-first CSS framework)

## Quick Start

### Installation

Install all dependencies from the root:

```bash
npm install
```

This will automatically install both backend and frontend dependencies.

### Running the Application

#### Development Mode

You need to run both frontend and backend in separate terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

The backend API will be available at `http://localhost:3000`  
The frontend app will be available at `http://localhost:5173`

#### Production Mode

Build both applications:

```bash
npm run build
```

This will build both the backend and frontend for production.

### Running with Docker

The easiest way to run the entire application stack is using Docker Compose. This will start PostgreSQL, backend, and frontend services in containers.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

#### Quick Start with Docker

1. **Start all services:**

```bash
docker-compose up
```

Or run in detached mode (background):

```bash
docker-compose up -d
```

2. **Access the application:**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`
   - PostgreSQL: `localhost:5433` (mapped to avoid conflicts with local PostgreSQL)

3. **Stop all services:**

```bash
docker-compose down
```

4. **Stop and remove volumes (clean slate):**

```bash
docker-compose down -v
```

#### Docker Services

The `docker-compose.yml` defines three services:

- **postgres**: PostgreSQL 14 database
  - Port: `5433:5432` (external:internal)
  - Database: `drug_info_db`
  - Credentials: `postgres/postgres`
  - Data persisted in Docker volume

- **backend**: NestJS API server
  - Port: `3000:3000`
  - Auto-seeds database on startup
  - Depends on PostgreSQL health check

- **frontend**: React + Vite development server
  - Port: `5173:5173`
  - Hot reload enabled via volume mounts
  - Proxies API requests to backend

#### Useful Docker Commands

**View logs:**

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

**Rebuild services:**

```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build backend

# Rebuild and restart
docker-compose up --build
```

**Check service status:**

```bash
docker-compose ps
```

**Access container shell:**

```bash
# Backend container
docker-compose exec backend sh

# PostgreSQL container
docker-compose exec postgres psql -U postgres -d drug_info_db
```

**Reseed database:**

The backend automatically seeds the database on startup when `AUTO_SEED=true` is set. To reseed:

```bash
docker-compose restart backend
```

## Available Scripts

### Root Level Scripts

- `npm install` - Install all dependencies (backend + frontend)
- `npm run dev:backend` - Start backend in development mode
- `npm run dev:frontend` - Start frontend in development mode
- `npm run build` - Build both backend and frontend for production

### Backend Scripts

- `npm run backend:install` - Install backend dependencies
- `npm run backend:dev` - Start backend in development mode
- `npm run backend:build` - Build backend for production
- `npm run backend:start` - Start production backend
- `npm run backend:test` - Run backend tests
- `npm run backend:test:watch` - Run backend tests in watch mode
- `npm run backend:test:cov` - Run backend tests with coverage

### Frontend Scripts

- `npm run frontend:install` - Install frontend dependencies
- `npm run frontend:dev` - Start frontend in development mode
- `npm run frontend:build` - Build frontend for production
- `npm run frontend:preview` - Preview production build
- `npm run frontend:lint` - Run ESLint on frontend code

## Project Structure

```
drug-info-demo/
├── backend/           # NestJS backend application
│   ├── src/          # Source code
│   ├── dist/         # Compiled output
│   └── package.json  # Backend dependencies
├── frontend/          # React + Vite frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   ├── dist/         # Build output
│   └── package.json  # Frontend dependencies
├── package.json      # Root package configuration
├── LICENSE           # License file
└── README.md         # This file
```

## Application Details

### Backend

The backend is built with NestJS, TypeORM, and PostgreSQL. For more detailed backend documentation, see [backend/README.md](./backend/README.md) and [API.md](./API.md).

- **Port**: 3000
- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Language**: TypeScript
- **Features**:
  - RESTful API endpoints
  - Drug management with sorting and filtering
  - Table configuration system
  - Input validation
  - CORS enabled
  - Hot reload in dev mode

**API Endpoints:**
- `/drugs` - Drug management API
- `/table-config` - Table configuration API

See [API.md](./API.md) for complete API documentation.

### Frontend

The frontend is built with React, Vite, and Tailwind CSS for a modern, fast development experience. For more detailed frontend documentation, see [frontend/README.md](./frontend/README.md).

- **Port**: 5173
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Features**: HMR, proxy to backend API, responsive design, utility-first CSS

## Environment Configuration

### Backend

You can configure the backend server port using the `PORT` environment variable:

```bash
PORT=3001 npm run backend:start
```

Default port is `3000`.

### Frontend

The frontend development server runs on port `5173` by default. To change it, modify the `vite.config.ts` file in the frontend directory.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

