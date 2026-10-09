import { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { submitEnquiry, type EnquiryPayload, type EnquiryItem } from '../services/api';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEnquiryCreated?: (enquiry: EnquiryItem) => void;
}

export function EnquiryModal({ isOpen, onClose, onEnquiryCreated }: EnquiryModalProps) {
  const [formData, setFormData] = useState<EnquiryPayload>({
    buyerName: '',
    company: '',
    email: '',
    phone: '',
    country: 'Germany',
    productCategory: 'Precision valve assembly',
    quantity: 250,
    targetPrice: 38.5,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<EnquiryItem | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.company || !formData.email) {
      setErrorMsg('Please enter your name, company, and work email.');
      return;
    }
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await submitEnquiry(formData);
      if (res.success && res.data) {
        setSuccessResult(res.data);
        if (onEnquiryCreated) {
          onEnquiryCreated(res.data);
        }
      } else {
        setErrorMsg(res.message || 'Could not process submission.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccessResult(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in" style={{ zIndex: 9999 }}>
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all text-slate-800"
        style={{ fontFamily: 'var(--font-sans, system-ui)' }}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#0b1a2d] to-[#162e4a] text-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-500/20 text-orange-300 border border-orange-500/30 mb-1">
              <ShieldCheck className="w-3.5 h-3.5" /> MERN Export Gateway
            </div>
            <h3 className="text-xl font-bold tracking-tight text-white">Create New Export Enquiry</h3>
            <p className="text-xs text-slate-300">Synchronized directly into MongoDB &amp; Express Sales Trail</p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {successResult ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 mb-2">Enquiry Registered!</h4>
              <p className="text-sm text-slate-600 mb-4 max-w-md mx-auto">
                Reference <strong>{successResult.enquiryRef}</strong> has been logged in the MERN database for <strong>{successResult.company}</strong>.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left max-w-md mx-auto text-xs space-y-1.5 mb-6">
                <div className="flex justify-between"><span className="text-slate-500">Buyer:</span> <span className="font-semibold">{successResult.buyerName}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Product:</span> <span className="font-semibold">{successResult.productCategory}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Quantity:</span> <span className="font-semibold">{successResult.quantity} units</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Status:</span> <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">Stage 01: Enquiry</span></div>
              </div>

              <button
                type="button"
                onClick={handleResetAndClose}
                className="px-6 py-2.5 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800 transition shadow"
              >
                Close &amp; View in Dashboard
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-200 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Buyer Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.buyerName}
                    onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                    placeholder="e.g. Divine Mathew"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Nordwell GmbH"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Business Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+49 89 2018 4390"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Product Category</label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => setFormData({ ...formData, productCategory: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none bg-white"
                  >
                    <option value="Precision valve assembly">Precision valve assembly</option>
                    <option value="Service parts kit">Service parts kit</option>
                    <option value="Food Grade Hydraulic Seals">Food Grade Hydraulic Seals</option>
                    <option value="Custom Actuator Modules">Custom Actuator Modules</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Commercial Notes &amp; Incoterms</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. CIF Hamburg port requested, delivery within 30 days."
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="https://wa.me/916369153235?text=Hi%20Media%20Wave%20Technologies%2C%20I%27d%20like%20to%20book%20a%20demo%20of%20Master%20Export%20Pro.%20Please%20share%20the%20available%20slots."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg transition"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Chat / Book Demo on WhatsApp
                </a>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetAndClose}
                    className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#ff7700] to-[#ea580c] hover:from-[#ff8c1a] hover:to-[#f97316] rounded-xl transition shadow-md shadow-orange-500/25 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      'Saving to Database...'
                    ) : (
                      <>
                        Register Enquiry <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
