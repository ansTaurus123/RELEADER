// This file serves as a special entry point for Vercel deployment
import { createServer } from 'http';
import { registerRoutes } from '../server/routes';
import express from 'express';
import { json } from 'express';
import { storage } from '../server/storage';
import { initializeTherapistIndex } from '../server/services/faiss';

const app = express();
app.use(json());

// Initialize FAISS with our therapist data
async function initFaiss() {
  const therapists = await storage.getAllTherapists();
  await initializeTherapistIndex(therapists);
  console.log('FAISS index initialized with therapist data');
}

// Start server
async function start() {
  await initFaiss();
  const server = await registerRoutes(app);
  if (process.env.NODE_ENV !== 'development') {
    // For Vercel deployment - let Vercel handle the server
    console.log('API server initialized for Vercel deployment');
  } else {
    // For local development
    const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    server.listen({
      port: PORT,
      host: '0.0.0.0'
    }, () => {
      console.log(`[express] serving on port ${PORT}`);
    });
  }
}

start().catch(console.error);

export default app;
