import { useState } from "react";

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

function createCalendarDays(calendarDate) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const days = [];

  for (let index = firstDay.getDay() - 1; index >= 0; index--) {
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
  const calendarDays = createCalendarDays(calendarDate);
  const monthTitle = calendarDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const changeMonth = (amount) => {
    setCalendarDate((previousDate) => {
      const newDate = new Date(previousDate);
      newDate.setMonth(newDate.getMonth() + amount);
      return newDate;
    });
  };

  return (
    <section className="dashboard-card calendar-card">
      <div className="card-header">
        <h2>Calendar</h2>
        <button
          className="soft-button"
          onClick={() => setCalendarDate(new Date())}
        >
          View full calendar
          <span>→</span>
        </button>
      </div>

      <div className="calendar-content">
        <div className="calendar-navigation">
          <button
            className="calendar-arrow"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
          >
            ‹
          </button>
          <h3 className="month-title">{monthTitle}</h3>
          <button
            className="calendar-arrow"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
          >
            ›
          </button>
        </div>

        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
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
            const className = [
              "calendar-day",
              otherMonth && "other-month",
              isSameDate(date, today) && "today",
              importantDates.includes(dateKey) && "has-event",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div className={className} key={dateKey}>
                <span>{date.getDate()}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Calendar;