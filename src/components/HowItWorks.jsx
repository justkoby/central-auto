import '../styles/howItWorks.css';

const STAGES = [
  {
    num: 1,
    title: 'Choose Your EV',
    desc: 'Browse and compare the best electric vehicles.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.7 2 11 2 11.3V16c0 .6.4 1 1 1h2" />
        <circle cx="7" cy="17" r="2" />
        <path d="M9 17h6" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
  },
  {
    num: 2,
    title: 'Configure & Order',
    desc: 'Customize your vehicle and submit your order.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    num: 3,
    title: 'We Confirm',
    desc: 'Our team will confirm your order and payment.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: 4,
    title: 'Delivery to You',
    desc: 'We deliver your EV anywhere in Ghana.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works" aria-labelledby="how-it-works-title">
      <div className="how-it-works__container">
        <header className="how-it-works__header" data-reveal>
          <h2 id="how-it-works-title" className="how-it-works__title">
            How It Works
          </h2>
        </header>

        <div className="how-it-works__track" data-reveal>
          <div className="how-it-works__line" aria-hidden="true" />
          <div className="how-it-works__steps">
            {STAGES.map((stage) => (
              <div key={stage.num} className="how-it-works__step">
                <div className="how-it-works__badge-wrap">
                  <div className="how-it-works__icon-circle" aria-hidden="true">
                    {stage.icon}
                  </div>
                  <span className="how-it-works__num-badge">{stage.num}</span>
                </div>
                <div className="how-it-works__step-content">
                  <h3 className="how-it-works__step-title">{stage.title}</h3>
                  <p className="how-it-works__step-desc">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
