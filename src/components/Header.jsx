import { useEffect, useState } from 'react';

const links = [
  ['#electric', 'Electric'],
  ['#inventory', 'Vehicles'],
  ['#services', 'Services'],
  ['#source', 'Sourcing'],
];

export default function Header({ savedCount, savedOnly, onSaved, onContact }) {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const update = () => setSolid(window.scrollY >= 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const close = () => setOpen(false);
  return (
    <header className={`site-nav ${solid || open ? 'is-solid' : ''}`}>
      <nav aria-label="Main navigation">
        <a className="logo" href="#" aria-label="Central Auto Ltd home" onClick={close}>
          <img src="/logo.svg" alt="" width="1035" height="426" decoding="async" fetchPriority="high" />
        </a>
        <div id="main-navigation" className={`navlinks ${open ? 'open' : ''}`}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={close}>{label}</a>
          ))}
          <button className="navlink-button mobile-only" onClick={() => { close(); onSaved(); }}>Saved cars ({savedCount})</button>
          <button className="button button-solid mobile-only" onClick={() => { close(); onContact(); }}>Talk to us</button>
        </div>
        <div className="navright">
          <button className={`saved-link ${savedOnly ? 'active' : ''}`} onClick={() => { close(); onSaved(); }} aria-label={`Saved cars, ${savedCount}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9-9.4C2.1 8 4 5.5 6.8 5.5c1.9 0 3.3 1 5.2 3 1.9-2 3.3-3 5.2-3 2.8 0 4.7 2.5 3.8 5.6-1.5 4.8-9 9.4-9 9.4Z" /></svg>
            <span>{savedCount}</span>
          </button>
          <button className="button button-solid nav-contact" onClick={onContact}>Talk to us</button>
          <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
