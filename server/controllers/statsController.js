import { isMongoConnected } from '../config/db.js';

export async function getStats(req, res) {
  try {
    const stats = {
      openEnquiries: 18,
      newEnquiriesThisMonth: 4,
      quotationsPending: 12,
      activeShipments: 7,
      outstandingReceivables: '$24,680',
      totalInvoicesCount: 6,
      pipeline: [
        { name: 'Enquiry', count: '08', client: 'Luma Trading', ref: 'ENQ-1042', status: 'Active' },
        { name: 'Quotation', count: '05', client: 'Nordwell GmbH', ref: 'QUO-0836', status: 'Sent' },
        { name: 'Order', count: '04', client: 'Meridian Foods', ref: 'SO-0618', status: 'Confirmed' },
        { name: 'Shipment', count: '03', client: 'Aster & Co.', ref: 'SHP-0291', status: 'In Transit' }
      ],
      systemInfo: {
        stack: 'MERN (MongoDB, Express, React, Node.js)',
        database: isMongoConnected ? 'MongoDB (Connected)' : 'Active (In-Memory Failover Active)',
        serverStatus: 'Online',
        port: process.env.PORT || 5000
      }
    };
    return res.json({ success: true, data: stats });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
