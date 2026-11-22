import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { featuredVehicles } from '../data/featuredEvData';
import { vehicles } from '../data/vehicles';
import '../styles/featuredEVShowcase.css';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedEVShowcase({ onEnquire, onDetail, onEstimate }) {
  const sectionRef = useRef(null);
  const pinWrapperRef = useRef(null);
  const trackRef = useRef(null);
  const wheelRefs = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef(0);

  // Viewport detection and reduced-motion listener
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth <= 768);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // CTA 1: Explore Vehicle
  const handleExplore = useCallback((car) => {
    if (car.inventoryId) {
      const match = vehicles.find((v) => v.id === car.inventoryId);
      if (match && onDetail) {
        onDetail(match);
        return;
      }
    }
    if (onEnquire) {
      onEnquire(`${car.name} (${car.category})`);
    }
  }, [onDetail, onEnquire]);

  // CTA 2: Running Cost Calculation
  const handleEstimate = useCallback((car) => {
    if (onEstimate) {
      onEstimate(car);
    } else {
      const targetEl = document.getElementById('running-costs');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onEstimate]);

  // Desktop GSAP ScrollTrigger Pinned Animation
  useEffect(() => {
    if (isMobile || reducedMotion) return undefined;

    const section = sectionRef.current;
    const pinWrapper = pinWrapperRef.current;
    const track = trackRef.current;
    if (!section || !pinWrapper || !track) return undefined;

    const carCount = featuredVehicles.length;

    const ctx = gsap.context(() => {
      const getPositions = () => {
        const slots = track.children;
        if (!slots || slots.length < 2) {
          const defaultWidth = Math.min(window.innerWidth * 0.65, 880);
          return { slotWidth: defaultWidth, stride: defaultWidth + 64, initialOffset: (window.innerWidth - defaultWidth) / 2 };
        }
        const slot0 = slots[0];
        const slot1 = slots[1];
        const slotWidth = slot0.offsetWidth;
        const stride = slot1.offsetLeft - slot0.offsetLeft;
        const initialOffset = (window.innerWidth - slotWidth) / 2;
        return { slotWidth, stride, initialOffset };
      };

      const { initialOffset } = getPositions();
      gsap.set(track, { x: initialOffset });

      let st;
      st = ScrollTrigger.create({
        trigger: section,
        pin: pinWrapper,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.5}`,
        scrub: 0.5,
        invalidateOnRefresh: true,
        onRefresh: (self) => {
          const { initialOffset: curOffset, stride: curStride } = getPositions();
          const curShift = (carCount - 1) * curStride;
          const prog = self ? self.progress : 0;
          gsap.set(track, { x: curOffset - prog * curShift });
        },
        onUpdate: (self) => {
          const progress = self.progress; // 0 to 1
          const { initialOffset: curOffset, stride: curStride, slotWidth: curSlotWidth } = getPositions();
          const totalShift = (carCount - 1) * curStride;
          const currentX = curOffset - progress * totalShift;

          // Translate horizontal track
          gsap.set(track, { x: currentX });

          // Calculate active vehicle index based on closest distance to center
          const rawIndex = progress * (carCount - 1);
          const newIndex = Math.min(carCount - 1, Math.max(0, Math.round(rawIndex)));
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }

          // Rotate wheels based on absolute horizontal travel distance
          featuredVehicles.forEach((car) => {
            const radiusPx = curSlotWidth * car.wheels.avgRadiusFraction;
            const currentDeg = -(progress * totalShift / radiusPx) * (180 / Math.PI);

            const frontEl = wheelRefs.current[`${car.id}-front`];
            const rearEl = wheelRefs.current[`${car.id}-rear`];
            if (frontEl) gsap.set(frontEl, { rotate: currentDeg });
            if (rearEl) gsap.set(rearEl, { rotate: currentDeg });
          });

          // Secondary subtle body micro-translation during motion
          const microBob = Math.sin(progress * Math.PI * 8) * 1.0;
          const bodyWrappers = track.querySelectorAll('.rivian-car-body');
          gsap.set(bodyWrappers, { y: microBob });
        },
      });

      return () => {
        st.kill();
      };
    }, section);

    return () => {
      ctx.revert();
    };
  }, [isMobile, reducedMotion]);

  // Navigate directly to index (via arrow buttons, dot pills, or mobile swipe)
  const navigateTo = (index) => {
    if (index < 0 || index >= featuredVehicles.length) return;
    activeIndexRef.current = index;
    setActiveIndex(index);

    if (isMobile) return;

    // On desktop, scroll window to ScrollTrigger position
    const st = ScrollTrigger.getAll().find((t) => t.vars.trigger === sectionRef.current);
    if (st) {
      const targetProgress = index / (featuredVehicles.length - 1);
      const targetScroll = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    } else if (trackRef.current) {
      const slots = trackRef.current.children;
      if (slots && slots.length > 1) {
        const slotWidth = slots[0].offsetWidth;
        const stride = slots[1].offsetLeft - slots[0].offsetLeft;
        const initialOffset = (window.innerWidth - slotWidth) / 2;
        const targetX = initialOffset - index * stride;
        gsap.to(trackRef.current, {
          x: targetX,
          duration: 0.8,
          ease: 'power2.out',
        });
      }
    }
  };

  // Mobile Touch Swipe Handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < featuredVehicles.length - 1) {
        navigateTo(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        navigateTo(activeIndex - 1);
      }
    }
  };

  const activeCar = featuredVehicles[activeIndex] || featuredVehicles[0];

  return (
    <section
      ref={sectionRef}
      className={`rivian-showcase-section ${reducedMotion ? 'is-reduced-motion' : ''}`}
      id="featured-ev"
      aria-label="Featured Electric Vehicles Showcase"
    >
      <div ref={pinWrapperRef} className="rivian-pin-wrapper">
        {/* Top Meta Bar */}
        <div className="rivian-top-bar">
          <div className="rivian-brand-indicator">
            <span className="rivian-pill-badge">Featured Showcase</span>
            <span className="rivian-category-label">{activeCar.category}</span>
          </div>

          <div className="rivian-nav-controls" aria-label="Showcase vehicle navigation">
            <span className="rivian-counter">
              <strong className="rivian-counter-current">0{activeIndex + 1}</strong>
              <span className="rivian-counter-sep">/</span>
              <span className="rivian-counter-total">0{featuredVehicles.length}</span>
            </span>

            <button
              type="button"
              className="rivian-arrow-btn"
              onClick={() => navigateTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous vehicle"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="rivian-arrow-btn"
              onClick={() => navigateTo(activeIndex + 1)}
              disabled={activeIndex === featuredVehicles.length - 1}
              aria-label="Next vehicle"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Central Vehicle Runway Stage */}
        <div className="rivian-stage-viewport">
          {isMobile ? (
            /* Mobile Single Active Vehicle Stage with Smooth Swiping */
            <div
              className="rivian-mobile-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div
                key={activeCar.id}
                className="rivian-car-stage rivian-car-stage--mobile"
                style={{ aspectRatio: activeCar.aspectRatio }}
              >
                {/* Model Lettering directly behind vehicle */}
                <div className="rivian-car-watermark" aria-hidden="true">
                  {activeCar.watermark}
                </div>

                <div className="rivian-ground-shadow" />
                <picture className="rivian-car-body">
                  <source srcSet={activeCar.bodyImg} type="image/webp" />
                  <img src={activeCar.bodyPng} alt={activeCar.name} loading="eager" decoding="async" />
                </picture>
                <div
                  className="rivian-wheel-wrap rivian-wheel-front"
                  style={{
                    left: `${activeCar.wheels.front.cx * 100}%`,
                    top: `${activeCar.wheels.front.cy * 100}%`,
                    width: `${activeCar.wheels.front.diameter * 100}%`,
                    height: `${activeCar.wheels.front.diameter * 100 * activeCar.aspectRatio}%`,
                  }}
                >
                  <picture className="rivian-wheel-pic">
                    <source srcSet={activeCar.wheelFrontImg} type="image/webp" />
                    <img src={activeCar.wheelFrontImg.replace('.webp', '.png')} alt="" />
                  </picture>
                </div>
                <div
                  className="rivian-wheel-wrap rivian-wheel-rear"
                  style={{
                    left: `${activeCar.wheels.rear.cx * 100}%`,
                    top: `${activeCar.wheels.rear.cy * 100}%`,
                    width: `${activeCar.wheels.rear.diameter * 100}%`,
                    height: `${activeCar.wheels.rear.diameter * 100 * activeCar.aspectRatio}%`,
                  }}
                >
                  <picture className="rivian-wheel-pic">
                    <source srcSet={activeCar.wheelRearImg} type="image/webp" />
                    <img src={activeCar.wheelRearImg.replace('.webp', '.png')} alt="" />
                  </picture>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Continuous Track */
            <div ref={trackRef} className="rivian-desktop-track">
              {featuredVehicles.map((car, idx) => (
                <div
                  key={car.id}
                  className={`rivian-car-slot ${idx === activeIndex ? 'is-active' : ''}`}
                >
                  <div className="rivian-car-stage" style={{ aspectRatio: car.aspectRatio }}>
                    <div className="rivian-car-watermark" aria-hidden="true">
                      {car.watermark}
                    </div>

                    <div className="rivian-ground-shadow" />
                    <picture className="rivian-car-body">
                      <source srcSet={car.bodyImg} type="image/webp" />
                      <img src={car.bodyPng} alt={car.name} loading="eager" decoding="async" />
                    </picture>
                    <div
                      className="rivian-wheel-wrap rivian-wheel-front"
                      style={{
                        left: `${car.wheels.front.cx * 100}%`,
                        top: `${car.wheels.front.cy * 100}%`,
                        width: `${car.wheels.front.diameter * 100}%`,
                        height: `${car.wheels.front.diameter * 100 * car.aspectRatio}%`,
                      }}
                    >
                      <picture className="rivian-wheel-pic">
                        <source srcSet={car.wheelFrontImg} type="image/webp" />
                        <img
                          ref={(el) => (wheelRefs.current[`${car.id}-front`] = el)}
                          src={car.wheelFrontImg.replace('.webp', '.png')}
                          alt=""
                        />
                      </picture>
                    </div>
                    <div
                      className="rivian-wheel-wrap rivian-wheel-rear"
                      style={{
                        left: `${car.wheels.rear.cx * 100}%`,
                        top: `${car.wheels.rear.cy * 100}%`,
                        width: `${car.wheels.rear.diameter * 100}%`,
                        height: `${car.wheels.rear.diameter * 100 * car.aspectRatio}%`,
                      }}
                    >
                      <picture className="rivian-wheel-pic">
                        <source srcSet={car.wheelRearImg} type="image/webp" />
                        <img
                          ref={(el) => (wheelRefs.current[`${car.id}-rear`] = el)}
                          src={car.wheelRearImg.replace('.webp', '.png')}
                          alt=""
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Information, Specifications & Dual CTAs */}
        <div className="rivian-bottom-info">
          <div className="rivian-info-header">
            <h2 className="rivian-headline">{activeCar.headline}</h2>
            <p className="rivian-description">{activeCar.description}</p>
          </div>

          <div className="rivian-specs-pricing-row">
            <div className="rivian-price-col">
              <span className="rivian-price-label">Starting Price</span>
              <span className="rivian-price-val">{activeCar.priceText}</span>
              <span className="rivian-price-note">{activeCar.priceNote}</span>
            </div>

            <div className="rivian-specs-grid">
              {activeCar.specs.map((spec) => (
                <div key={spec.label} className="rivian-spec-item">
                  <span className="rivian-spec-label">{spec.label}</span>
                  <strong className="rivian-spec-value">{spec.value}</strong>
                  <span className="rivian-spec-unit">{spec.unit}</span>
                </div>
              ))}
            </div>
          </div>

          {activeCar.conceptNotice && (
            <p className="rivian-concept-disclaimer">
              {activeCar.conceptNotice}
            </p>
          )}

          {/* Dual Rounded Action Buttons */}
          <div className="rivian-cta-row">
            <button
              type="button"
              className="rivian-btn rivian-btn-primary"
              onClick={() => handleExplore(activeCar)}
            >
              {activeCar.cta1}
              <svg viewBox="0 0 20 20" fill="currentColor" className="rivian-btn-icon">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <button
              type="button"
              className="rivian-btn rivian-btn-secondary"
              onClick={() => handleEstimate(activeCar)}
            >
              {activeCar.cta2}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rivian-btn-icon">
                <rect x="4" y="2" width="12" height="16" rx="2" />
                <line x1="8" y1="6" x2="12" y2="6" />
                <line x1="7" y1="10" x2="7.01" y2="10" />
                <line x1="10" y1="10" x2="10.01" y2="10" />
                <line x1="13" y1="10" x2="13.01" y2="10" />
                <line x1="7" y1="13" x2="7.01" y2="13" />
                <line x1="10" y1="13" x2="10.01" y2="13" />
                <line x1="13" y1="13" x2="13.01" y2="13" />
              </svg>
            </button>
          </div>

          {/* Indicator Navigation Dots */}
          <div className="rivian-dots-indicator" role="tablist" aria-label="Select vehicle">
            {featuredVehicles.map((car, idx) => (
              <button
                key={car.id}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                aria-label={`View ${car.name}`}
                className={`rivian-dot-pill ${idx === activeIndex ? 'is-active' : ''}`}
                onClick={() => navigateTo(idx)}
              >
                <span className="rivian-dot-name">{car.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
