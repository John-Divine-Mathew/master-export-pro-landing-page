export interface EnquiryPayload {
  buyerName: string;
  company: string;
  email: string;
  phone?: string;
  country?: string;
  productCategory?: string;
  quantity?: number;
  targetPrice?: number;
  notes?: string;
}

export interface EnquiryItem extends EnquiryPayload {
  _id: string;
  enquiryRef: string;
  status: string;
  createdAt: string;
}

export interface SystemStats {
  openEnquiries: number;
  newEnquiriesThisMonth: number;
  quotationsPending: number;
  activeShipments: number;
  outstandingReceivables: string;
  totalInvoicesCount: number;
  pipeline: Array<{
    name: string;
    count: string;
    client: string;
    ref: string;
    status: string;
  }>;
  systemInfo: {
    stack: string;
    database: string;
    serverStatus: string;
    port: number;
  };
}

// Hosted backend URL on Render
const RENDER_BACKEND_URL = 'https://master-export-pro-landing-page-2.onrender.com';
const RAW_API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? RENDER_BACKEND_URL : '');
const API_BASE = RAW_API_URL ? `${RAW_API_URL.replace(/\/$/, '')}/api` : '/api';

export async function fetchHealth(): Promise<{ status: string; stack: string; mongoDB: string }> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Server health check failed');
    return await res.json();
  } catch (err) {
    return {
      status: 'offline',
      stack: 'MERN Stack (Offline)',
      mongoDB: 'disconnected'
    };
  }
}

export async function fetchStats(): Promise<SystemStats | null> {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error('Failed to load stats');
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.warn('Backend not yet reachable, using default data:', err);
    return null;
  }
}

export async function fetchEnquiries(): Promise<EnquiryItem[]> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`);
    if (!res.ok) throw new Error('Failed to load enquiries');
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('Using local fallback enquiries:', err);
    return [];
  }
}

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; data?: EnquiryItem; message?: string }> {
  try {
    const res = await fetch(`${API_BASE}/enquiries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Error submitting enquiry');
    return { success: true, data: json.data };
  } catch (err: any) {
    return { success: false, message: err.message || 'Failed to submit' };
  }
}
