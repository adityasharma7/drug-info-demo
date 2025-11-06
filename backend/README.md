# NestJS Backend Application

A well-structured NestJS application that serves as a starting point for building scalable server-side applications.

## Installation

To install the dependencies, run:

```bash
npm install
```

## Running the Application

### Development Mode (with auto-reload)
```bash
npm run start:dev
```

### Production Mode
First, build the application:
```bash
npm run build
```

Then start it:
```bash
npm start
```

The application will be running on `http://localhost:3000`.

## Available Scripts

- `npm run start:dev` - Start the application in development mode with auto-reload
- `npm run build` - Build the application for production
- `npm start` - Start the production build
- `npm run watch` - Watch TypeScript files and recompile on changes
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage

## Project Structure

- `src/main.ts` - Entry point of the application with server configuration
- `src/app.module.ts` - Root module of the application
- `src/app.controller.ts` - Handles HTTP requests
- `src/app.service.ts` - Contains business logic
- `src/types/index.ts` - Custom types and interfaces
- `dist/` - Compiled JavaScript output (generated after build)

## Environment Variables

You can configure the server port using the `PORT` environment variable:

```bash
PORT=3001 npm start
```

Default port is `3000`.

## Features

- ✅ TypeScript support with strict mode
- ✅ Decorators enabled for NestJS
- ✅ CORS enabled
- ✅ Development mode with hot reload
- ✅ Jest testing configuration
- ✅ Source maps for debugging
- ✅ Type definitions generation

## License

This project is licensed under the MIT License.