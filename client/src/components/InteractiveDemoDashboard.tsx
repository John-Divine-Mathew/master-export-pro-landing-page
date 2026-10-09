import { useState } from 'react';
import {
  LayoutDashboard, Users, Boxes, BriefcaseBusiness, Ship,
  ReceiptText, BarChart3, Settings2, Bell, ChevronDown,
  Search, ArrowRight, FileCheck2, WalletCards,
  CheckCircle2, Clock, Globe2, Building2, MapPin,
  ExternalLink, Filter, Plus, ShieldCheck, Download,
  Anchor, Truck, TrendingUp, DollarSign, Layers,
  FileText, Check, AlertCircle, RefreshCw, Menu, X
} from 'lucide-react';
import type { SystemStats } from '../services/api';

export type DemoPageId =
  | 'dashboard'
  | 'customers'
  | 'products'
  | 'sales'
  | 'shipments'
  | 'invoices'
  | 'reports'
  | 'settings';

export const DEMO_PAGES: Array<{
  id: DemoPageId;
  label: string;
  category: string;
  desc: string;
  icon: typeof LayoutDashboard;
}> = [
  { id: 'dashboard', label: 'Dashboard', category: 'Workspace', desc: 'Real-Time KPIs & Trade Summary', icon: LayoutDashboard },
  { id: 'customers', label: 'Customers', category: 'Workspace', desc: 'Global Buyers & KYC Directory', icon: Users },
  { id: 'products', label: 'Products', category: 'Workspace', desc: 'Commodities & HS Codes Master', icon: Boxes },
  { id: 'sales', label: 'Sales Orders', category: 'Export Operations', desc: 'Sales Contracts & Proformas', icon: BriefcaseBusiness },
  { id: 'shipments', label: 'Shipments', category: 'Export Operations', desc: 'Container Tracking & Sea Cargo', icon: Ship },
  { id: 'invoices', label: 'Invoices & Payments', category: 'Export Operations', desc: 'Forex Billing & Reconciliation', icon: ReceiptText },
  { id: 'reports', label: 'Reports', category: 'Insights', desc: 'Duty Drawback & Trade Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', category: 'Insights', desc: 'Customs, Port & Currency Config', icon: Settings2 },
];

interface InteractiveDemoDashboardProps {
  stats?: SystemStats | null;
}

