import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

const testimonials: TestimonialItem[] = [
  {
    id: 1,
    name: 'David Vance',
    role: 'Managing Director',
    company: 'TransGlobal Commodities Ltd · London & Singapore',
    avatar: '/images/david-vance.jpg',
    rating: 5,
    quote:
      'Master Export Pro transformed our export operations. Generating proforma invoices, calculating freight margins, and dispatching overseas containers used to take days across messy spreadsheets. Now our entire team handles complex multi-country shipments in minutes with zero errors—helping us close $3.2M in new European export contracts.',
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    role: 'VP of Global Supply Chain',
    company: 'Pacific Rim Trading Group · Sydney & Hong Kong',
    avatar: '/images/sarah-jenkins.jpg',
    rating: 5,
    quote:
      'The automated Bill of Lading, packing list generation, and customs milestone tracking give our overseas buyers complete peace of mind. We eliminated duplicate data entry entirely, reducing our documentation processing time by 60% with zero port clearance delays.',
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Director of Trade Logistics',
    company: 'Apex Maritime & Industrial Exports · Rotterdam & Dubai',
    avatar: '/images/john-smith.jpg',
    rating: 5,
    quote:
      'Master Export Pro connects our sales orders, container manifests, and commercial invoices into one unified digital system. From initial inquiry to final payment clearance, it gives our international clients total visibility across every shipment.',
  },
  {
    id: 4,
    name: 'Elena Rostova',
    role: 'Chief Financial Officer',
    company: 'EuroLine Chemical & Agricultural Exports · Hamburg',
    avatar: '/images/elena-rostova.jpg',
    rating: 5,
    quote:
      'Our cash flow cycle improved dramatically within our first month. Having live tracking of unpaid invoices, multi-currency exchange margins, and payment milestones in one centralized dashboard has saved our commercial finance desk hundreds of reconciliation hours.',
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Auto-switch to next testimonial every 3 seconds (3000ms)
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 350);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const current = testimonials[currentIndex];

  return (
    <section className="testimonials-section" id="feedback" aria-label="Customer Feedback">
      <div className="wrap">
        {/* Title */}
        <h2 className="testimonials-title">What People Say</h2>

        {/* Accent decoration: — • — */}
        <div className="testimonials-accent-line" aria-hidden="true">
          <span className="accent-bar" />
          <span className="accent-dot" />
          <span className="accent-bar" />
        </div>

        {/* Testimonial Slider Card */}
        <div
          className="testimonials-carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Arrow Button */}
          <button
            type="button"
            className="testimonial-nav-btn prev-btn"
            onClick={prevSlide}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={28} />
          </button>

          {/* Testimonial Content */}
          <div className={`testimonial-content-card ${isAnimating ? 'animating' : ''}`}>
            {/* 5 Golden Stars */}
            <div className="testimonial-stars" aria-label={`Rating: ${current.rating} out of 5 stars`}>
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className="star-icon"
                  fill="#f59e0b"
                  color="#f59e0b"
                />
              ))}
            </div>

            {/* Testimonial Quote in Engaging English */}
            <blockquote className="testimonial-quote">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Avatar with Orange Ring */}
            <div className="testimonial-avatar-wrapper">
              <div className="testimonial-avatar-ring">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="testimonial-avatar-img"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Author Info */}
            <h3 className="testimonial-author-name">{current.name}</h3>
            <span className="testimonial-author-role">{current.role}</span>
            <span className="testimonial-author-company">
              <CheckCircle2 size={13} className="company-verified-icon" />
              {current.company}
            </span>
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            className="testimonial-nav-btn next-btn"
            onClick={nextSlide}
            aria-label="Next testimonial"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* 3-Second Switch Progress Indicator & Dots */}
        <div className="testimonial-dots-nav">
          {testimonials.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={`testimonial-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setIsAnimating(true);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to testimonial ${idx + 1}: ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
