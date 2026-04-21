import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import config from './config/env.ts';

// Initialize Express app
const app = express();
export const prisma = new PrismaClient();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to TravelTrack API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      itineraries: '/api/itineraries',
      health: '/health',
    },
  });
});

// TODO: Import and use route files
// import authRoutes from './routes/auth.js';
// import itineraryRoutes from './routes/itineraries.js';
// app.use('/api/auth', authRoutes);
// app.use('/api/itineraries', itineraryRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    availableEndpoints: {
      health: 'GET /health',
      api: 'GET /api',
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

export default app;