export function InteractiveDemoDashboard({ stats }: InteractiveDemoDashboardProps) {
  const [activeTab, setActiveTab] = useState<DemoPageId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState('');
  const [customerCountryFilter, setCustomerCountryFilter] = useState('All');
  const [productCategoryFilter, setProductCategoryFilter] = useState('All');
  const [salesStageFilter, setSalesStageFilter] = useState('All');
  const [shipmentCarrierFilter, setShipmentCarrierFilter] = useState('All');
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('All');

  // Customer Directory Mock Data
  const customers = [
    {
      id: 'CUST-01',
      name: 'Nordwell GmbH',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Hamburg',
      contact: 'Klaus Weber',
      role: 'Procurement Director',
      kyc: 'Verified',
      ordersCount: 18,
      activeExposure: '$142,500',
      terms: 'LC 60 Days · CIF',
      status: 'Active',
    },
    {
      id: 'CUST-02',
      name: 'Meridian Foods Corp',
      country: 'United Kingdom',
      flag: '🇬🇧',
      city: 'London',
      contact: 'Sarah Jenkins',
      role: 'Import Manager',
      kyc: 'Verified',
      ordersCount: 24,
      activeExposure: '$286,000',
      terms: 'CAD (Cash Against Docs) · CIF',
      status: 'Active',
    },
    {
      id: 'CUST-03',
      name: 'Luma Trading FZE',
      country: 'UAE',
      flag: '🇦🇪',
      city: 'Dubai',
      contact: 'Tariq Al-Mansoor',
      role: 'VP Trade & Supply',
      kyc: 'Verified',
      ordersCount: 31,
      activeExposure: '$95,200',
      terms: 'TT (30% Adv / 70% BL) · FOB',
      status: 'Active',
    },
    {
      id: 'CUST-04',
      name: 'Pacific Harvest Pte',
      country: 'Singapore',
      flag: '🇸🇬',
      city: 'Singapore',
      contact: 'Chen Wei',
      role: 'Global Sourcing',
      kyc: 'Verified',
      ordersCount: 12,
      activeExposure: '$68,400',
      terms: 'Net 30 Days · CFR',
      status: 'Review',
    },
    {
      id: 'CUST-05',
      name: 'Aster & Co. BV',
      country: 'Netherlands',
      flag: '🇳🇱',
      city: 'Rotterdam',
      contact: 'Emma Van Dijk',
      role: 'Logistics Head',
      kyc: 'Verified',
      ordersCount: 9,
      activeExposure: '$118,900',
      terms: 'LC at Sight · CIF',
      status: 'Active',
    },
    {
      id: 'CUST-06',
      name: 'Golden Coast Imports LLC',
      country: 'United States',
      flag: '🇺🇸',
      city: 'Long Beach, CA',
      contact: 'Robert Miller',
      role: 'Supply Chain VP',
      kyc: 'Verified',
      ordersCount: 15,
      activeExposure: '$210,000',
      terms: 'DP at Sight · CIF',
      status: 'Active',
    },
  ];

  // Export Products Mock Data
  const products = [
    {
      sku: 'AGR-RCE-001',
      name: 'Premium Basmati Rice 1121 Steam',
      hsCode: '1006.30.20',
      category: 'Agricultural',
      packing: '25kg PP Bags · Palletized',
      price: '$1,150 / MT',
      stock: '420 MT',
      status: 'Available',
    },
    {
      sku: 'SPC-PEP-004',
      name: 'Malabar Black Pepper 550GL',
      hsCode: '0904.11.10',
      category: 'Spices',
      packing: '50kg Vacuum Jute Bags',
      price: '$6,800 / MT',
      stock: '85 MT',
      status: 'Available',
    },
    {
      sku: 'ENG-FLG-012',
      name: 'Stainless Steel ANSI Flanges DN50',
      hsCode: '7307.21.00',
      category: 'Engineering',
      packing: 'ISPM-15 Treated Wooden Crates',
      price: '$42.50 / Pc',
      stock: '4,500 Pcs',
      status: 'Available',
    },
    {
      sku: 'SPC-CRD-002',
      name: 'Green Cardamom Bold 8mm Extra',
      hsCode: '0908.31.00',
      category: 'Spices',
      packing: '10kg Master Cartons',
      price: '$34.20 / Kg',
      stock: '1,400 Kg',
      status: 'Low Stock',
    },
    {
      sku: 'TEX-YRN-088',
      name: 'Combed Cotton Ring Spun 30s',
      hsCode: '5205.23.00',
      category: 'Textiles',
      packing: 'Standard Export Bales (170kg)',
      price: '$410 / Bale',
      stock: '620 Bales',
      status: 'Available',
    },
  ];

  // Sales Orders Mock Data
  const salesOrders = [
    {
      ref: 'SO-0618',
      buyer: 'Meridian Foods Corp',
      destination: 'Felixstowe Port, UK',
      incoterm: 'CIF',
      value: '$115,000',
      items: '100 MT Basmati Rice 1121',
      delivery: '15 Oct - 28 Oct 2026',
      status: 'Confirmed',
    },
    {
      ref: 'QUO-0836',
      buyer: 'Nordwell GmbH',
      destination: 'Hamburg Port, Germany',
      incoterm: 'CIF',
      value: '$170,000',
      items: '25 MT Tellicherry Pepper',
      delivery: 'Valid until 24 Oct 2026',
      status: 'Quotation',
    },
    {
      ref: 'SO-0617',
      buyer: 'Luma Trading FZE',
      destination: 'Nhava Sheva (JNPT) ➔ Jebel Ali',
      incoterm: 'FOB',
      value: '$31,250',
      items: '500 Pcs SS Flanges',
      delivery: '10 Oct - 20 Oct 2026',
      status: 'Dispatch Ready',
    },
    {
      ref: 'ENQ-1042',
      buyer: 'Pacific Harvest Pte',
      destination: 'CFR Singapore Port',
      incoterm: 'CFR',
      value: 'Est. $513,000',
      items: '15 MT Green Cardamom 8mm',
      delivery: 'RFQ Under Technical Review',
      status: 'Enquiry',
    },
    {
      ref: 'SO-0615',
      buyer: 'Aster & Co. BV',
      destination: 'Rotterdam Port, Netherlands',
      incoterm: 'CIF',
      value: '$82,000',
      items: '200 Bales Cotton Yarn',
      delivery: 'Ocean Transit Active',
      status: 'In Shipment',
    },
  ];

  // Shipments Logistics Mock Data
  const shipments = [
    {
      id: 'SHP-0291',
      container: 'MSCU8492014 (40\' HC)',
      blNo: 'MSC-INBOM-9821',
      carrier: 'MSC Mediterranean',
      vessel: 'MSC Oscar / V.2401',
      route: 'JNPT Mumbai ➔ Rotterdam Port',
      etd: '25 Sep 2026',
      eta: '18 Oct 2026',
      milestone: 'At Sea (Port Said Transshipment)',
      status: 'In Transit',
    },
    {
      id: 'SHP-0290',
      container: 'CMAU1190245 (20\' GP)',
      blNo: 'CMA-INNSA-4412',
      carrier: 'CMA CGM',
      vessel: 'CMA Palais / V.109',
      route: 'Chennai Port ➔ Felixstowe Port',
      etd: '18 Sep 2026',
      eta: '12 Oct 2026',
      milestone: 'Approaching English Channel',
      status: 'In Transit',
    },
    {
      id: 'SHP-0289',
      container: 'HLCU7728190 (40\' HC)',
      blNo: 'HAPAG-INMAA-301',
      carrier: 'Hapag-Lloyd',
      vessel: 'Berlin Express / V.044',
      route: 'Mundra Port ➔ Jebel Ali Port',
      etd: '01 Oct 2026',
      eta: '06 Oct 2026',
      milestone: 'Vessel Berthed · Customs Cleared',
      status: 'Customs Cleared',
    },
    {
      id: 'SHP-0288',
      container: 'ONEU5501928 (40\' GP)',
      blNo: 'ONE-INMUN-5192',
      carrier: 'Ocean Network Express',
      vessel: 'ONE Apus / V.088',
      route: 'Cochin Port ➔ Singapore Port',
      etd: '03 Oct 2026',
      eta: '11 Oct 2026',
      milestone: 'Departure Port Cleared · Sailing',
      status: 'In Transit',
    },
    {
      id: 'SHP-0287',
      container: 'MAEU9021841 (20\' GP)',
      blNo: 'MAEU-INCOK-7714',
      carrier: 'Maersk Line',
      vessel: 'Maersk Mc-Kinney / V.210',
      route: 'JNPT Mumbai ➔ Hamburg Port',
      etd: '12 Sep 2026',
      eta: '04 Oct 2026',
      milestone: 'Delivered to Consignee Yard',
      status: 'Delivered',
    },
  ];

  // Invoices Mock Data
  const invoices = [
    {
      invNo: 'INV-2026-084',
      orderRef: 'SO-0618',
      buyer: 'Meridian Foods Corp',
      amount: '$115,000 USD',
      terms: 'LC 60 Days (Swift MT700)',
      dueDate: '15 Nov 2026',
      swiftRef: 'BARCGB22-SWIFT-901',
      status: 'Bank Advised',
    },
    {
      invNo: 'INV-2026-083',
      orderRef: 'SO-0616',
      buyer: 'Luma Trading FZE',
      amount: '$24,680 USD',
      terms: 'TT (30% Adv / 70% BL Copy)',
      dueDate: '10 Oct 2026',
      swiftRef: 'ENBD-AE-TX-4419',
      status: 'Payment Due',
    },
    {
      invNo: 'INV-2026-082',
      orderRef: 'SO-0614',
      buyer: 'Nordwell GmbH',
      amount: '€72,500 EUR',
      terms: 'DP at Sight (Collection)',
      dueDate: 'Paid 28 Sep 2026',
      swiftRef: 'DB-DE-BRC-8812',
      status: 'Settled',
    },
    {
      invNo: 'INV-2026-081',
      orderRef: 'SO-0612',
      buyer: 'Aster & Co. BV',
      amount: '$39,400 USD',
      terms: 'LC at Sight (Irrevocable)',
      dueDate: 'Paid 20 Sep 2026',
      swiftRef: 'INGB-NL-FIRC-091',
      status: 'Settled',
    },
    {
      invNo: 'INV-2026-080',
      orderRef: 'SO-0609',
      buyer: 'Pacific Harvest Pte',
      amount: '$68,400 USD',
      terms: 'DA 30 Days (Usance)',
      dueDate: 'Paid 14 Sep 2026',
      swiftRef: 'DBS-SG-BRC-1104',
      status: 'Settled',
    },
  ];

  // Filtered Collections
  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      customerSearch === '' ||
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.contact.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.country.toLowerCase().includes(customerSearch.toLowerCase());
    const matchesCountry =
      customerCountryFilter === 'All' || c.country === customerCountryFilter;
    return matchesSearch && matchesCountry;
  });

  const filteredProducts = products.filter((p) => {
    return productCategoryFilter === 'All' || p.category === productCategoryFilter;
  });

  const filteredSales = salesOrders.filter((s) => {
    return salesStageFilter === 'All' || s.status === salesStageFilter;
  });

  const filteredShipments = shipments.filter((sh) => {
    return (
      shipmentCarrierFilter === 'All' ||
      sh.carrier.toLowerCase().includes(shipmentCarrierFilter.toLowerCase())
    );
  });

  const filteredInvoices = invoices.filter((inv) => {
    return invoiceStatusFilter === 'All' || inv.status === invoiceStatusFilter;
  });

  // Get view header labels based on active tab
  const getHeaderMeta = () => {
    switch (activeTab) {
      case 'customers':
        return {
          title: 'Customer Directory & Global Buyers',
          subtitle: 'Active verified buyer dossiers across international trade routes.',
          caption: 'CUSTOMER DIRECTORY · VERIFIED BUYER DOSSIERS',
        };
      case 'products':
        return {
          title: 'Export Commodity & SKU Catalogue',
          subtitle: 'Export-ready inventory with HS codes, packaging, and FOB/CIF tariffs.',
          caption: 'COMMODITY CATALOGUE · HS CODE TARIFF REGISTRY',
        };
      case 'sales':
        return {
          title: 'Sales Orders & Commercial Contracts',
          subtitle: 'Commercial export pipeline from initial RFQ to confirmed sales order.',
          caption: 'SALES PIPELINE · EXPORT ORDER CONFIRMATIONS',
        };
      case 'shipments':
        return {
          title: 'Freight Logistics & BL Tracking',
          subtitle: 'Live ocean vessel tracking, container milestones, and customs clearances.',
          caption: 'FREIGHT LOGISTICS · BILL OF LADING MILESTONES',
        };
      case 'invoices':
        return {
          title: 'Commercial Invoices & Forex Reconciliation',
          subtitle: 'Bank Swift MT700, e-BRC tracking, and foreign exchange realization.',
          caption: 'COMMERCIAL INVOICES · FOREX REALIZATION',
        };
      case 'reports':
        return {
          title: 'Trade Analytics & Compliance Intelligence',
          subtitle: 'Quarterly export realization velocity, RoDTEP claims, and route volume.',
          caption: 'TRADE ANALYTICS · REGULATORY COMPLIANCE',
        };
      case 'settings':
        return {
          title: 'Organization & Customs Configuration',
          subtitle: 'Manage DGFT IEC code, Authorized Dealer Bank, and automated tariffs.',
          caption: 'ORGANIZATION SETTINGS · DGFT & BANK PROTOCOLS',
        };
      default:
        return {
          title: 'Operations overview',
          subtitle: 'A clear view of the export work moving through your business.',
          caption: 'PRODUCT PREVIEW · CONNECTED WORKFLOW',
        };
    }
  };

  const headerMeta = getHeaderMeta();

  return (
    <div className="preview-frame" aria-label="Interactive export software demo preview">
      <div className="app-window">
        {/* Interactive Software Sidebar */}
        <aside className="app-sidebar" aria-label="Interactive product navigation sidebar">
          <div className="app-brand">
            <div className="app-brand-box">
              <img
                className="app-brand-logo"
                src="/images/master-export-pro-logo.png"
                alt="Master Export Pro"
              />
            </div>
          </div>

          <div className="side-label">Workspace</div>
          <button
            type="button"
            className={`side-item ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            title="View Operations Dashboard"
          >
            <LayoutDashboard size={14} /> <span>Dashboard</span>
          </button>
          <button
            type="button"
            className={`side-item ${activeTab === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveTab('customers')}
            title="View Customer Directory & Buyers"
          >
            <Users size={14} /> <span>Customers</span>
          </button>
          <button
            type="button"
            className={`side-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
            title="View Export Commodity Catalogue"
          >
            <Boxes size={14} /> <span>Products</span>
          </button>

          <div className="side-label">Export operations</div>
          <button
            type="button"
            className={`side-item ${activeTab === 'sales' ? 'active' : ''}`}
            onClick={() => setActiveTab('sales')}
            title="View Sales Orders & Contracts"
          >
            <BriefcaseBusiness size={14} /> <span>Sales</span>
          </button>
          <button
            type="button"
            className={`side-item ${activeTab === 'shipments' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipments')}
            title="View Ocean & Air Shipments"
          >
            <Ship size={14} /> <span>Shipments</span>
          </button>
          <button
            type="button"
            className={`side-item ${activeTab === 'invoices' ? 'active' : ''}`}
            onClick={() => setActiveTab('invoices')}
            title="View Invoices & Forex Reconciliation"
          >
            <ReceiptText size={14} /> <span>Invoices &amp; payments</span>
          </button>

          <div className="side-label">Insights</div>
          <button
            type="button"
            className={`side-item ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
            title="View Export Analytics & Reports"
          >
            <BarChart3 size={14} /> <span>Reports</span>
          </button>
          <button
            type="button"
            className={`side-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            title="View Customs & Bank Configuration"
          >
            <Settings2 size={14} /> <span>Settings</span>
          </button>

          <div className="user-chip">
            <span className="user-avatar">DM</span>
            <span>
              Divine Mathew<small>Operations Lead</small>
            </span>
          </div>
        </aside>

        {/* Main Software Interactive Workspace */}
        <div className="app-main">
          {/* Top Header Bar */}
          <div className="app-top">
            <div className="app-top-left-group">
              {/* Mobile Burger Menu Button (Visible on mobile/tablet) */}
              <button
                type="button"
                className={`demo-mobile-burger-btn ${mobileMenuOpen ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Demo Web Pages Menu"
                title="View All Demo Web Pages"
              >
                <span className="demo-burger-icon-box">
                  {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
                </span>
                <span className="demo-burger-text-group">
                  <span className="demo-burger-badge">MENU</span>
                  <span className="demo-burger-curr-name">{headerMeta.title}</span>
                </span>
                <ChevronDown size={13} className={`demo-burger-arrow ${mobileMenuOpen ? 'open' : ''}`} />
              </button>

              <div className="app-greeting">
                <small>Master Export Pro Enterprise v2.4 · Live Workspace</small>
                <strong>{headerMeta.title}</strong>
              </div>
            </div>

            <div className="app-top-right">
              <span className="period">
                This month <ChevronDown size={11} />
              </span>
              <span className="app-bell-wrapper" title="Operational Alerts (3 Unread)">
                <Bell size={14} />
                <span className="app-bell-badge" />
              </span>
            </div>
          </div>

          {/* Mobile Burger Menu Dropdown Drawer */}
          {mobileMenuOpen && (
            <div className="demo-burger-backdrop" onClick={() => setMobileMenuOpen(false)}>
              <div
                className="demo-burger-drawer"
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-label="Demo Pages Menu"
              >
                <div className="demo-burger-drawer-header">
                  <div>
                    <span className="demo-drawer-pill">ENTERPRISE ERP MODULES</span>
                    <h4 className="demo-drawer-title">Demo Web Pages &amp; Systems</h4>
                    <p className="demo-drawer-sub">Select any page below to preview its live interface</p>
                  </div>
                  <button
                    type="button"
                    className="demo-drawer-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="demo-burger-modules-list">
                  {DEMO_PAGES.map((page) => {
                    const IconComp = page.icon;
                    const isActive = activeTab === page.id;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        className={`demo-burger-item ${isActive ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTab(page.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className={`demo-burger-item-icon ${isActive ? 'active-icon' : ''}`}>
                          <IconComp size={16} />
                        </span>
                        <div className="demo-burger-item-info">
                          <div className="demo-burger-item-title-row">
                            <strong className="demo-burger-item-label">{page.label}</strong>
                            <span className="demo-burger-item-cat">{page.category}</span>
                          </div>
                          <span className="demo-burger-item-desc">{page.desc}</span>
                        </div>
                        {isActive ? (
                          <span className="demo-burger-active-badge">
                            <Check size={11} /> Active
                          </span>
                        ) : (
                          <span className="demo-burger-nav-arrow">→</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Subtitle / Overview Description */}
          <div className="app-overview">
            <div>
              <h3>{headerMeta.title}</h3>
              <p>{headerMeta.subtitle}</p>
            </div>
            <div className="app-overview-actions">
              <span className="app-live-sync-pill">
                <span className="live-pulse-dot" /> Live DGFT &amp; Port Sync
              </span>
            </div>
          </div>

          {/* TAB 1: DASHBOARD VIEW (Original Layout + Enhanced Live Data) */}
          {activeTab === 'dashboard' && (
            <div className="demo-page-view">
              <div className="metric-grid">
                <div className="metric">
                  <label>
                    <BriefcaseBusiness /> Open enquiries
                  </label>
                  <strong>{stats?.openEnquiries ?? 18}</strong>
                  <small>
                    <span className="up">{stats?.newEnquiriesThisMonth ?? 4} new</span> this month
                  </small>
                </div>
                <div className="metric">
                  <label>
                    <FileCheck2 /> Quotations
                  </label>
                  <strong>{stats?.quotationsPending ?? 12}</strong>
                  <small>Awaiting buyer response</small>
                </div>
                <div className="metric">
                  <label>
                    <Ship /> Shipments
                  </label>
                  <strong>
                    {stats?.activeShipments !== undefined
                      ? String(stats.activeShipments).padStart(2, '0')
                      : '07'}
                  </strong>
                  <small>In transit across sea lanes</small>
                </div>
                <div className="metric">
                  <label>
                    <WalletCards /> Outstanding
                  </label>
                  <strong>{stats?.outstandingReceivables ?? '$24,680'}</strong>
                  <small>Across {stats?.totalInvoicesCount ?? 6} commercial invoices</small>
                </div>
              </div>

              <div className="dashboard-columns">
                <section className="panel" aria-label="Sales pipeline preview">
                  <div className="panel-head">
                    <strong>Sales at a glance</strong>
                    <button
                      type="button"
                      className="panel-link-btn"
                      onClick={() => setActiveTab('sales')}
                    >
                      View sales <ArrowRight size={10} />
                    </button>
                  </div>
                  <div className="pipeline">
                    {(stats?.pipeline && stats.pipeline.length > 0
                      ? stats.pipeline
                      : [
                          { name: 'Enquiry', count: '08', client: 'Luma Trading', ref: 'ENQ-1042' },
                          { name: 'Quotation', count: '05', client: 'Nordwell GmbH', ref: 'QUO-0836' },
                          { name: 'Order', count: '04', client: 'Meridian Foods', ref: 'SO-0618' },
                          { name: 'Shipment', count: '03', client: 'Aster & Co.', ref: 'SHP-0291' },
                        ]
                    ).map((stage) => (
                      <div className="pipe-stage" key={stage.name}>
                        <header>
                          {stage.name}
                          <span className="pipe-count">{stage.count}</span>
                        </header>
                        <div className="pipe-card">
                          <b>{stage.client}</b>
                          <small>{stage.ref}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="panel" aria-label="Recent order records preview">
                  <div className="panel-head">
                    <strong>Recent orders</strong>
                    <button
                      type="button"
                      className="panel-link-btn"
                      onClick={() => setActiveTab('sales')}
                    >
                      All orders <ArrowRight size={10} />
                    </button>
                  </div>
                  <table className="mini-table">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Buyer</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SO-0618</td>
                        <td>Meridian Foods</td>
                        <td>
                          <span className="status">Confirmed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>SO-0617</td>
                        <td>Nordwell GmbH</td>
                        <td>
                          <span className="status ship">Shipment</span>
                        </td>
                      </tr>
                      <tr>
                        <td>SO-0616</td>
                        <td>Luma Trading</td>
                        <td>
                          <span className="status due">Invoice due</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMERS VIEW */}
          {activeTab === 'customers' && (
            <div className="demo-page-view">
              {/* High-density mini metrics */}
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Global Buyers</span>
                  <span className="strip-value">48 Active</span>
                  <span className="strip-sub">Across 14 Countries</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">KYC Verified</span>
                  <span className="strip-value text-emerald-600">100% Compliant</span>
                  <span className="strip-sub">DGFT &amp; FIU Cleared</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Active Trade Exposure</span>
                  <span className="strip-value">$684,200</span>
                  <span className="strip-sub">Under Bank LC / Credit</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Primary Destinations</span>
                  <span className="strip-value">EU · GCC · ASEAN</span>
                  <span className="strip-sub">6 Direct Sea Corridors</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="demo-toolbar">
                <div className="demo-search-input-wrapper">
                  <Search size={12} className="demo-search-icon" />
                  <input
                    type="text"
                    placeholder="Search buyers by company, contact, or country..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="demo-search-input"
                  />
                </div>
                <div className="demo-toolbar-actions">
                  <div className="demo-filter-wrapper">
                    <Filter size={11} className="demo-filter-icon" />
                    <select
                      value={customerCountryFilter}
                      onChange={(e) => setCustomerCountryFilter(e.target.value)}
                      className="demo-filter-select"
                    >
                      <option value="All">All Countries</option>
                      <option value="Germany">Germany</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="UAE">UAE</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="United States">United States</option>
                    </select>
                  </div>
                  <button type="button" className="demo-btn-primary">
                    <Plus size={11} /> <span>New Buyer</span>
                  </button>
                </div>
              </div>

              {/* Customers Table */}
              <div className="demo-table-wrapper">
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>Buyer Company</th>
                      <th>Destination</th>
                      <th>Primary Contact</th>
                      <th>KYC Status</th>
                      <th>Orders</th>
                      <th>Trade Exposure</th>
                      <th>Approved Terms</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((cust) => (
                      <tr key={cust.id}>
                        <td className="font-semibold text-slate-800">
                          <div className="demo-table-company">
                            <span className="demo-company-avatar">
                              <Building2 size={11} />
                            </span>
                            <span>{cust.name}</span>
                          </div>
                        </td>
                        <td>
                          <span className="demo-country-pill">
                            <span className="flag">{cust.flag}</span> {cust.city}, {cust.country}
                          </span>
                        </td>
                        <td>
                          <div className="demo-contact-cell">
                            <strong>{cust.contact}</strong>
                            <small>{cust.role}</small>
                          </div>
                        </td>
                        <td>
                          <span className="demo-status-pill status-verified">
                            <CheckCircle2 size={10} /> Verified
                          </span>
                        </td>
                        <td>
                          <span className="demo-count-badge">{cust.ordersCount}</span>
                        </td>
                        <td className="font-mono text-slate-900 font-semibold">
                          {cust.activeExposure}
                        </td>
                        <td>
                          <span className="demo-terms-tag">{cust.terms}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTS VIEW */}
          {activeTab === 'products' && (
            <div className="demo-page-view">
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Registered SKUs</span>
                  <span className="strip-value">142 Products</span>
                  <span className="strip-sub">Commercial Export Catalogue</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">HS Tariff Compliance</span>
                  <span className="strip-value text-emerald-600">100% Validated</span>
                  <span className="strip-sub">Customs Tariffs 2026</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Available Inventory</span>
                  <span className="strip-value">$1,420,000</span>
                  <span className="strip-sub">Warehouse &amp; Port Ready</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Active Chapters</span>
                  <span className="strip-value">Ch. 09, 10, 52, 73</span>
                  <span className="strip-sub">Harmonized System</span>
                </div>
              </div>

              {/* Category Filter Toolbar */}
              <div className="demo-toolbar">
                <div className="demo-tab-pills">
                  {['All', 'Agricultural', 'Spices', 'Engineering', 'Textiles'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`demo-tab-pill ${productCategoryFilter === cat ? 'active' : ''}`}
                      onClick={() => setProductCategoryFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <button type="button" className="demo-btn-primary">
                  <Plus size={11} /> <span>Register SKU</span>
                </button>
              </div>

              <div className="demo-table-wrapper">
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>SKU Code</th>
                      <th>Product Name</th>
                      <th>HS Code</th>
                      <th>Category</th>
                      <th>Export Packaging</th>
                      <th>Export Tariff</th>
                      <th>Warehouse Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.sku}>
                        <td>
                          <span className="demo-sku-tag">{p.sku}</span>
                        </td>
                        <td className="font-semibold text-slate-800">{p.name}</td>
                        <td>
                          <span className="demo-hs-badge">{p.hsCode}</span>
                        </td>
                        <td>
                          <span className="demo-category-tag">{p.category}</span>
                        </td>
                        <td className="text-slate-600 text-[10px]">{p.packing}</td>
                        <td className="font-mono font-semibold text-slate-900">{p.price}</td>
                        <td>
                          <span
                            className={`demo-status-pill ${
                              p.status === 'Available' ? 'status-verified' : 'status-warning'
                            }`}
                          >
                            {p.stock}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SALES VIEW */}
          {activeTab === 'sales' && (
            <div className="demo-page-view">
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Pipeline Value</span>
                  <span className="strip-value">$842,000</span>
                  <span className="strip-sub">Active Trade Contracts</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Confirmed Orders</span>
                  <span className="strip-value text-emerald-600">15 Confirmed</span>
                  <span className="strip-sub">Under Production/Dispatch</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Average Contract</span>
                  <span className="strip-value">$56,130</span>
                  <span className="strip-sub">Across 18 Shipments</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Realization Ratio</span>
                  <span className="strip-value text-blue-600">94.2%</span>
                  <span className="strip-sub">On-time Delivery &amp; Pay</span>
                </div>
              </div>

              <div className="demo-toolbar">
                <div className="demo-tab-pills">
                  {['All', 'Confirmed', 'Quotation', 'Dispatch Ready', 'Enquiry', 'In Shipment'].map(
                    (stage) => (
                      <button
                        key={stage}
                        type="button"
                        className={`demo-tab-pill ${salesStageFilter === stage ? 'active' : ''}`}
                        onClick={() => setSalesStageFilter(stage)}
                      >
                        {stage}
                      </button>
                    )
                  )}
                </div>
                <button type="button" className="demo-btn-primary">
                  <Plus size={11} /> <span>Create Contract</span>
                </button>
              </div>

              <div className="demo-table-wrapper">
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>Contract / PO</th>
                      <th>Buyer</th>
                      <th>Export Items</th>
                      <th>Incoterm &amp; Port</th>
                      <th>Contract Value</th>
                      <th>Delivery Window</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((so) => (
                      <tr key={so.ref}>
                        <td>
                          <span className="demo-order-ref">{so.ref}</span>
                        </td>
                        <td className="font-semibold text-slate-800">{so.buyer}</td>
                        <td className="text-slate-600">{so.items}</td>
                        <td>
                          <span className="demo-port-pill">
                            <strong>{so.incoterm}</strong> {so.destination}
                          </span>
                        </td>
                        <td className="font-mono font-semibold text-slate-900">{so.value}</td>
                        <td className="text-[10px] text-slate-500">{so.delivery}</td>
                        <td>
                          <span
                            className={`demo-status-pill ${
                              so.status === 'Confirmed'
                                ? 'status-confirmed'
                                : so.status === 'Quotation'
                                ? 'status-quote'
                                : so.status === 'Dispatch Ready'
                                ? 'status-ready'
                                : so.status === 'In Shipment'
                                ? 'status-ship'
                                : 'status-enquiry'
                            }`}
                          >
                            {so.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: SHIPMENTS VIEW */}
          {activeTab === 'shipments' && (
            <div className="demo-page-view">
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Active Shipments</span>
                  <span className="strip-value">07 In Transit</span>
                  <span className="strip-sub">Ocean &amp; Air Freight</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Containers at Sea</span>
                  <span className="strip-value">14 TEUs</span>
                  <span className="strip-sub">FCL Commercial Freight</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Port Clearances</span>
                  <span className="strip-value text-emerald-600">100% Cleared</span>
                  <span className="strip-sub">Customs Inspection Passed</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Avg Transit Time</span>
                  <span className="strip-value">18.4 Days</span>
                  <span className="strip-sub">POL ➔ POD Velocity</span>
                </div>
              </div>

              <div className="demo-toolbar">
                <div className="demo-tab-pills">
                  {['All', 'MSC', 'CMA CGM', 'Hapag', 'ONE', 'Maersk'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      className={`demo-tab-pill ${shipmentCarrierFilter === c ? 'active' : ''}`}
                      onClick={() => setShipmentCarrierFilter(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <button type="button" className="demo-btn-primary">
                  <Plus size={11} /> <span>Book Cargo</span>
                </button>
              </div>

              <div className="demo-table-wrapper">
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>Shipment ID</th>
                      <th>Container No.</th>
                      <th>Ocean BL No.</th>
                      <th>Carrier &amp; Vessel</th>
                      <th>Port Route (POL ➔ POD)</th>
                      <th>ETD / ETA</th>
                      <th>Milestone Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShipments.map((sh) => (
                      <tr key={sh.id}>
                        <td>
                          <span className="demo-order-ref">{sh.id}</span>
                        </td>
                        <td className="font-mono text-[10px] text-slate-700">{sh.container}</td>
                        <td>
                          <span className="demo-bl-pill">{sh.blNo}</span>
                        </td>
                        <td>
                          <div className="demo-carrier-cell">
                            <strong>{sh.carrier}</strong>
                            <small>{sh.vessel}</small>
                          </div>
                        </td>
                        <td className="text-slate-700 font-medium text-[10px]">{sh.route}</td>
                        <td className="text-[10px] text-slate-500">
                          {sh.etd} ➔ {sh.eta}
                        </td>
                        <td>
                          <span
                            className={`demo-status-pill ${
                              sh.status === 'Delivered'
                                ? 'status-confirmed'
                                : sh.status === 'Customs Cleared'
                                ? 'status-ready'
                                : 'status-ship'
                            }`}
                          >
                            {sh.milestone}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: INVOICES & PAYMENTS VIEW */}
          {activeTab === 'invoices' && (
            <div className="demo-page-view">
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Total Billed</span>
                  <span className="strip-value">$542,600</span>
                  <span className="strip-sub">Commercial Invoices YTD</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Settled &amp; Realized</span>
                  <span className="strip-value text-emerald-600">$486,300</span>
                  <span className="strip-sub">e-BRC Issued by RBI</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Outstanding Receivables</span>
                  <span className="strip-value text-amber-600">$56,300</span>
                  <span className="strip-sub">Across 2 Active Shipments</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Forex Gain / Delta</span>
                  <span className="strip-value text-emerald-600">+2.4%</span>
                  <span className="strip-sub">+$12,800 USD Hedging</span>
                </div>
              </div>

              <div className="demo-toolbar">
                <div className="demo-tab-pills">
                  {['All', 'Bank Advised', 'Payment Due', 'Settled'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      className={`demo-tab-pill ${invoiceStatusFilter === st ? 'active' : ''}`}
                      onClick={() => setInvoiceStatusFilter(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
                <button type="button" className="demo-btn-primary">
                  <Plus size={11} /> <span>Generate Invoice</span>
                </button>
              </div>

              <div className="demo-table-wrapper">
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>Invoice No.</th>
                      <th>Order Ref</th>
                      <th>Buyer</th>
                      <th>Invoice Value</th>
                      <th>Payment Terms</th>
                      <th>Swift / Due Date</th>
                      <th>Settlement Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInvoices.map((inv) => (
                      <tr key={inv.invNo}>
                        <td>
                          <span className="demo-invoice-ref">{inv.invNo}</span>
                        </td>
                        <td>
                          <span className="demo-order-ref">{inv.orderRef}</span>
                        </td>
                        <td className="font-semibold text-slate-800">{inv.buyer}</td>
                        <td className="font-mono font-bold text-slate-900">{inv.amount}</td>
                        <td className="text-slate-600 text-[10px]">{inv.terms}</td>
                        <td>
                          <div className="demo-swift-cell">
                            <strong>{inv.dueDate}</strong>
                            <small>{inv.swiftRef}</small>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`demo-status-pill ${
                              inv.status === 'Settled'
                                ? 'status-confirmed'
                                : inv.status === 'Bank Advised'
                                ? 'status-ready'
                                : 'status-warning'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: REPORTS VIEW */}
          {activeTab === 'reports' && (
            <div className="demo-page-view">
              <div className="demo-metrics-strip">
                <div className="demo-strip-card">
                  <span className="strip-label">Q3 Export Turnover</span>
                  <span className="strip-value">$1,840,000</span>
                  <span className="strip-sub text-emerald-600">+18.4% QoQ Growth</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Duty Drawback &amp; RoDTEP</span>
                  <span className="strip-value text-emerald-600">$34,800 USD</span>
                  <span className="strip-sub">99.4% Customs Realization</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Realization Velocity</span>
                  <span className="strip-value">26.2 Days</span>
                  <span className="strip-sub">Industry Avg: 44.0 Days</span>
                </div>
                <div className="demo-strip-card">
                  <span className="strip-label">Audit Pass Rate</span>
                  <span className="strip-value text-emerald-600">99.8%</span>
                  <span className="strip-sub">Zero Customs Penalties</span>
                </div>
              </div>

              <div className="dashboard-columns">
                {/* Regional Export Volumes */}
                <section className="panel" aria-label="Trade Volume by Continent">
                  <div className="panel-head">
                    <strong>Export Volume by Trade Region</strong>
                    <span className="text-slate-500 text-[9px]">FY 2026-27 YTD</span>
                  </div>
                  <div className="p-3 space-y-3">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-semibold text-slate-800">European Union (Germany, UK, NL)</span>
                        <span className="font-mono text-slate-700 font-bold">$846,400 (46%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '46%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-semibold text-slate-800">Middle East &amp; GCC (UAE, Saudi)</span>
                        <span className="font-mono text-slate-700 font-bold">$588,800 (32%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="font-semibold text-slate-800">Southeast Asia (Singapore, Malaysia)</span>
                        <span className="font-mono text-slate-700 font-bold">$404,800 (22%)</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '22%' }} />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Commodity Distribution */}
                <section className="panel" aria-label="Top Commodities">
                  <div className="panel-head">
                    <strong>Top Export Commodities</strong>
                    <span className="text-slate-500 text-[9px]">Gross Margin</span>
                  </div>
                  <div className="p-2">
                    <table className="mini-table">
                      <thead>
                        <tr>
                          <th>Commodity</th>
                          <th>Revenue</th>
                          <th>Margin</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Basmati Rice 1121</td>
                          <td className="font-mono">$640,000</td>
                          <td><span className="status">21.4%</span></td>
                        </tr>
                        <tr>
                          <td>Malabar Spices</td>
                          <td className="font-mono">$510,000</td>
                          <td><span className="status">28.0%</span></td>
                        </tr>
                        <tr>
                          <td>Precision Flanges</td>
                          <td className="font-mono">$380,000</td>
                          <td><span className="status">34.2%</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* TAB 8: SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="demo-page-view">
              <div className="demo-settings-grid">
                {/* Trade Entity Card */}
                <div className="panel p-3">
                  <div className="panel-head mb-2 pb-2">
                    <strong className="flex items-center gap-2">
                      <ShieldCheck size={13} className="text-orange-500" />
                      <span>Company Trade &amp; Regulatory Credentials</span>
                    </strong>
                    <span className="demo-status-pill status-verified">Verified</span>
                  </div>
                  <div className="space-y-2 text-[10px]">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Legal Entity Name</span>
                      <strong className="text-slate-800">Master Export Pro Global Logistics LLP</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Import Export Code (IEC)</span>
                      <span className="font-mono font-bold text-slate-800">0319028471 (DGFT Active)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Authorized Dealer (AD) Code</span>
                      <span className="font-mono font-bold text-slate-800">0210084 · SBI Overseas Branch</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">GSTIN &amp; Export LUT</span>
                      <span className="font-mono text-slate-800">27AABCM9210F1Z4 · LUT/2026-27/EX-00912</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">EPC Memberships</span>
                      <span className="text-slate-800 font-semibold">APEDA, EEPC, Spices Board of India</span>
                    </div>
                  </div>
                </div>

                {/* Customs & Bank Automation */}
                <div className="panel p-3">
                  <div className="panel-head mb-2 pb-2">
                    <strong className="flex items-center gap-2">
                      <Settings2 size={13} className="text-orange-500" />
                      <span>Automation &amp; Customs Integration</span>
                    </strong>
                    <span className="demo-status-pill status-ready">Active</span>
                  </div>
                  <div className="space-y-2 text-[10px]">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Default Incoterms®</span>
                      <span className="text-slate-800 font-semibold">Incoterms 2020 Rules (CIF / FOB)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">ICEGATE Shipping Bill API</span>
                      <span className="text-emerald-600 font-semibold">Connected (Direct EDI Push)</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">Class-3 DSC Token</span>
                      <span className="text-emerald-600 font-semibold">Active · Valid until Dec 2027</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-slate-500">RBI EDPMS / e-BRC Reconciliation</span>
                      <span className="text-emerald-600 font-semibold">Automated Daily Bank Pull</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-500">AIS Ocean Carrier GPS</span>
                      <span className="text-slate-800 font-semibold">Real-Time Vessel Satellite Feed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dynamic Software Bottom Caption */}
      <div className="preview-caption">
        <span className="caption-left">
          <span className="caption-dot" /> Click any navigation menu item to explore live software modules: Customers, Products, Sales, Shipments, Invoices, Reports &amp; Settings.
        </span>
        <span className="caption-label">{headerMeta.caption}</span>
      </div>
    </div>
  );
}
