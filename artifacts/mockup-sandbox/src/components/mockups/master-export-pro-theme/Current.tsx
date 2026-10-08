import "./_group.css";
import { useState } from 'react';
import {
  ArrowDownRight, ArrowRight, BarChart3, Bell, Boxes, BriefcaseBusiness,
  Check, ChevronDown, CircleDollarSign, ClipboardList, FileCheck2,
  FileText, Globe2, LayoutDashboard, Menu, PackageSearch,
  ReceiptText, Settings2, Ship, Users, WalletCards, X,
} from 'lucide-react';

const processSteps = [
  { label: 'Enquiry', icon: PackageSearch },
  { label: 'Quotation', icon: FileText },
  { label: 'Sales order', icon: ClipboardList },
  { label: 'Shipment', icon: Ship },
  { label: 'Invoice', icon: ReceiptText },
  { label: 'Payment', icon: CircleDollarSign },
];

const features = [
  {
    icon: Users,
    title: 'A customer record worth keeping',
    copy: 'Keep buyer details together, then use the same customer record as an enquiry moves into a quotation and an order.',
  },
  {
    icon: Boxes,
    title: 'Products, ready to quote',
    copy: 'Maintain a clear product list and select from it when preparing quotations and sales orders.',
  },
  {
    icon: ClipboardList,
    title: 'A sales trail you can follow',
    copy: 'Bring enquiries, quotations and confirmed orders into one view, with the context that connects each stage.',
  },
  {
    icon: Ship,
    title: 'Shipment details beside the order',
    copy: 'Keep shipment records tied to the sales work they belong to, rather than scattered across separate follow-up.',
  },
  {
    icon: WalletCards,
    title: 'Invoices and payments in view',
    copy: 'Record invoices and payment status as part of the same order journey, so the commercial picture stays together.',
  },
  {
    icon: BarChart3,
    title: 'An overview for the working day',
    copy: 'Use the dashboard and reports to get a clear read on current export operations and the records behind them.',
  },
];

const productAreas = [
  { icon: LayoutDashboard, label: 'Dashboard', description: 'A concise view of activity across the operation.' },
  { icon: Users, label: 'Customers', description: 'Buyer records kept in one dependable place.' },
  { icon: Boxes, label: 'Products', description: 'A shared catalogue for sales documents.' },
  { icon: BriefcaseBusiness, label: 'Sales', description: 'Enquiries, quotations and sales orders.' },
  { icon: Ship, label: 'Shipments', description: 'Shipment records connected to sales.' },
  { icon: ReceiptText, label: 'Invoices & payments', description: 'Keep billing and payment status in view.' },
  { icon: BarChart3, label: 'Reports', description: 'A practical overview of your records.' },
  { icon: Settings2, label: 'Settings', description: 'The essentials for your workspace.' },
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a className={`brand ${footer ? 'footer-brand' : ''}`} href="#top" aria-label="Master Export Pro home">
      <span className="brand-mark" aria-hidden="true" />
      <span className="brand-name">Master <span>Export Pro</span></span>
    </a>
  );
}

