import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 8080;

// Security Headers with Helmet
app.use(
  helmet({
    contentSecurityPolicy: false, // Allows flexible client static assets
    crossOriginEmbedderPolicy: false,
  })
);

// CORS Security Configuration
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
      : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Id'],
    exposedHeaders: [
      'X-RateLimit-Limit-User',
      'X-RateLimit-Remaining-User',
      'X-RateLimit-Limit-Global',
      'X-RateLimit-Remaining-Global',
      'X-RateLimit-Daily-Remaining',
      'Retry-After',
    ],
  })
);

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Mount API routes
app.use('/api/v1', apiRouter);

// Root route
app.get('/', (_req, res) => {
  res.json({
    message: '✨ Welcome to AuraLens AI Stylist & Experience Map API ✨',
    version: '1.0.0',
    documentation: '/api/v1/health',
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 AuraLens Server listening on port ${PORT}`);
    console.log(`📡 Healthcheck: http://localhost:${PORT}/api/v1/health`);
  });
}
