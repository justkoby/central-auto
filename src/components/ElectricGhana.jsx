import { evQuestions } from '../data/electric';

export default function ElectricGhana({ onEnquire }) {
  return (
    <section className="section ev-ghana" id="ev-ghana" aria-labelledby="ev-ghana-title">
      <div className="ev-ghana-head" data-reveal>
        <h2 id="ev-ghana-title">Going electric in Ghana.</h2>
        <p className="lead">An electric car is a different way of owning a car. Four questions worth answering before you buy.</p>
        <button className="button button-outline" onClick={() => onEnquire('Going electric: questions about EVs')}>Ask our team</button>
      </div>
      <ol className="ev-questions">
        {evQuestions.map(({ q, a }) => (
          <li key={q} data-reveal>
            <h3>{q}</h3>
            <p>{a}</p>
          </li>
        ))}
      </ol>
      <p className="ev-ghana-note">General guidance. Ask our team about the specific vehicle you are considering.</p>
    </section>
  );
}