function ProductPreview() {
  return (
    <div className="preview-frame" aria-label="Illustrative dashboard preview">
      <div className="app-window">
        <aside className="app-sidebar" aria-label="Product navigation preview">
          <div className="app-brand"><span className="brand-mark" aria-hidden="true" /> Master Export Pro</div>
          <div className="side-label">Workspace</div>
          <div className="side-item active"><LayoutDashboard /> Dashboard</div>
          <div className="side-item"><Users /> Customers</div>
          <div className="side-item"><Boxes /> Products</div>
          <div className="side-label">Export operations</div>
          <div className="side-item"><BriefcaseBusiness /> Sales</div>
          <div className="side-item"><Ship /> Shipments</div>
          <div className="side-item"><ReceiptText /> Invoices &amp; payments</div>
          <div className="side-label">Insights</div>
          <div className="side-item"><BarChart3 /> Reports</div>
          <div className="side-item"><Settings2 /> Settings</div>
          <div className="user-chip"><span className="user-avatar">AM</span><span>A. Morgan<small>Operations</small></span></div>
        </aside>
        <div className="app-main">
          <div className="app-top">
            <div className="app-greeting"><small>Tuesday, 18 June</small><strong>Good morning, Alex</strong></div>
            <div className="app-top-right"><span className="period">This month <ChevronDown size={11} /></span><Bell size={14} /></div>
          </div>
          <div className="app-overview">
            <div><h3>Operations overview</h3><p>A clear view of the work moving through your business.</p></div>
            <span className="new-button"><ArrowDownRight size={12} /> New enquiry</span>
          </div>
          <div className="metric-grid">
            <div className="metric"><label><BriefcaseBusiness /> Open enquiries</label><strong>18</strong><small><span className="up">4 new</span> this month</small></div>
            <div className="metric"><label><FileCheck2 /> Quotations</label><strong>12</strong><small>Awaiting buyer response</small></div>
            <div className="metric"><label><Ship /> Shipments</label><strong>07</strong><small>In progress</small></div>
            <div className="metric"><label><WalletCards /> Outstanding</label><strong>$24,680</strong><small>Across 6 invoices</small></div>
          </div>
          <div className="dashboard-columns">
            <section className="panel" aria-label="Sales pipeline preview">
              <div className="panel-head"><strong>Sales at a glance</strong><span>View sales <ArrowRight size={10} /></span></div>
              <div className="pipeline">
                {[
                  { name: 'Enquiry', count: '08', client: 'Luma Trading', ref: 'ENQ-1042' },
                  { name: 'Quotation', count: '05', client: 'Nordwell GmbH', ref: 'QUO-0836' },
                  { name: 'Order', count: '04', client: 'Meridian Foods', ref: 'SO-0618' },
                  { name: 'Shipment', count: '03', client: 'Aster & Co.', ref: 'SHP-0291' },
                ].map((stage) => (
                  <div className="pipe-stage" key={stage.name}>
                    <header>{stage.name}<span className="pipe-count">{stage.count}</span></header>
                    <div className="pipe-card"><b>{stage.client}</b><small>{stage.ref}</small></div>
                  </div>
                ))}
              </div>
            </section>
            <section className="panel" aria-label="Recent order records preview">
              <div className="panel-head"><strong>Recent orders</strong><span>All orders <ArrowRight size={10} /></span></div>
              <table className="mini-table">
                <thead><tr><th>Order</th><th>Buyer</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>SO-0618</td><td>Meridian Foods</td><td><span className="status">Confirmed</span></td></tr>
                  <tr><td>SO-0617</td><td>Nordwell GmbH</td><td><span className="status ship">Shipment</span></td></tr>
                  <tr><td>SO-0616</td><td>Luma Trading</td><td><span className="status due">Invoice due</span></td></tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>
      <div className="preview-caption">
        <span className="caption-left"><span className="caption-dot" /> One connected view, from first enquiry to payment</span>
        <span className="caption-label">PRODUCT PREVIEW · ILLUSTRATIVE DATA</span>
      </div>
    </div>
  );
}

function DocumentPreview() {
  return (
    <div className="control-visual" aria-label="Illustrative export quotation document">
      <div className="paper-sheet">
        <div className="doc-top">
          <div className="doc-brand">MASTER EXPORT PRO<small>SALES DOCUMENT · QUOTATION</small></div>
          <span className="doc-tag">QUO-0836</span>
        </div>
        <div className="doc-title">Quotation</div>
        <div className="doc-meta">
          <div><label>Prepared for</label><b>Nordwell GmbH</b></div>
          <div><label>Issue date</label><b>18 June 2025</b></div>
          <div><label>Reference</label><b>ENQ-1042</b></div>
          <div><label>Currency</label><b>USD</b></div>
        </div>
        <table className="doc-table">
          <thead><tr><th>Product</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Precision valve assembly</td><td>240</td><td>$38.50</td><td>$9,240.00</td></tr>
            <tr><td>Service parts kit</td><td>80</td><td>$12.00</td><td>$960.00</td></tr>
          </tbody>
        </table>
        <div className="doc-total"><span>Quotation total</span><b>$10,200.00</b></div>
        <div className="doc-foot"><span>Prepared in Master Export Pro</span><span>Page 1 of 1</span></div>
      </div>
      <div className="control-caption">One buyer. One order trail.<span>INFORMATION REUSED THROUGH THE WORKFLOW</span></div>
    </div>
  );
}

