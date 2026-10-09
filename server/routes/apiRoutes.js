import { Router } from 'express';
import { getEnquiries, createEnquiry } from '../controllers/enquiryController.js';
import { getOrders } from '../controllers/orderController.js';
import { getProducts } from '../controllers/productController.js';
import { getStats } from '../controllers/statsController.js';
import { isMongoConnected } from '../config/db.js';

const router = Router();

// Health & System status
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    stack: 'MERN (MongoDB, Express, React, Node.js)',
    mongoDB: isMongoConnected ? 'connected' : 'in-memory fallback active'
  });
});

// Operations Stats
router.get('/stats', getStats);

// Enquiries (Create and Retrieve)
router.get('/enquiries', getEnquiries);
router.post('/enquiries', createEnquiry);

// Orders
router.get('/orders', getOrders);

// Products
router.get('/products', getProducts);

export default router;
