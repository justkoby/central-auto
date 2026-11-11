import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { evVehicles } from '../data/evHeroData';
import { vehicles } from '../data/vehicles';
import '../styles/evHero.css';

const AUTOPLAY_DELAY = 5000; // ~5 seconds displaying each vehicle
const TRANSITION_DURATION = 1.35; // 1.2 to 1.5 seconds transition
const RESUME_IDLE_DELAY = 7000; // Resume autoplay 7s after user interaction

export default function EvHero({ onEnquire, onDetail }) {
  // Track 0-based logical index: 0 (Nammi), 1 (BYD), 2 (XPeng)
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0); // Synchronized for textual content
  const [isPlaying, setIsPlaying] = useState(true);
  const [specsModalOpen, setSpecsModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion refs
  const heroRef = useRef(null);
  const trackRef = useRef(null);
  const progressTweenRef = useRef(null);
  const slideTweenRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const idleResumeTimerRef = useRef(null);
  const dragStartRef = useRef({ x: 0, y: 0, time: 0 });
  const isPointerDownRef = useRef(false);
  const pointerPosRef = useRef({ x: 0, y: 0 });

  // Virtual ribbon items: [Clone of G9, Nammi 01, BYD Atto 2, XPeng G9, Clone of Nammi 01]
  // Indexes in ribbon: 0 = Clone G9, 1 = Nammi (real 0), 2 = BYD (real 1), 3 = XPeng (real 2), 4 = Clone Nammi
  const ribbonItems = useMemo(() => {
    const cloneG9 = { ...evVehicles[2], ribbonKey: 'clone-g9', isClone: true, logicalIndex: 2 };
    const real0 = { ...evVehicles[0], ribbonKey: 'real-0', logicalIndex: 0 };
    const real1 = { ...evVehicles[1], ribbonKey: 'real-1', logicalIndex: 1 };
    const real2 = { ...evVehicles[2], ribbonKey: 'real-2', logicalIndex: 2 };
    const cloneNammi = { ...evVehicles[0], ribbonKey: 'clone-nammi', isClone: true, logicalIndex: 0 };
    return [cloneG9, real0, real1, real2, cloneNammi];
  }, []);

  // Motion state object for GSAP tweening
  // ribbonIndex represents floating position: 1.0 = Nammi, 2.0 = BYD, 3.0 = XPeng
  const motionState = useRef({ ribbonIndex: 1, progress: 0 });

  const activeVehicle = evVehicles[displayIndex] || evVehicles[0];

  // Match vehicle from existing vehicles.js
  const correspondingVehicle = useMemo(() => {
    return vehicles.find((v) => v.make === activeVehicle.brand && v.fuel === 'Electric') || {
      id: activeVehicle.numericId,
      make: activeVehicle.brand,
      model: activeVehicle.model,
      year: 2025,
      price: activeVehicle.numericId === 10 ? 220000 : activeVehicle.numericId === 11 ? 295000 : 580000,
      type: activeVehicle.category === 'Affordable' ? 'Hatchback' : 'SUV',
      fuel: 'Electric',
      km: 'Brand New',
      status: 'Available to import',
      image: activeVehicle.fallbackImage,
    };
  }, [activeVehicle]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Update track DOM transform from current motionState.ribbonIndex
  const updateTrackTransform = useCallback(() => {
    if (!trackRef.current) return;
    const current = motionState.current.ribbonIndex;
    // Calculate percentage offset for horizontal translation
    // In ribbon, item width is 100vw or clamped width with spacing
    // We use CSS custom variable --ribbon-pos
    trackRef.current.style.setProperty('--ribbon-pos', `${current}`);
  }, []);

  // Animate track to a specific ribbon index
  const animateToRibbonIndex = useCallback((targetRibbonIndex, onCompleteWrap) => {
    if (slideTweenRef.current) slideTweenRef.current.kill();

    if (prefersReducedMotion.current) {
      motionState.current.ribbonIndex = targetRibbonIndex;
      updateTrackTransform();
      if (onCompleteWrap) onCompleteWrap();
      return;
    }

    slideTweenRef.current = gsap.to(motionState.current, {
      ribbonIndex: targetRibbonIndex,
      duration: TRANSITION_DURATION,
      ease: 'power3.out',
      onUpdate: () => {
        updateTrackTransform();
      },
      onComplete: () => {
        if (onCompleteWrap) onCompleteWrap();
      },
    });
  }, [updateTrackTransform]);

  // Navigate to a logical index (0, 1, or 2)
  const navigateTo = useCallback((targetLogicalIndex, directionHint = null) => {
    const currentLogical = currentIndex;
    if (targetLogicalIndex === currentLogical) return;

    let targetRibbonIndex = targetLogicalIndex + 1; // standard mapping: 0->1, 1->2, 2->3

    // Handle seamless circular wrap when moving from 2 to 0 forward
    if ((currentLogical === 2 && targetLogicalIndex === 0) || directionHint === 'next') {
      if (currentLogical === 2 && targetLogicalIndex === 0) {
        targetRibbonIndex = 4; // Move forward to Clone Nammi
      }
    }
    // Handle seamless circular wrap when moving from 0 to 2 backward
    else if ((currentLogical === 0 && targetLogicalIndex === 2) || directionHint === 'prev') {
      if (currentLogical === 0 && targetLogicalIndex === 2) {
        targetRibbonIndex = 0; // Move backward to Clone G9
      }
    }

    // Immediately synchronize UI text and headlines
    setDisplayIndex(targetLogicalIndex);
    setCurrentIndex(targetLogicalIndex);

    // Animate headline and info text with elegant GSAP timeline
    gsap.fromTo(
      '.ev-hero-text-sync',
      { opacity: 0, y: directionHint === 'prev' ? -12 : 12 },
      { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out', stagger: 0.04 }
    );

    // Animate the continuous vehicle track
    animateToRibbonIndex(targetRibbonIndex, () => {
      // Upon settling, if we reached a clone, invisibly wrap without animation
      if (targetRibbonIndex === 4) {
        // Clone Nammi -> Real Nammi (position 1)
        motionState.current.ribbonIndex = 1;
        updateTrackTransform();
      } else if (targetRibbonIndex === 0) {
        // Clone G9 -> Real G9 (position 3)
        motionState.current.ribbonIndex = 3;
        updateTrackTransform();
      }
    });
  }, [currentIndex, animateToRibbonIndex, updateTrackTransform]);

  const goNext = useCallback(() => {
    const nextLogical = (currentIndex + 1) % evVehicles.length;
    navigateTo(nextLogical, 'next');
  }, [currentIndex, navigateTo]);

  const goPrev = useCallback(() => {
    const prevLogical = (currentIndex - 1 + evVehicles.length) % evVehicles.length;
    navigateTo(prevLogical, 'prev');
  }, [currentIndex, navigateTo]);

  // Autoplay management
  const startAutoplay = useCallback(() => {
    if (!isPlaying || prefersReducedMotion.current) return;
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);

    // Animate progress bar
    const barEl = document.querySelector('.ev-hero-progress-fill');
    if (barEl) {
      if (progressTweenRef.current) progressTweenRef.current.kill();
      gsap.set(barEl, { scaleX: 0, transformOrigin: 'left' });
      progressTweenRef.current = gsap.to(barEl, {
        scaleX: 1,
        duration: AUTOPLAY_DELAY / 1000,
        ease: 'none',
      });
    }

    autoplayTimerRef.current = setTimeout(() => {
      goNext();
    }, AUTOPLAY_DELAY);
  }, [isPlaying, goNext]);

  const pauseAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    if (progressTweenRef.current) progressTweenRef.current.pause();
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
  }, []);

  const handleUserInteraction = useCallback(() => {
    pauseAutoplay();
    // Schedule resume after idle interval
    if (idleResumeTimerRef.current) clearTimeout(idleResumeTimerRef.current);
    idleResumeTimerRef.current = setTimeout(() => {
      startAutoplay();
    }, RESUME_IDLE_DELAY);
  }, [pauseAutoplay, startAutoplay]);

  // Restart autoplay when currentIndex changes
  useEffect(() => {
    startAutoplay();
    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      if (progressTweenRef.current) progressTweenRef.current.kill();
    };
  }, [currentIndex, startAutoplay]);

  // Pause on tab visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        pauseAutoplay();
      } else {
        startAutoplay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [pauseAutoplay, startAutoplay]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        handleUserInteraction();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        handleUserInteraction();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, handleUserInteraction]);

  // Pointer Drag & Swipe Engine
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (e.target.closest('button, a, input, textarea, .ev-hero-interactive-ctrl')) return;

    handleUserInteraction();
    isPointerDownRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialRibbon: motionState.current.ribbonIndex,
      time: Date.now(),
    };
    setIsDragging(true);

    if (slideTweenRef.current) slideTweenRef.current.kill();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e) => {
    pointerPosRef.current = { x: e.clientX, y: e.clientY };

    if (!isPointerDownRef.current) return;

    const diffX = e.clientX - dragStartRef.current.x;
    const viewportWidth = heroRef.current ? heroRef.current.clientWidth : window.innerWidth;
    const sensitivity = viewportWidth * 0.75;
    const ribbonDelta = -diffX / sensitivity;

    motionState.current.ribbonIndex = dragStartRef.current.initialRibbon + ribbonDelta;
    updateTrackTransform();
  };

  const finishPointerDrag = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;
    setIsDragging(false);

    const diffX = e.clientX - dragStartRef.current.x;
    const elapsed = Math.max(Date.now() - dragStartRef.current.time, 1);
    const velocity = Math.abs(diffX) / elapsed;

    // Threshold check for navigation
    if (diffX < -50 || (diffX < -20 && velocity > 0.35)) {
      goNext();
    } else if (diffX > 50 || (diffX > 20 && velocity > 0.35)) {
      goPrev();
    } else {
      // Snap back to current index
      const targetRibbon = currentIndex + 1;
      animateToRibbonIndex(targetRibbon);
    }
  };

  const handlePointerUp = (e) => {
    finishPointerDrag(e);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerCancel = (e) => {
    finishPointerDrag(e);
  };

  // Wheel horizontal scroll scrub
  const lastWheelTime = useRef(0);
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastWheelTime.current < 450) return;
    if (Math.abs(e.deltaX) > 25 || (e.shiftKey && Math.abs(e.deltaY) > 25)) {
      handleUserInteraction();
      lastWheelTime.current = now;
      if (e.deltaX > 0 || (e.shiftKey && e.deltaY > 0)) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  // CTA Click handler
  const handleCtaClick = () => {
    handleUserInteraction();
    if (onDetail) {
      onDetail(correspondingVehicle);
    } else if (onEnquire) {
      onEnquire(activeVehicle.enquiryText);
    }
  };

  return (
    <section
      id="electric"
      ref={heroRef}
      className="ev-hero-showcase"
      aria-roledescription="carousel"
      aria-label="Central Auto Premium Electric Vehicle Showcase"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onWheel={handleWheel}
      onMouseEnter={handleUserInteraction}
    >
      {/* Studio lighting environment */}
      <div className="ev-hero-ambient-studio" aria-hidden="true">
        <div className="ev-hero-radial-keylight" />
        <div className="ev-hero-horizon-floor" />
      </div>

      {/* Top Left: Headline & Brand Proposition */}
      <div className="ev-hero-header-area">
        <div className="ev-hero-category-tag ev-hero-text-sync">
          <span className="ev-hero-badge-pill">{activeVehicle.category}</span>
          <span className="ev-hero-badge-sub">{activeVehicle.categoryBadge}</span>
        </div>
        <h1 className="ev-hero-headline ev-hero-text-sync">{activeVehicle.headline}</h1>
        <p className="ev-hero-subline ev-hero-text-sync">{activeVehicle.description}</p>
      </div>

      {/* Top Right: Compact Vehicle Information Panel */}
      <div className="ev-hero-info-panel ev-hero-interactive-ctrl" role="region" aria-label="Vehicle details">
        <div className="ev-hero-panel-inner">
          <div className="ev-hero-panel-head">
            <span className="ev-hero-brand-name ev-hero-text-sync">{activeVehicle.brand}</span>
            <h2 className="ev-hero-model-title ev-hero-text-sync">{activeVehicle.model}</h2>
            <p className="ev-hero-powertrain ev-hero-text-sync">{activeVehicle.powertrain}</p>
          </div>

          <div className="ev-hero-quick-specs">
            {activeVehicle.specs.slice(0, 3).map((spec) => (
              <div key={spec.label} className="ev-hero-spec-item">
                <span className="ev-hero-spec-label">{spec.label}</span>
                <span className="ev-hero-spec-val ev-hero-text-sync">{spec.value}</span>
                <span className="ev-hero-spec-note">{spec.note}</span>
              </div>
            ))}
          </div>

          <div className="ev-hero-panel-actions">
            <button
              className="ev-hero-cta-btn ev-hero-interactive-ctrl"
              onClick={handleCtaClick}
              aria-label={activeVehicle.cta}
            >
              <span className="ev-hero-btn-desktop">{activeVehicle.cta}</span>
              <span className="ev-hero-btn-mobile">Explore</span>
              <svg className="ev-hero-arrow-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              className="ev-hero-specs-toggle ev-hero-interactive-ctrl"
              onClick={() => {
                handleUserInteraction();
                setSpecsModalOpen(true);
              }}
              aria-label="View verified vehicle specifications"
            >
              Full Specifications
            </button>
          </div>

          <p className="ev-hero-disclaimer">
            Concept visualization for motion prototype. Not manufacturer-approved photography.
          </p>
        </div>
      </div>

      {/* Continuous Horizontal Vehicle Track */}
      <div className="ev-hero-track-viewport">
        <div
          ref={trackRef}
          className={`ev-hero-continuous-track ${isDragging ? 'is-dragging' : ''}`}
        >
          {ribbonItems.map((item, idx) => {
            const isCentered = item.logicalIndex === displayIndex && !item.isClone;
            return (
              <div
                key={item.ribbonKey}
                className={`ev-hero-car-slot ${isCentered ? 'is-active' : ''}`}
                onClick={() => {
                  if (item.logicalIndex !== currentIndex) {
                    handleUserInteraction();
                    navigateTo(item.logicalIndex);
                  }
                }}
                role="group"
                aria-label={`${item.fullName}`}
              >
                {/* Vehicle Cutout with Transparent Baseline & Ground Shadow */}
                <div className="ev-hero-car-wrapper">
                  <img
                    className="ev-hero-vehicle-img"
                    src={item.image}
                    alt={item.alt}
                    width="1200"
                    height="600"
                    draggable="false"
                    loading={idx === 1 ? 'eager' : 'lazy'}
                    fetchPriority={idx === 1 ? 'high' : 'auto'}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Showcase Navigation & Progress Bar */}
      <div className="ev-hero-bottom-bar ev-hero-interactive-ctrl">
        <nav className="ev-hero-category-nav" aria-label="Electric vehicle categories">
          {evVehicles.map((car, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={car.id}
                className={`ev-hero-nav-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => {
                  handleUserInteraction();
                  navigateTo(idx);
                }}
                aria-current={isActive}
                aria-label={`Go to ${car.category} vehicle: ${car.model}`}
              >
                <span className="ev-hero-pill-num">{car.indexStr}</span>
                <span className="ev-hero-pill-label">{car.category}</span>
                <span className="ev-hero-pill-model">{car.model}</span>
              </button>
            );
          })}
        </nav>

        {/* Progress Bar & Arrow Controls */}
        <div className="ev-hero-timeline-controls">
          <div className="ev-hero-progress-track" aria-hidden="true">
            <div className="ev-hero-progress-fill" />
          </div>

          <div className="ev-hero-nav-arrows">
            <button
              className="ev-hero-arrow-btn"
              onClick={() => {
                handleUserInteraction();
                goPrev();
              }}
              aria-label="Previous electric vehicle"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M19 12H5M12 19l-7-7 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <span className="ev-hero-counter" aria-live="polite">
              0{currentIndex + 1} / 0{evVehicles.length}
            </span>
            <button
              className="ev-hero-arrow-btn"
              onClick={() => {
                handleUserInteraction();
                goNext();
              }}
              aria-label="Next electric vehicle"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Drag Prompt Indicator */}
      <div className={`ev-hero-drag-hint ${isDragging ? 'is-active' : ''}`} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M10 6L5 12l5 6V6zm4 0v12l5-6-5-6z" />
        </svg>
        <span>Swipe or drag</span>
      </div>

      {/* Full Verified Specifications Sheet */}
      {specsModalOpen && (
        <div className="ev-hero-modal-backdrop" onClick={() => setSpecsModalOpen(false)}>
          <div
            className="ev-hero-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-vehicle-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ev-hero-modal-header">
              <div>
                <span className="ev-hero-modal-cat">{activeVehicle.category}</span>
                <h3 id="modal-vehicle-title">{activeVehicle.fullName}</h3>
                <p className="ev-hero-modal-price">{activeVehicle.priceEstimate}</p>
              </div>
              <button
                className="ev-hero-modal-close"
                onClick={() => setSpecsModalOpen(false)}
                aria-label="Close specifications"
              >
                ×
              </button>
            </div>

            <div className="ev-hero-modal-body">
              <div className="ev-hero-modal-grid">
                {activeVehicle.specs.map((spec) => (
                  <div key={spec.label} className="ev-hero-modal-card">
                    <span className="label">{spec.label}</span>
                    <span className="val">{spec.value}</span>
                    <span className="note">{spec.note}</span>
                  </div>
                ))}
              </div>

              <div className="ev-hero-highlights-box">
                <h4>Verified Highlights</h4>
                <ul>
                  {activeVehicle.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="ev-hero-modal-footer">
              <button
                className="button button-accent"
                onClick={() => {
                  setSpecsModalOpen(false);
                  handleCtaClick();
                }}
              >
                {activeVehicle.cta}
              </button>
              <button className="button button-outline" onClick={() => setSpecsModalOpen(false)}>
                Back to Showcase
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}