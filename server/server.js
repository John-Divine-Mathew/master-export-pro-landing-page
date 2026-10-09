import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import apiRoutes from './routes/apiRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve Client Static Build in Production / Standalone mode
const clientDistPath = path.resolve(__dirname, '../client/dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Development greeting if build not yet present
  app.get('/', (req, res) => {
    res.json({
      message: 'Master Export Pro MERN Backend API is Running',
      version: '1.0.0',
      status: 'Online',
      documentation: {
        health: '/api/health',
        stats: '/api/stats',
        enquiries: '/api/enquiries',
        orders: '/api/orders',
        products: '/api/products'
      }
    });
  });
}

// Connect to MongoDB and Start Server
async function startServer() {
  await connectDB();
  const server = app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Master Export Pro MERN Server running on port ${PORT}`);
    console.log(`📡 API endpoint:   http://localhost:${PORT}/api/health`);
    console.log(`💻 Web Application: http://localhost:${PORT}`);
    console.log(`====================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`⚠️  [Port Conflict] Port ${PORT} is already in use by another process.`);
      console.error(`💡 Tip: Close existing server processes or change PORT in .env (e.g. PORT=5001).`);
      process.exit(1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer();
