import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import config from './config/env.js';
import authRoutes from './routes/auth.routes.js';

// Initialize Express app
const app = express();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Logging middleware
if (config.NODE_ENV !== 'test') {
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
/**
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV || 'development',
  });
});**/

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

app.use('/api', authRoutes);
//app.use('/api', authRoutes);

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
/**
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
    ...(config.NODE_ENV === 'development' && {stack: err.stack}),
  });
});**/

app.listen(5000, () => console.log('Server running'));

export default app;