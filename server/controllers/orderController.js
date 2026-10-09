import { Order } from '../models/Order.js';
import { isMongoConnected } from '../config/db.js';

let memoryOrders = [
  {
    _id: 'mem_ord_1',
    orderNumber: 'SO-0618',
    buyer: 'Meridian Foods',
    reference: 'ENQ-1039',
    destinationPort: 'Le Havre Port',
    status: 'Confirmed',
    totalAmount: 12000,
    currency: 'USD',
    items: [{ product: 'Food Grade Seals', qty: 500, unitPrice: 24.0, amount: 12000 }],
    createdAt: new Date()
  },
  {
    _id: 'mem_ord_2',
    orderNumber: 'SO-0617',
    buyer: 'Nordwell GmbH',
    reference: 'QUO-0836',
    destinationPort: 'Hamburg Port',
    status: 'Shipment',
    totalAmount: 10200,
    currency: 'USD',
    items: [
      { product: 'Precision valve assembly', qty: 240, unitPrice: 38.5, amount: 9240 },
      { product: 'Service parts kit', qty: 80, unitPrice: 12.0, amount: 960 }
    ],
    createdAt: new Date(Date.now() - 3600000 * 48)
  },
  {
    _id: 'mem_ord_3',
    orderNumber: 'SO-0616',
    buyer: 'Luma Trading',
    reference: 'ENQ-1032',
    destinationPort: 'Felixstowe Port',
    status: 'Invoice due',
    totalAmount: 24680,
    currency: 'USD',
    items: [{ product: 'Custom Actuator Modules', qty: 150, unitPrice: 164.53, amount: 24680 }],
    createdAt: new Date(Date.now() - 3600000 * 96)
  }
];

export async function getOrders(req, res) {
  try {
    if (isMongoConnected) {
      let orders = await Order.find().sort({ createdAt: -1 });
      if (orders.length === 0 && memoryOrders.length > 0) {
        try {
          await Order.insertMany(memoryOrders.map(({ _id, ...rest }) => rest));
          orders = await Order.find().sort({ createdAt: -1 });
        } catch (seedErr) {
          console.warn('[MongoDB] Order seeding notice:', seedErr.message);
        }
      }
      return res.json({ success: true, count: orders.length, data: orders, source: 'MongoDB' });
    }
    return res.json({ success: true, count: memoryOrders.length, data: memoryOrders, source: 'Memory (MERN fallback)' });
  } catch (err) {
    console.error('getOrders error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
