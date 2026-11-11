import { useState } from 'react';
import { evQuestions } from '../data/electric';

export default function ElectricGhana({ onEnquire }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="section ev-ghana" id="ev-ghana" aria-labelledby="ev-ghana-title">
      <div className="ev-ghana-head" data-reveal>
        <h2 id="ev-ghana-title">Going electric in Ghana.</h2>
        <p className="lead">An electric car is a different way of owning a car. Four questions worth answering before you buy.</p>
        <button className="button button-outline" onClick={() => onEnquire('Going electric: questions about EVs')}>Ask our team</button>
      </div>

      <div className="ev-accordion" data-reveal>
        {evQuestions.map(({ q, a }, index) => {
          const isOpen = openIndex === index;
          const panelId = `ev-answer-${index}`;
          const buttonId = `ev-question-${index}`;
          return (
            <div key={q} className={`ev-accordion-item${isOpen ? ' is-open' : ''}`}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="ev-accordion-trigger"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{q}</span>
                  <span className="ev-accordion-icon" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="ev-accordion-panel"
                hidden={!isOpen}
              >
                <p>{a}</p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="ev-ghana-note">General guidance. Ask our team about the specific vehicle you are considering.</p>
    </section>
  );
}
