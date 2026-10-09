import { useState, useEffect } from 'react';
import {
  ArrowRight, BarChart3, Bell, Boxes, BriefcaseBusiness,
  Check, ChevronDown, FileCheck2,
  Globe2, LayoutDashboard, Menu,
  ReceiptText, Settings2, Ship, Users, WalletCards, X,
  ShieldCheck, CheckCircle2, Clock, MapPin,
  Mail, Phone, Linkedin,
  Sparkles, Coins, Zap, MessageCircle
} from 'lucide-react';
import { WhatsAppButton, getWhatsAppUrl } from './components/WhatsAppButton';
import { AnimatedStatCounter } from './components/AnimatedStatCounter';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSupportSection } from './components/ContactSupportSection';
import { ScopeFeaturesSection } from './components/ScopeFeaturesSection';
import { FloatingBackToTop } from './components/FloatingBackToTop';
import { InteractiveWorkflow } from './components/InteractiveWorkflow';
import { InteractiveDemoDashboard } from './components/InteractiveDemoDashboard';
import { fetchHealth, fetchStats, type SystemStats } from './services/api';

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? 'footer-brand' : 'navbar-brand'}`}
      href="#top"
      aria-label="Master Export Pro home"
    >
      <img
        className={footer ? "footer-logo" : "brand-logo navbar-logo"}
        src="/images/master-export-pro-logo.png"
        alt="Master Export Pro"
      />
    </a>
  );
}

function ProductPreview({ stats }: { stats?: SystemStats | null }) {
  return <InteractiveDemoDashboard stats={stats} />;
}

function DocumentPreview() {
  return (
    <div className="control-visual quote-pro-container" aria-label="Professional export proforma quotation preview">
      <div className="paper-sheet quote-pro-sheet">
        {/* Subtle Brand Orange Top Rule Accent */}
        <div className="quote-pro-top-accent" aria-hidden="true" />

        {/* Clean Professional Header */}
        <div className="quote-pro-header">
          <div className="quote-pro-brand">
            <span className="quote-pro-logo">MASTER EXPORT PRO</span>
            <span className="quote-pro-subtitle">PROFORMA QUOTATION · NORDWELL GMBH</span>
          </div>
          <div className="quote-pro-ref-box">
            <span className="quote-pro-ref">#QUO-0836</span>
            <span className="quote-pro-status-pill">CIF HAMBURG</span>
          </div>
        </div>

        {/* Clean Line Items Table */}
        <div className="quote-pro-table-wrapper">
          <table className="quote-pro-table">
            <thead>
              <tr>
                <th className="th-desc">Item Description</th>
                <th className="th-hs">HS Code</th>
                <th className="th-qty">Quantity</th>
                <th className="th-rate">Unit Price</th>
                <th className="th-total">Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="td-desc">
                  <strong>Precision Valve Assembly</strong>
                  <small>PN40 Stainless Body Specification</small>
                </td>
                <td className="td-hs">8481.80</td>
                <td className="td-qty">240 pcs</td>
                <td className="td-rate">₹38.50</td>
                <td className="td-total">₹9,240.00</td>
              </tr>
              <tr>
                <td className="td-desc">
                  <strong>Service Maintenance Kit</strong>
                  <small>OEM High-Pressure Gasket Set</small>
                </td>
                <td className="td-hs">8481.90</td>
                <td className="td-qty">80 sets</td>
                <td className="td-rate">₹12.00</td>
                <td className="td-total">₹960.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Clean Totals & Commercial Settlement */}
        <div className="quote-pro-summary-block">
          <div className="quote-terms-note">
            <span className="terms-note-heading">Commercial Coverage</span>
            <p className="terms-note-text">
              Export packing, freight handling, and all-risk transit marine insurance are covered under agreed CIF Hamburg terms.
            </p>
          </div>
          <div className="quote-calc-block">
            <div className="quote-calc-row">
              <span className="calc-name">Subtotal (2 Items):</span>
              <span className="calc-value font-mono">₹10,200.00</span>
            </div>
            <div className="quote-calc-row">
              <span className="calc-name">CIF Freight &amp; Insurance:</span>
              <span className="calc-value font-mono text-slate-700">Included</span>
            </div>
            <div className="quote-grand-row">
              <span className="grand-name">Total CIF Payable:</span>
              <span className="grand-val font-mono">₹10,200.00</span>
            </div>
          </div>
        </div>

        {/* Clean Enterprise Document Footer */}
        <div className="quote-pro-footer">
          <div className="quote-footer-left">
            <CheckCircle2 size={13} className="quote-footer-check" />
            <span>Audit-ready export proforma · Authorized by Master Export Pro</span>
          </div>
          <a href="#product" className="quote-footer-action">
            <span>Convert to Order</span>
            <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [stats, setStats] = useState<SystemStats | null>(null);

  const [serverHealth, setServerHealth] = useState<{ status: string; stack: string; mongoDB: string }>({
    status: 'checking',
    stack: 'MERN Stack',
    mongoDB: 'checking'
  });

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    async function initData() {
      const health = await fetchHealth();
      setServerHealth(health);

      const statsData = await fetchStats();
      if (statsData) setStats(statsData);
    }
    initData();
  }, []);

  const navLinks = [
    { href: '#top', text: 'HOME +' },
    { href: '#about-solution', text: 'LOGISTICS +' },
    { href: '#product', text: 'PRODUCT +' },
    { href: '#workflow', text: 'WORKFLOW +' },
    { href: '#feedback', text: 'FEEDBACK +' },
    { href: '#contact', text: 'CONTACT US +' },
  ];

  return (
    <div className="site-shell" id="top">
      {/* =================================================================
          CARGO/LOGISTICS NAVBAR (Top Utility Bar + Angled White Logo Box + Orange Strip)
          ================================================================= */}
      <header className="cargo-navbar-wrapper">
        {/* Top Utility Bar (Deep Navy - Professional Global Trade Bar) */}
        <div className="top-utility-bar">
          <div className="utility-inner">
            <div className="utility-left">
              <a
                href="https://www.linkedin.com/company/mind-view-technologies/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="utility-social-icon"
                aria-label="Media Wave Technologies on LinkedIn"
                title="Media Wave Technologies LinkedIn"
              >
                <Linkedin size={12} />
              </a>
              <a
                href="https://mediawavetech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="utility-social-icon"
                aria-label="Media Wave Technologies Website"
                title="Media Wave Technologies Website"
              >
                <Globe2 size={12} />
              </a>
              <span className="utility-divider">|</span>
              <span className="utility-info-item">
                <MapPin size={11} className="utility-accent-icon" />
                <span>Global Export Operations</span>
              </span>
            </div>

            {/* Mobile Only Welcome Banner */}
            <div className="utility-mobile-welcome" aria-label="Welcome banner">
              <span>Heartly Welcome to Master Export Pro</span>
            </div>

            <div className="utility-right">
              <a href="mailto:info@mediawavetech.com" className="utility-contact-item">
                <Mail size={12} /> <span>info@mediawavetech.com</span>
              </a>
              <span className="utility-divider">|</span>
              <a href="tel:+916369153235" className="utility-contact-item">
                <Phone size={12} /> <span>+91 63691 53235</span>
              </a>
              <span className="utility-divider">|</span>
              <a href="#workflow" className="utility-quick-cta" title="Explore 6-Stage Export Journey">
                <Ship size={11} /> <span>Track Workflow</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Angled Navbar */}
        <div className="main-navbar-bar">
          {/* Angled White Logo Container */}
          <div className="navbar-logo-angled-box">
            <a href="#top" className="navbar-logo-link" aria-label="Master Export Pro Home">
              <img
                src="/images/master-export-pro-logo.png"
                alt="Master Export Pro"
                className="cargo-brand-logo"
              />
            </a>
          </div>

          {/* Right Vibrant Orange Strip */}
          <div className="navbar-orange-strip">
            <nav className="cargo-nav-links" aria-label="Main navigation">
              {navLinks.map((link) => (
                <a href={link.href} key={link.text} className="cargo-nav-item">
                  {link.text}
                </a>
              ))}
            </nav>

            <div className="cargo-nav-actions">
              <a
                href={getWhatsAppUrl("Hi Media Wave Technologies, I'd like to book a live demo of Master Export Pro. Please share the available slots.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-12 cargo-navbar-wa-btn"
                aria-label="Book Demo on WhatsApp"
              >
                <span>
                  <MessageCircle size={15} />
                  <span className="cargo-wa-label-full">Book Demo on WhatsApp</span>
                  <span className="cargo-wa-label-short">Book Demo</span>
                </span>
              </a>

              <button
                className="cargo-mobile-toggle"
                type="button"
                aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {menuOpen && (
          <nav className="cargo-mobile-drawer" aria-label="Mobile navigation">
            <div className="p-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  href={link.href}
                  key={link.text}
                  className="cargo-mobile-link"
                  onClick={closeMenu}
                >
                  {link.text}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-200 space-y-2">
                <WhatsAppButton variant="button" label="Book Demo on WhatsApp" className="w-full" />
              </div>
            </div>
          </nav>
        )}
      </header>

      <main>
        {/* =================================================================
            REVERTED CLASSIC HERO SECTION
            ================================================================= */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-content">
            <div className="eyebrow center">Export operations, brought together</div>
            <h1 id="hero-title">
              Every export order.<br />
              <em>One clear line forward.</em>
            </h1>
            <p className="hero-copy">
              Streamline international trade across every shipment, buyer, and contract.
              Master Export Pro unifies commercial invoices, freight logistics, customs workflows,
              and payment reconciliation into one high-performance, dependable platform.
            </p>
            <div className="hero-ctas">
              <a className="button-explore-product" href="#product">
                <span>Explore the Product</span>
                <ArrowRight size={16} className="explore-arrow" />
              </a>
            </div>
            <div className="hero-note">
              <Globe2 size={14} /> Built around the day-to-day work of export businesses
            </div>
          </div>
        </section>

        {/* =================================================================
            "THE BEST GLOBAL LOGISTICS SOLUTION FOR YOU"
            (Positioned immediately after Hero with Master Export Pro Container & Divine Mathew signature)
            ================================================================= */}
        <section className="logistics-about-section" id="about-solution" aria-labelledby="about-solution-title">
          <div className="wrap logistics-about-grid">
            {/* Left Column: Commercial Freight Truck with Master Export Pro container */}
            <div className="truck-image-wrapper">
              <div className="truck-orange-backdrop float-top" aria-hidden="true" />
              <img
                src="/images/truck-master-export-pro.jpg"
                alt="White semi-truck with Master Export Pro trailer container on highway at sunset"
                className="truck-main-img"
              />
              <div className="truck-orange-backdrop-bottom float-bottom" aria-hidden="true" />
            </div>

            {/* Right Column: Title, Accent Line, Paragraphs, 3 Stats, Divine Mathew Signature */}
            <div className="about-content-col">
              <h2 id="about-solution-title">
                The Best Global Logistics<br />Solution For You
              </h2>
              <div className="about-accent-line">
                <span />
                <span />
              </div>

              <p className="about-description">
                From port-to-port maritime freight to inland road transportation, Master Export Pro
                coordinates every phase of your international logistics network. We bridge the gap
                between trade documentation and real-world freight movements, giving your export
                team complete end-to-end visibility over container bookings, customs clearances,
                and delivery timelines across global trade lanes.
              </p>

              {/* 3 Orange Bold Metric Stats (Animates once on viewport entry) */}
              <div className="about-stats-grid">
                <div className="about-stat-item">
                  <strong>
                    <AnimatedStatCounter target={5874} suffix="M" delay={0} duration={1100} />
                  </strong>
                  <span className="about-stat-label">Clients Worldwide</span>
                </div>
                <div className="about-stat-item">
                  <strong>
                    <AnimatedStatCounter target={7894} suffix="M" delay={60} duration={1200} />
                  </strong>
                  <span className="about-stat-label">Delivered Goods</span>
                </div>
                <div className="about-stat-item">
                  <strong>
                    <AnimatedStatCounter target={8745} suffix="M" delay={120} duration={1300} />
                  </strong>
                  <span className="about-stat-label">Miles Driven</span>
                </div>
              </div>

              <p className="about-secondary-text">
                Whether managing full container loads (FCL), consolidated cargo (LCL), or urgent
                air freight dispatches, our unified operational framework ensures strict compliance
                with international trade protocols while safeguarding your shipment schedules
                and commercial margins.
              </p>
            </div>
          </div>
        </section>

        {/* Classic Dashboard Operations Preview */}
        <section className="preview-region" id="product" aria-label="Master Export Pro dashboard preview">
          <div className="wrap">
            <ProductPreview stats={stats} />
          </div>
        </section>

        {/* Architecture Highlights Bar: Continuous Marquee Scrolling Left-to-Right (Opposite Direction) */}
        <div className="architecture-features-strip" aria-label="Key export architecture capabilities">
          <div className="architecture-features-track">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((set) => (
              <div className="architecture-features-set" key={set}>
                <div className="feature-check-item">
                  <CheckCircle2 size={16} className="feature-check-icon" />
                  <span className="feature-check-text">Single-Admin Architecture</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 size={16} className="feature-check-icon" />
                  <span className="feature-check-text">Multi-Currency Support</span>
                </div>
                <div className="feature-check-item">
                  <CheckCircle2 size={16} className="feature-check-icon" />
                  <span className="feature-check-text">1-Click Export Invoices</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-width Professional Customization Marquee Ribbon: Right-to-Left (Reverted) */}
        <div className="requirements-marquee-bar" aria-label="Software customization announcement">
          <div className="requirements-marquee-track">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div className="requirements-marquee-item" key={item}>
                <span className="marquee-diamond">✦</span>
                <span className="marquee-phrase">This Software was customized with your business requirements</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive 6-Stage Connected Order Workflow */}
        <section className="workflow-section" id="workflow">
          <div className="wrap">
            <div className="section-header">
              <div className="eyebrow center">A connected order journey</div>
              <h2>
                Less chasing across files.<br />
                More context at every step.
              </h2>
              <p>
                When buyer and shipment records live in separate spreadsheets, follow-up breaks down.
                Keep the export journey synchronized from the first quotation to arrival port customs.
              </p>
            </div>
            <InteractiveWorkflow />
          </div>
        </section>

        {/* Scope Areas: The Core of Export Operations (8 Interactive Feature Modules - A PRACTICAL WORKING SET) */}
        <ScopeFeaturesSection />

        {/* Quotation Document Preview */}
        <section className="control-section" id="quotation" aria-labelledby="control-title">
          <div className="wrap control-inner">
            <div className="control-copy">
              <div className="eyebrow">Start with the details you already have</div>
              <h2 id="control-title">Enter it once.<br />Carry it forward.</h2>
              <p>
                Build the customer and product record as you work. Reuse that information across sales documents
                and keep the links between enquiry, order, shipment and payment visible.
              </p>
              <div className="control-points">
                <div className="control-point">
                  <span className="point-tick-badge" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <div className="control-point-content">
                    <span className="point-title">Shared customer records</span>
                    <span className="point-desc">Verified buyer profiles &amp; history</span>
                  </div>
                </div>
                <div className="control-point">
                  <span className="point-tick-badge" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <div className="control-point-content">
                    <span className="point-title">Products ready for sales</span>
                    <span className="point-desc">Pre-mapped HS codes &amp; pricing</span>
                  </div>
                </div>
                <div className="control-point">
                  <span className="point-tick-badge" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <div className="control-point-content">
                    <span className="point-title">Connected order stages</span>
                    <span className="point-desc">From quotation to sales order</span>
                  </div>
                </div>
                <div className="control-point">
                  <span className="point-tick-badge" aria-hidden="true">
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                  <div className="control-point-content">
                    <span className="point-title">Invoice and payment view</span>
                    <span className="point-desc">Live dispatch &amp; billing status</span>
                  </div>
                </div>
              </div>
            </div>
            <DocumentPreview />
          </div>
        </section>

        {/* Customer Feedback: What People Says */}
        <TestimonialsSection />

        {/* Enterprise Support & Developer Direct Lines (Media Wave Technologies) */}
        <ContactSupportSection />

      </main>

      {/* Footer */}
      <footer className="site-footer" id="footer">
        <div className="wrap">
          <div className="footer-main-grid">
            {/* Col 1: Brand & Contact Info */}
            <div className="footer-col-info">
              <Brand footer />
              <p className="footer-tagline">
                Connected international trade and export operations platform. Delivering dependable, end-to-end visibility for global commerce.
              </p>
              <div className="footer-trust-chip">
                <span className="footer-pulse-dot" />
                <span>Enterprise Export Platform</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="footer-col-nav">
              <h4 className="footer-col-title">Quick Navigation</h4>
              <nav className="footer-nav-list" aria-label="Footer navigation">
                <a href="#about-solution">Logistics Solution</a>
                <a href="#product">Interactive Product Demo</a>
                <a href="#workflow">6-Stage Export Journey</a>
                <a href="#scope">8 Feature Modules</a>
                <a href="#quotation">Export Quotations</a>
                <a href="#feedback">Client Feedback</a>
                <a href="#contact">Contact Support</a>
              </nav>
            </div>

            {/* Col 3: Media Wave Technologies Office Details */}
            <div className="footer-col-office">
              <h4 className="footer-col-title">Technology Partner</h4>
              <div className="footer-office-card">
                <div className="footer-office-company">
                  <strong>Media Wave Technologies</strong>
                  <span className="footer-role-badge">Official Solution Provider</span>
                </div>

                <div className="footer-office-item address-item">
                  <span className="footer-icon-bubble">
                    <MapPin size={15} />
                  </span>
                  <span className="footer-address-text">
                    WD-54, Anandha bhavan complex, 2nd floor, 17/52, Puthur High Rd, Tiruchirappalli, Tamil Nadu - 620017
                  </span>
                </div>

                <div className="footer-office-item">
                  <span className="footer-icon-bubble">
                    <Phone size={15} />
                  </span>
                  <span className="footer-contact-line">
                    <span className="footer-label">Office:</span>
                    <a href="tel:+916369153235" className="footer-link-val">
                      +91 63691 53235
                    </a>
                  </span>
                </div>

                <div className="footer-office-item">
                  <span className="footer-icon-bubble">
                    <Phone size={15} />
                  </span>
                  <span className="footer-contact-line">
                    <span className="footer-label">Developer:</span>
                    <a href="tel:+919940440767" className="footer-link-val">
                      +91 99404 40767
                    </a>
                  </span>
                </div>

                <div className="footer-office-item">
                  <span className="footer-icon-bubble">
                    <Mail size={15} />
                  </span>
                  <span className="footer-contact-line">
                    <span className="footer-label">Email:</span>
                    <a href="mailto:info@mediawavetech.com" className="footer-link-val">
                      info@mediawavetech.com
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-copy">
              © {new Date().getFullYear()} Master Export Pro. All Rights Reserved.
            </div>
        
              <span>Crafted by <strong>Media Wave Technologies</strong> · Tamil Nadu, India</span>
            
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <FloatingBackToTop />
    </div>
  );
}

export default App;
