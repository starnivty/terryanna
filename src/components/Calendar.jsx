import { useEffect, useRef, useState } from "react";

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatLongDate(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function createCalendarDays(calendarDate) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const days = [];

  for (let index = firstDay.getDay(); index > 0; index--) {
    days.push({
      date: new Date(year, month - 1, previousMonthDays - index),
      otherMonth: true,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push({ date: new Date(year, month, day), otherMonth: false });
  }

  const remaining = 42 - days.length;

  for (let day = 1; day <= remaining; day++) {
    days.push({ date: new Date(year, month + 1, day), otherMonth: true });
  }

  return days;
}

function Calendar({ importantDates }) {
  const [today] = useState(() => new Date());
  const [calendarDate, setCalendarDate] = useState(() => new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const calendarDays = createCalendarDays(calendarDate);
  const eventsByDate = new Map(
    (importantDates ?? []).map((event) => {
      if (typeof event === "string") {
        return [event, { date: event, title: "Tanggal penting" }];
      }

      return [event.date, event];
    }),
  );
  const monthTitle = calendarDate.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (amount) => {
    setCalendarDate((previousDate) => {
      const newDate = new Date(previousDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  useEffect(() => {
    if (selectedEvent) {
      closeButtonRef.current?.focus();
      return;
    }

    triggerRef.current?.focus();
  }, [selectedEvent]);

  useEffect(() => {
    if (!selectedEvent) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedEvent(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedEvent]);

  return (
    <section className="dashboard-card calendar-card">
      <div className="card-header">
        <h2>Kalender</h2>
        <button
          className="soft-button"
          onClick={() => setCalendarDate(new Date())}
        >
          Hari ini
        </button>
      </div>

      <div className="calendar-content">
        <div className="calendar-navigation">
          <button
            className="calendar-arrow"
            onClick={() => changeMonth(-1)}
            aria-label="Bulan sebelumnya"
          >
            ‹
          </button>
          <h3 className="month-title">{monthTitle}</h3>
          <button
            className="calendar-arrow"
            onClick={() => changeMonth(1)}
            aria-label="Bulan berikutnya"
          >
            ›
          </button>
        </div>

        <div className="weekdays">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map(
            (day) => (
              <div className="weekday" key={day}>
                {day}
              </div>
            ),
          )}
        </div>

        <div className="calendar-grid">
          {calendarDays.map(({ date, otherMonth }) => {
            const dateKey = formatDateKey(date);
            const importantDate = eventsByDate.get(dateKey);
            const className = [
              "calendar-day",
              otherMonth && "other-month",
              isSameDate(date, today) && "today",
              importantDate && "has-event",
            ]
              .filter(Boolean)
              .join(" ");

            if (importantDate) {
              return (
                <button
                  className={className}
                  key={dateKey}
                  type="button"
                  aria-label={`${formatLongDate(dateKey)}: ${importantDate.title || "Tanggal penting"}`}
                  aria-haspopup="dialog"
                  onClick={(event) => {
                    triggerRef.current = event.currentTarget;
                    setSelectedEvent({ ...importantDate, date: dateKey });
                  }}
                >
                  <span>{date.getDate()}</span>
                </button>
              );
            }

            return (
              <div className={className} key={dateKey}>
                <span>{date.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>

      {selectedEvent && (
        <div
          className="modal show"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedEvent(null);
            }
          }}
        >
          <div
            className="modal-content calendar-event-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-event-title"
          >
            <div className="modal-header">
              <div>
                <span className="calendar-event-eyebrow">Momen spesial</span>
                <h2 id="calendar-event-title">
                  {selectedEvent.title || "Tanggal penting"}
                </h2>
              </div>
              <button
                className="close-modal"
                ref={closeButtonRef}
                onClick={() => setSelectedEvent(null)}
                aria-label="Tutup detail tanggal"
              >
                ×
              </button>
            </div>
            <p className="calendar-event-date">
              {formatLongDate(selectedEvent.date)}
            </p>
            <p className="calendar-event-description">
              {selectedEvent.description || "Belum ada keterangan untuk tanggal ini."}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Calendar;