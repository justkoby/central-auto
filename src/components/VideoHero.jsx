import { useRef, useState, useEffect } from 'react';
import SpecularButton from './SpecularButton';
import '../styles/videoHero.css';

const VIDEO_SRC = 'https://res.cloudinary.com/justkoby/video/upload/v1795379435/Video_Project_11_1_ejlu5h.mp4';

export default function VideoHero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.play().catch(() => {
      // Autoplay with sound might be blocked, ensure muted plays smoothly
      video.muted = true;
      video.play().catch(() => {});
    });
  }, []);

  const handleScrollToCatalog = () => {
    const target = document.getElementById('inventory');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="video-hero" aria-label="Hero Video Showcase">
      <div className="video-hero__background">
        <video
          ref={videoRef}
          className="video-hero__video"
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <div className="video-hero__overlay" aria-hidden="true" />
      </div>

      <div className="video-hero__bottom">
        <SpecularButton
          size="lg"
          radius={18}
          tint="#ffffff"
          tintOpacity={0.04}
          textColor="#f5f5f5"
          lineColor="#ffffff"
          baseColor="#525252"
          intensity={1}
          idleIntensity={0.35}
          shineSize={10}
          shineFade={34}
          thickness={1.2}
          glow={1}
          followMouse
          proximity={250}
          onClick={handleScrollToCatalog}
        >
          Find Your Car
        </SpecularButton>
      </div>
    </section>
  );
}
