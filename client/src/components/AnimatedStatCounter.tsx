import React, { useState, useEffect, useRef } from 'react';

interface AnimatedStatCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  formatWithCommas?: boolean;
  className?: string;
}

/**
 * Calculates number value with an elastic overshoot-decrease-settle curve:
 * 1. Phase 1 (0% - 60%): Rapid increase to overshoot peak (~115% of target)
 * 2. Phase 2 (60% - 82%): Noticeable decrease/correction below target (~97% of target)
 * 3. Phase 3 (82% - 100%): Smooth rise and crisp lock-in to exact target (100%)
 */
function getOvershootBounceValue(progress: number, target: number): number {
  if (progress <= 0) return 0;
  if (progress >= 1) return target;

  if (progress < 0.60) {
    const t = progress / 0.60;
    // Ease-out cubic to peak overshoot
    const ease = 1 - Math.pow(1 - t, 3);
    return Math.round(target * 1.15 * ease);
  }

  if (progress < 0.82) {
    const t = (progress - 0.60) / 0.22;
    // Ease-in-out cosine dip from 1.15 to 0.97
    const ease = 0.5 * (1 - Math.cos(t * Math.PI));
    const startVal = target * 1.15;
    const endVal = target * 0.97;
    return Math.round(startVal + (endVal - startVal) * ease);
  }

  const t = (progress - 0.82) / 0.18;
  // Ease-in-out to exact final target
  const ease = 0.5 * (1 - Math.cos(t * Math.PI));
  const startVal = target * 0.97;
  return Math.round(startVal + (target - startVal) * ease);
}

export function AnimatedStatCounter({
  target,
  suffix = '',
  duration = 1200,
  delay = 0,
  formatWithCommas = false,
  className = '',
}: AnimatedStatCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [animationPhase, setAnimationPhase] = useState<'idle' | 'increasing' | 'decreasing' | 'revealed'>('idle');
  const containerRef = useRef<HTMLSpanElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  const startAnimation = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startTime = performance.now() + delay;
    setAnimationPhase('increasing');

    const tick = (currentTime: number) => {
      if (currentTime < startTime) {
        animFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentVal = getOvershootBounceValue(progress, target);
      setDisplayValue(currentVal);

      if (progress < 0.60) {
        setAnimationPhase('increasing');
      } else if (progress < 0.82) {
        setAnimationPhase('decreasing');
      } else if (progress < 1.0) {
        setAnimationPhase('increasing');
      } else {
        setDisplayValue(target);
        setAnimationPhase('revealed');
        return;
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    // Animate only once when entering viewport or upon initial load
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [target, duration, delay]);

  const handleReplay = () => {
    startAnimation();
  };

  const formattedDisplay = formatWithCommas
    ? displayValue.toLocaleString()
    : displayValue.toString();

  return (
    <span
      ref={containerRef}
      onClick={handleReplay}
      title="Click to replay animation"
      className={`animated-stat-counter ${animationPhase} ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        cursor: 'pointer',
        color: '#ff7700',
        fontSize: 'inherit',
      }}
    >
      <span className="stat-number tabular-nums tracking-tight font-extrabold text-[#ff7700]">
        {formattedDisplay}
      </span>
      {suffix && (
        <span className="stat-suffix font-extrabold text-[#ff7700]">
          {suffix}
        </span>
      )}
      {animationPhase === 'revealed' && <span className="stat-reveal-sparkle" aria-hidden="true" />}
    </span>
  );
}
