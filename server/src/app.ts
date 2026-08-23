import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';

dotenv.config();

export const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
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
