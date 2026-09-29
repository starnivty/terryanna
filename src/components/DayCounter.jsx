import { useState } from "react";

function calculateDays(dateString) {
  const startDate = new Date(dateString);
  const today = new Date();

  startDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.floor(
    (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DayCounter({ counters }) {
  const [counterIndex, setCounterIndex] = useState(0);
  const selectedCounter = counters[counterIndex];

  const changeCounter = (amount) => {
    setCounterIndex((previousIndex) =>
      (previousIndex + amount + counters.length) % counters.length,
    );
  };

  return (
    <section className="dashboard-card counter-card">
      <div className="card-header">
        <h2>Day Counter</h2>
        <div className="counter-navigation">
          <button
            className="counter-arrow"
            onClick={() => changeCounter(-1)}
            aria-label="Previous memory"
          >
            ‹
          </button>
          <span className="counter-position">
            {counterIndex + 1} / {counters.length}
          </span>
          <button
            className="counter-arrow"
            onClick={() => changeCounter(1)}
            aria-label="Next memory"
          >
            ›
          </button>
        </div>
      </div>

      <div className="counter-body">
        <img
          className="counter-image"
          src={selectedCounter.image}
          alt={selectedCounter.title}
        />
        <div className="counter-info">
          <h3 className="counter-title">{selectedCounter.title}</h3>
          <p className="counter-date">{formatDate(selectedCounter.date)}</p>
          <div className="counter-divider" />
          <div className="counter-number">
            {calculateDays(selectedCounter.date)}
          </div>
          <p className="counter-label">days since</p>
          <div className="counter-dots">
            {counters.map((counter, index) => (
              <button
                key={counter.id}
                className={[
                  "counter-dot",
                  index === counterIndex && "active",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setCounterIndex(index)}
                aria-label={`View ${counter.title}`}
                aria-current={index === counterIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DayCounter;