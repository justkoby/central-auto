import { useRef, useState, useEffect } from 'react';
import SpecularButton from './SpecularButton';
import '../styles/videoHero.css';

const VIDEO_SRC = 'https://res.cloudinary.com/justkoby/video/upload/v1795379435/Video_Project_11_1_ejlu5h.mp4';
const POSTER_SRC = '/assets/featured-ev/cars/atto-3/full.webp';

export default function VideoHero({ onEnquire }) {
  const videoRef = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  const handleScrollToInventory = () => {
    const target = document.getElementById('inventory');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTalkToUs = () => {
    if (onEnquire) {
      onEnquire('General enquiries');
    } else {
      const source = document.getElementById('source');
      if (source) source.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="video-hero" aria-label="Hero Showcase">
      <div className="video-hero__background">
        <video
          ref={videoRef}
          className="video-hero__video"
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
        />
        <div className="video-hero__overlay" aria-hidden="true" />
      </div>

      <div className="video-hero__content-wrap">
        <div className="video-hero__content" data-reveal>
          <span className="video-hero__pill">100% Electric Dealership · Ghana</span>
          <h1 className="video-hero__title">
            Your next drive starts electric.
          </h1>
          <p className="video-hero__subtitle">
            Explore electric vehicles, compare your options and find the right fit for life in Ghana.
          </p>

          <div className="video-hero__actions">
            <SpecularButton
              size="lg"
              radius={18}
              tint="#ffffff"
              tintOpacity={0.05}
              textColor="#ffffff"
              lineColor="#25d366"
              baseColor="#25d366"
              intensity={1}
              idleIntensity={0.4}
              shineSize={12}
              shineFade={32}
              thickness={1.4}
              glow={1.2}
              followMouse
              proximity={220}
              onClick={handleScrollToInventory}
              aria-label="Explore electric vehicles in our collection"
            >
              Explore EVs
            </SpecularButton>

            <button
              type="button"
              className="video-hero__contact-btn"
              onClick={handleTalkToUs}
              aria-label="Talk to an automotive advisor"
            >
              Talk to Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
