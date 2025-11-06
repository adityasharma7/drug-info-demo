# Setup Guide

This guide will help you get the Drug Info Demo application up and running.

**Tech Stack:** React 18 + Vite + Tailwind CSS + NestJS + TypeScript

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation Steps

### 1. Install Dependencies

From the root directory, run:

```bash
npm install
```

This will install dependencies for both the backend and frontend.

### 2. Start the Backend

Open a terminal and run:

```bash
npm run dev:backend
```

The backend will start on `http://localhost:3000`

### 3. Start the Frontend

Open a **second terminal** and run:

```bash
npm run dev:frontend
```

The frontend will start on `http://localhost:5173`

### 4. (Optional) Seed Database

Populate the database with sample data:

```bash
cd backend
npm run seed
```

This will add:
- 15 sample drugs
- 8 table column configurations

### 5. Open in Browser

Open your browser and navigate to:

```
http://localhost:5173
```

You should see the Drug Info Demo application with a connection to the backend!

## Verify Everything is Working

When the frontend loads, it will attempt to fetch data from the backend. If successful, you'll see "Hello World!" displayed on the page, indicating the frontend and backend are properly connected.

### Test the API

You can test the API endpoints:

```bash
# Get all drugs (if seeded)
curl http://localhost:3000/drugs

# Get drugs sorted by launch date
curl "http://localhost:3000/drugs?sortBy=launchDate&order=DESC"

# Get table configuration
curl http://localhost:3000/table-config
```

## Development Workflow

- **Frontend**: Edit files in `frontend/src/` and see changes instantly with Hot Module Replacement
- **Backend**: Edit files in `backend/src/` and the server will automatically restart

## Troubleshooting

### Port Already in Use

If you get a "port already in use" error:

- **Backend (3000)**: Kill the process using port 3000 or change the port in `backend/src/main.ts`
- **Frontend (5173)**: Vite will automatically try the next available port (5174, 5175, etc.)

### Cannot Connect to Backend

1. Make sure the backend is running (`npm run dev:backend`)
2. Check that the backend is on port 3000
3. Verify CORS is enabled in the backend (it should be by default)

### Module Not Found Errors

If you see TypeScript errors about missing modules:

1. Make sure you've run `npm install` in the root directory
2. Try deleting `node_modules` and `package-lock.json` in both `frontend` and `backend`, then run `npm install` again

## Building for Production

Build both applications:

```bash
npm run build
```

The output will be:
- Backend: `backend/dist/`
- Frontend: `frontend/dist/`

## Next Steps

- Explore the codebase in `frontend/src/` and `backend/src/`
- Add new API endpoints in the backend
- Create new React components in the frontend
- Connect them together!

Happy coding! 🚀

