import '../styles/howItWorks.css';

const STEPS = [
  {
    num: '01',
    title: 'Explore',
    desc: 'Find an EV that fits your needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Enquire',
    desc: "Confirm the vehicle's price and availability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Arrange',
    desc: 'Discuss sourcing, payment and delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Drive',
    desc: 'Complete your purchase and take delivery.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polygon points="10 8 16 12 10 16 10 8" />
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
            Going electric, made simple.
          </h2>
        </header>

        <div className="how-it-works__track" data-reveal>
          <div className="how-it-works__line" aria-hidden="true" />
          <div className="how-it-works__steps">
            {STEPS.map((step, idx) => (
              <div key={step.num} className="how-it-works__step">
                <div className="how-it-works__marker">
                  <span className="how-it-works__num">{step.num}</span>
                  <div className="how-it-works__icon" aria-hidden="true">
                    {step.icon}
                  </div>
                </div>
                <div className="how-it-works__content">
                  <h3 className="how-it-works__step-title">{step.title}</h3>
                  <p className="how-it-works__step-desc">{step.desc}</p>
                </div>
                {idx < STEPS.length - 1 && (
                  <div className="how-it-works__mobile-separator" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