export function Current() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  const navLinks = [
    { href: '#workflow', text: 'How it works' },
    { href: '#capabilities', text: 'Capabilities' },
    { href: '#product', text: 'Product' },
  ];

  return (
    <div className="site-shell" id="top">
      <header className="topbar">
        <div className="wrap nav-inner">
          <Brand />
          <nav className="nav-links" aria-label="Main navigation">
            {navLinks.map((link) => <a href={link.href} key={link.href}>{link.text}</a>)}
          </nav>
          <div className="nav-actions">
            <a className="nav-quiet" href="#workflow">See the workflow</a>
            <a className="button button-primary" href="#contact">Explore the product <ArrowRight size={15} /></a>
          </div>
          <button className="mobile-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {navLinks.map((link) => <a href={link.href} key={link.href} onClick={closeMenu}>{link.text}</a>)}
            <a className="button" href="#contact" onClick={closeMenu}>Explore the product <ArrowRight size={15} /></a>
          </nav>
        )}
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <div className="eyebrow center">Export operations, brought together</div>
            <h1 id="hero-title">Every export order.<br /><em>One clear line forward.</em></h1>
            <p className="hero-copy">From a buyer’s first enquiry to the final payment, keep the details connected. Master Export Pro brings your export work into one practical, traceable flow.</p>
            <div className="hero-ctas">
              <a className="button button-primary" href="#product">See the product preview <ArrowRight size={15} /></a>
              <a className="button button-outline" href="#workflow">Follow an order <ArrowDownRight size={15} /></a>
            </div>
            <div className="hero-note"><Globe2 size={14} /> Built around the day-to-day work of export businesses</div>
            <div className="workflow-line" aria-label="Export workflow: enquiry, quotation, sales order, shipment, invoice, payment">
              {processSteps.map((step, index) => (
                <div className="workflow-step" key={step.label}>
                  <b>0{index + 1}</b><span>{step.label}</span>
                  {index < processSteps.length - 1 && <span className="workflow-connector" aria-hidden="true" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="preview-region" id="product" aria-label="Master Export Pro dashboard preview">
          <div className="wrap"><ProductPreview /></div>
        </section>

        <section className="section workflow-section" id="workflow">
          <div className="wrap">
            <div className="section-header">
              <div className="eyebrow">A connected order journey</div>
              <h2>Less chasing across files.<br />More context at every step.</h2>
              <p>When the same buyer and order details live in separate places, follow-up gets fragmented. Keep the journey together, so the next stage starts with the information already in hand.</p>
            </div>
            <div className="workflow-grid">
              {processSteps.map((step, index) => {
                const StepIcon = step.icon;
                const descriptions = [
                  'Capture the buyer’s request and the details to follow up.',
                  'Prepare a quotation from your customer and product records.',
                  'Carry the agreed sale into a clear order record.',
                  'Keep shipment information linked to its sales order.',
                  'Record the invoice alongside the work it belongs to.',
                  'Track payment status without losing the order context.',
                ];
                return (
                  <article className="workflow-card" key={step.label}>
                    <div className="step-num">STAGE 0{index + 1}<ArrowRight size={12} /></div>
                    <div className="step-icon"><StepIcon /></div>
                    <h3>{step.label}</h3>
                    <p>{descriptions[index]}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="feature-section" id="capabilities">
          <div className="wrap feature-layout">
            <div className="feature-copy">
              <div className="eyebrow">Made for the work between steps</div>
              <h2>Operations need more than a list of deals.</h2>
              <p>Export work is a chain of real records: buyers, products, orders, shipments and money due. Keep those pieces close enough to make the next action clear.</p>
              <a className="feature-link" href="#product">See the product in context <ArrowRight size={14} /></a>
            </div>
            <div className="feature-list">
              {features.map((feature) => {
                const FeatureIcon = feature.icon;
                return (
                  <article className="feature-row" key={feature.title}>
                    <div className="feature-icon"><FeatureIcon /></div>
                    <div><h3>{feature.title}</h3><p>{feature.copy}</p></div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="control-section" aria-labelledby="control-title">
          <div className="wrap control-inner">
            <div className="control-copy">
              <div className="eyebrow">Start with the details you already have</div>
              <h2 id="control-title">Enter it once.<br />Carry it forward.</h2>
              <p>Build the customer and product record as you work. Reuse that information across sales documents and keep the links between enquiry, order, shipment and payment visible.</p>
              <div className="control-points">
                <div className="control-point"><Check size={15} /> Shared customer records</div>
                <div className="control-point"><Check size={15} /> Products ready for sales</div>
                <div className="control-point"><Check size={15} /> Connected order stages</div>
                <div className="control-point"><Check size={15} /> Invoice and payment view</div>
              </div>
            </div>
            <DocumentPreview />
          </div>
        </section>

        <section className="scope-section" aria-labelledby="scope-title">
          <div className="wrap">
            <div className="scope-top">
              <div className="section-header">
                <div className="eyebrow">A practical working set</div>
                <h2 id="scope-title">The core of export operations, in one place.</h2>
              </div>
              <p className="scope-note">Focused on the essential records that keep everyday export work moving.</p>
            </div>
            <div className="scope-grid">
              {productAreas.map((area, index) => {
                const AreaIcon = area.icon;
                return (
                  <article className="scope-card" key={area.label}>
                    <div className="scope-card-top"><AreaIcon /><small>0{index + 1}</small></div>
                    <h3>{area.label}</h3>
                    <p>{area.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="closing" id="contact">
          <div className="wrap closing-inner">
            <div>
              <div className="eyebrow">A clearer view of the whole order</div>
              <h2>Bring the export trail together.</h2>
              <p>See how one connected workflow can fit the way your team follows an order.</p>
            </div>
            <div className="closing-actions">
              <a className="button button-white" href="#workflow">Walk through the stages <ArrowRight size={15} /></a>
              <a className="button button-outline" href="#product">Return to preview <ArrowDownRight size={15} /></a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <Brand footer />
          <div className="footer-copy">An operational workspace for export businesses.</div>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="#workflow">Workflow</a><a href="#capabilities">Capabilities</a><a href="#top">Back to top</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

