import { useEffect } from 'react';

// One IntersectionObserver for the whole page. Elements marked [data-reveal] rise and fade in
// once. Content is visible without script (the hidden state is only applied under html.reveal-ready)
// and with reduced motion nothing is hidden at all.
export default function useReveal() {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    const watch = () => document.querySelectorAll('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); root.classList.remove('reveal-ready'); };
  }, []);
}
