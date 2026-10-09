import { Product } from '../models/Product.js';
import { isMongoConnected } from '../config/db.js';

let memoryProducts = [
  { _id: 'prod_1', name: 'Precision valve assembly', sku: 'VAL-240-IND', category: 'Valves', unitPrice: 38.5, currency: 'USD', inStock: 1250 },
  { _id: 'prod_2', name: 'Service parts kit', sku: 'KIT-080-SRV', category: 'Spare Kits', unitPrice: 12.0, currency: 'USD', inStock: 450 },
  { _id: 'prod_3', name: 'Food Grade Hydraulic Seals', sku: 'SEA-500-FGD', category: 'Seals', unitPrice: 24.0, currency: 'USD', inStock: 3200 },
  { _id: 'prod_4', name: 'Custom Actuator Modules', sku: 'ACT-150-MOD', category: 'Actuators', unitPrice: 164.53, currency: 'USD', inStock: 180 }
];

export async function getProducts(req, res) {
  try {
    if (isMongoConnected) {
      let products = await Product.find();
      if (products.length === 0 && memoryProducts.length > 0) {
        try {
          await Product.insertMany(memoryProducts.map(({ _id, ...rest }) => rest));
          products = await Product.find();
        } catch (seedErr) {
          console.warn('[MongoDB] Product seeding notice:', seedErr.message);
        }
      }
      return res.json({ success: true, count: products.length, data: products, source: 'MongoDB' });
    }
    return res.json({ success: true, count: memoryProducts.length, data: memoryProducts, source: 'Memory (MERN fallback)' });
  } catch (err) {
    console.error('getProducts error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
