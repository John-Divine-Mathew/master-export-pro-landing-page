import React from 'react';
import {
  LayoutDashboard,
  Users,
  Boxes,
  BriefcaseBusiness,
  Ship,
  ReceiptText,
  BarChart3,
  Settings2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

export interface ScopeCardItem {
  step: string;
  title: string;
  tagline: string;
  category: string;
  status: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  highlights: string[];
}

export const scopeCards: ScopeCardItem[] = [
  {
    step: '01',
    title: 'Dashboard',
    category: 'Operational Hub',
    status: 'Live Sync',
    tagline: 'Live operational command center for enquiries, quotes, and cargo dispatches.',
    icon: LayoutDashboard,
    highlights: [
      'Multi-port pipeline tracking',
      'Daily dispatch & order metrics',
      'Instant financial reconciliation',
    ],
  },
  {
    step: '02',
    title: 'Customers',
    category: 'Buyer Network',
    status: 'KYC Verified',
    tagline: 'Verified international buyer profiles, trade history, and compliance files.',
    icon: Users,
    highlights: [
      'Global buyer KYC & credit limits',
      'Consignee & notify party directory',
      'Complete multi-order transaction history',
    ],
  },
  {
    step: '03',
    title: 'Products',
    category: 'Commodity Catalog',
    status: 'HS Mapped',
    tagline: 'Shared export commodities catalog with harmonized trade classification.',
    icon: Boxes,
    highlights: [
      'Automated HS code mapping',
      'Multi-currency pricing (USD, EUR, GBP)',
      'Packaging specs & container load counts',
    ],
  },
  {
    step: '04',
    title: 'Sales',
    category: 'Commercial Trail',
    status: 'Automated',
    tagline: 'End-to-end commercial pipeline from buyer enquiry to signed sales contract.',
    icon: BriefcaseBusiness,
    highlights: [
      'Direct buyer RFQ enquiry logging',
      'Audit-ready proforma quotation generator',
      'Binding sales contract confirmation',
    ],
  },
  {
    step: '05',
    title: 'Shipments',
    category: 'Freight Logistics',
    status: 'Port Milestone',
    tagline: 'Live freight logistics tracking from origin warehouse to discharge port.',
    icon: Ship,
    highlights: [
      'Container stuffing & vessel bookings',
      'Bill of Lading (B/L) & shipping records',
      'Port customs clearance milestones',
    ],
  },
  {
    step: '06',
    title: 'Invoices & Payments',
    category: 'Financial Ledger',
    status: 'Swift Linked',
    tagline: 'Commercial billing, export duty documentation, and currency settlements.',
    icon: ReceiptText,
    highlights: [
      'Export commercial invoices & packing lists',
      'Letter of Credit (LC) & swift verification',
      'Multi-stage advance & balance tracking',
    ],
  },
  {
    step: '07',
    title: 'Reports',
    category: 'Trade Analytics',
    status: 'Auto Export',
    tagline: 'Deep business analytics across trade routes, buyers, and gross profit margins.',
    icon: BarChart3,
    highlights: [
      'Route & destination port turnover',
      'Product profitability & margin breakdown',
      'Overdue accounts receivable reports',
    ],
  },
  {
    step: '08',
    title: 'Settings',
    category: 'Enterprise Controls',
    status: 'Secure 256-bit',
    tagline: 'Authorized banking configurations, team roles, and official export stamps.',
    icon: Settings2,
    highlights: [
      'Correspondent bank details & IBAN/SWIFT',
      'Multi-user RBAC & audit log trails',
      'Digital signature & company seal authorization',
    ],
  },
];

export function ScopeFeaturesSection() {
  return (
    <section className="scope-section" id="scope" aria-labelledby="scope-title">
      <div className="wrap">
        {/* Section Top Header */}
        <div className="scope-top">
          <div className="section-header">
            <div className="eyebrow center">
              <span className="eyebrow-dash" /> A PRACTICAL WORKING SET
            </div>
            <h2 id="scope-title" className="scope-main-title">
              The core of export operations, in one place.
            </h2>
            <p className="scope-sub-note">
              Every tool and record your trade team needs to process inquiries, shipments, compliance, and payments with complete operational clarity.
            </p>
          </div>
        </div>

        {/* 8 Professional Feature Module Cards (4x2 Grid) */}
        <div className="scope-grid" role="region" aria-label="Export feature modules">
          {scopeCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.step}
                className="scope-card"
                tabIndex={0}
                aria-label={`${card.title} module`}
              >
                {/* Top Bar: Icon + Category Badge + Step Pill */}
                <div className="scope-card-header">
                  <div className="scope-icon-box">
                    <Icon size={20} className="scope-icon-glyph" />
                  </div>
                  <div className="scope-header-meta">
                    <span className="scope-category-pill">{card.category}</span>
                    <span className="scope-step-mono">{card.step}</span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <div className="scope-card-body">
                  <h3 className="scope-card-title">{card.title}</h3>
                  <p className="scope-card-tagline">{card.tagline}</p>
                </div>

                {/* Capabilities List (Populates the card meaningfully) */}
                <div className="scope-capabilities-box">
                  <span className="scope-capabilities-label">Core Capabilities:</span>
                  <ul className="scope-capabilities-list">
                    {card.highlights.map((item, idx) => (
                      <li key={idx} className="scope-cap-item">
                        <CheckCircle2 size={13} className="scope-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Footer: Status Pill & Interactive Explore Link */}
                <div className="scope-card-footer">
                  <span className="scope-status-pill">
                    <span className="scope-status-dot" />
                    <span>{card.status}</span>
                  </span>
                  <a href="#product" className="scope-footer-action" title={`Explore ${card.title}`}>
                    <span>Explore</span>
                    <ArrowRight size={12} className="scope-action-arrow" />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
