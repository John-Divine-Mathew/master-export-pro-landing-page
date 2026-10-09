import React, { useState, useEffect } from 'react';
import {
  PackageSearch,
  FileText,
  ClipboardList,
  Ship,
  ReceiptText,
  CircleDollarSign,
  ArrowRight,
  ArrowDown
} from 'lucide-react';

interface WorkflowStep {
  id: number;
  stageNum: string;
  label: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 0,
    stageNum: '01',
    label: 'Enquiry',
    shortDesc: 'Capture the buyer’s request, product specifications, and target timelines.',
    icon: PackageSearch,
  },
  {
    id: 1,
    stageNum: '02',
    label: 'Quotation',
    shortDesc: 'Auto-populate HS codes, Incoterms, and generate audit-ready branded quotations.',
    icon: FileText,
  },
  {
    id: 2,
    stageNum: '03',
    label: 'Sales order',
    shortDesc: 'Convert accepted quotations into binding sales orders with locked commercial terms.',
    icon: ClipboardList,
  },
  {
    id: 3,
    stageNum: '04',
    label: 'Shipment',
    shortDesc: 'Link container numbers, Bill of Lading (B/L), vessel schedules, and port clearance.',
    icon: Ship,
  },
  {
    id: 4,
    stageNum: '05',
    label: 'Invoice',
    shortDesc: 'Generate export commercial invoices, packing lists, and automated duty summaries.',
    icon: ReceiptText,
  },
  {
    id: 5,
    stageNum: '06',
    label: 'Payment',
    shortDesc: 'Track Letter of Credit (LC) terms, bank swift notes, and complete balance settlement.',
    icon: CircleDollarSign,
  },
];

export function InteractiveWorkflow() {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Continuous animation: smoothly advances every 3.0s and never stops, even on hover or user click
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % WORKFLOW_STEPS.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [activeStepIndex]);

  return (
    <div
      className="workflow-pro-container"
      aria-label="Interactive 6-Stage Order Workflow"
    >
      {/* Desktop Stepper Track (> 768px) */}
      <div className="workflow-desktop-stepper">
        <div className="workflow-stepper-header">
          <div className="workflow-stepper-track" role="tablist" aria-label="Order stages">
            {WORKFLOW_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStepIndex;
              const isActive = idx === activeStepIndex;

              return (
                <div key={step.id} className="workflow-node-cell">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`workflow-tab-${step.id}`}
                    className={`workflow-node-btn ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}
                    onClick={() => setActiveStepIndex(idx)}
                    title={`Stage ${step.stageNum}: ${step.label}`}
                  >
                    <span className="workflow-node-circle">
                      <span className="node-num-text">{step.stageNum}</span>
                    </span>
                    <span className="workflow-node-caption">{step.label}</span>
                  </button>

                  {/* Professional Connecting Line with Single Moving Arrow */}
                  {idx < WORKFLOW_STEPS.length - 1 && (
                    <div
                      className={`workflow-arrow-connector ${idx < activeStepIndex ? 'is-completed' : ''} ${idx === activeStepIndex ? 'is-active-link' : ''}`}
                      aria-hidden="true"
                    >
                      <div className="workflow-arrow-line">
                        <span
                          key={`line-fill-${activeStepIndex}-${idx}`}
                          className={`workflow-line-fill ${idx < activeStepIndex ? 'filled' : ''} ${idx === activeStepIndex ? 'animating' : ''}`}
                        />

                        {/* The Single Moving Arrow: Only on the active transition, glides smoothly */}
                        {idx === activeStepIndex && (
                          <div
                            key={`single-moving-arrow-${activeStepIndex}`}
                            className="workflow-single-moving-arrow"
                          >
                            <ArrowRight size={11} className="workflow-moving-arrow-icon" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop 6 Stage Cards Grid (> 768px) */}
      <div className="workflow-desktop-cards">
        <div className="workflow-cards-grid">
          {WORKFLOW_STEPS.map((step, idx) => {
            const StepIcon = step.icon;
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <div
                key={step.id}
                className={`workflow-stage-card ${isActive ? 'stage-card-active' : ''} ${isCompleted ? 'stage-card-completed' : ''}`}
                onClick={() => setActiveStepIndex(idx)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveStepIndex(idx);
                  }
                }}
                aria-label={`Select Stage ${step.stageNum} ${step.label}`}
              >
                {/* Card top stage indicator */}
                <div className="stage-card-header">
                  <span className={`stage-badge-pill ${isActive ? 'badge-active' : ''}`}>
                    STAGE {step.stageNum}
                  </span>
                </div>

                {/* Icon Container */}
                <div className={`stage-icon-box ${isActive ? 'icon-box-active' : ''}`}>
                  <StepIcon size={22} />
                </div>

                {/* Title & Description */}
                <h3 className="stage-card-title">{step.label}</h3>
                <p className="stage-card-desc">{step.shortDesc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Vertical Timeline Layout (<= 768px): Number on Left, Card on Right */}
      <div className="workflow-mobile-timeline" aria-label="Order stages timeline">
        {WORKFLOW_STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStepIndex;
          const isCompleted = idx < activeStepIndex;
          const isLast = idx === WORKFLOW_STEPS.length - 1;

          return (
            <div
              key={step.id}
              className={`workflow-mobile-row ${isActive ? 'row-active' : ''} ${isCompleted ? 'row-completed' : ''}`}
              onClick={() => setActiveStepIndex(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveStepIndex(idx);
                }
              }}
              aria-label={`Stage ${step.stageNum} ${step.label}`}
            >
              {/* Left Column: Number Circle & Connecting Line */}
              <div className="workflow-mobile-left">
                <div className={`workflow-mobile-node ${isActive ? 'node-active' : ''} ${isCompleted ? 'node-completed' : ''}`}>
                  <span className="mobile-node-num">{step.stageNum}</span>
                </div>
                {!isLast && (
                  <div className={`workflow-mobile-v-line ${idx < activeStepIndex ? 'v-line-filled' : ''} ${idx === activeStepIndex ? 'v-line-animating' : ''}`}>
                    <span
                      key={`v-fill-${activeStepIndex}-${idx}`}
                      className={`mobile-v-fill ${idx < activeStepIndex ? 'filled' : ''} ${idx === activeStepIndex ? 'animating' : ''}`}
                    />
                    {idx === activeStepIndex && (
                      <div
                        key={`mobile-moving-arrow-${activeStepIndex}`}
                        className="workflow-mobile-moving-arrow"
                      >
                        <ArrowDown size={10} className="workflow-mobile-moving-arrow-icon" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Stage Card */}
              <div className={`workflow-mobile-right-card ${isActive ? 'card-active' : ''} ${isCompleted ? 'card-completed' : ''}`}>
                <div className="mobile-card-top-row">
                  <div className={`mobile-stage-icon ${isActive ? 'icon-active' : ''}`}>
                    <StepIcon size={18} />
                  </div>
                  <span className={`mobile-stage-badge ${isActive ? 'badge-active' : ''}`}>
                    STAGE {step.stageNum}
                  </span>
                </div>

                <h3 className="mobile-stage-title">{step.label}</h3>
                <p className="mobile-stage-desc">{step.shortDesc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
