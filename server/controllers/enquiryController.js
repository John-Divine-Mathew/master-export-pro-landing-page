import { Enquiry } from '../models/Enquiry.js';
import { isMongoConnected } from '../config/db.js';

// High performance in-memory store for fallback if MongoDB service is not started locally
let memoryEnquiries = [
  {
    _id: 'mem_enq_1',
    enquiryRef: 'ENQ-1042',
    buyerName: 'David Vance',
    company: 'Luma Trading',
    email: 'd.vance@lumatrading.com',
    phone: '+44 20 7946 0912',
    country: 'United Kingdom',
    productCategory: 'Industrial Valves',
    quantity: 320,
    targetPrice: 38.5,
    currency: 'USD',
    status: 'New Enquiry',
    notes: 'Requires EN 10204 3.1 material certificate and sea freight quote.',
    createdAt: new Date(Date.now() - 3600000 * 4)
  },
  {
    _id: 'mem_enq_2',
    enquiryRef: 'ENQ-1041',
    buyerName: 'Stefan Meier',
    company: 'Nordwell GmbH',
    email: 's.meier@nordwell.de',
    phone: '+49 89 2018 4390',
    country: 'Germany',
    productCategory: 'Service Parts Kit',
    quantity: 80,
    targetPrice: 12.0,
    currency: 'USD',
    status: 'Quotation Prepared',
    notes: 'Quotation QUO-0836 prepared and sent for review.',
    createdAt: new Date(Date.now() - 3600000 * 28)
  },
  {
    _id: 'mem_enq_3',
    enquiryRef: 'ENQ-1039',
    buyerName: 'Elena Rostova',
    company: 'Meridian Foods Ltd',
    email: 'elena@meridianfoods.eu',
    phone: '+33 1 4268 5500',
    country: 'France',
    productCategory: 'Food Grade Seals',
    quantity: 500,
    targetPrice: 24.0,
    currency: 'USD',
    status: 'Confirmed Order',
    notes: 'Converted to sales order SO-0618.',
    createdAt: new Date(Date.now() - 3600000 * 72)
  }
];

export async function getEnquiries(req, res) {
  try {
    if (isMongoConnected) {
      let enquiries = await Enquiry.find().sort({ createdAt: -1 });
      if (enquiries.length === 0 && memoryEnquiries.length > 0) {
        try {
          await Enquiry.insertMany(memoryEnquiries.map(({ _id, ...rest }) => rest));
          enquiries = await Enquiry.find().sort({ createdAt: -1 });
        } catch (seedErr) {
          console.warn('[MongoDB] Enquiry seeding notice:', seedErr.message);
        }
      }
      return res.json({ success: true, count: enquiries.length, data: enquiries, source: 'MongoDB' });
    }
    return res.json({ success: true, count: memoryEnquiries.length, data: memoryEnquiries, source: 'Memory (MERN fallback)' });
  } catch (err) {
    console.error('getEnquiries error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

export async function createEnquiry(req, res) {
  try {
    const { buyerName, company, email, phone, country, productCategory, quantity, targetPrice, notes } = req.body;
    
    if (!buyerName || !company || !email) {
      return res.status(400).json({
        success: false,
        message: 'buyerName, company, and email are required fields'
      });
    }

    const enquiryRef = `ENQ-${Math.floor(1000 + Math.random() * 9000)}`;

    if (isMongoConnected) {
      const newEnquiry = await Enquiry.create({
        enquiryRef,
        buyerName,
        company,
        email,
        phone,
        country: country || 'Global',
        productCategory: productCategory || 'General Export Goods',
        quantity: Number(quantity) || 100,
        targetPrice: Number(targetPrice) || 0,
        notes: notes || '',
        status: 'New Enquiry'
      });
      return res.status(201).json({ success: true, data: newEnquiry, source: 'MongoDB' });
    }

    // In-memory fallback
    const memItem = {
      _id: `mem_enq_${Date.now()}`,
      enquiryRef,
      buyerName,
      company,
      email,
      phone: phone || '',
      country: country || 'Global',
      productCategory: productCategory || 'General Export Goods',
      quantity: Number(quantity) || 100,
      targetPrice: Number(targetPrice) || 0,
      currency: 'USD',
      status: 'New Enquiry',
      notes: notes || '',
      createdAt: new Date()
    };
    memoryEnquiries.unshift(memItem);
    return res.status(201).json({ success: true, data: memItem, source: 'Memory (MERN fallback)' });
  } catch (err) {
    console.error('createEnquiry error:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
