import { useState } from "react";

function formatCreatedAt(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

function Notes({ notes }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="dashboard-card notes-card">
        <div className="card-header">
          <h2>Notes</h2>
          <button className="soft-button" onClick={() => setIsOpen(true)}>
            Open notes
            <span>→</span>
          </button>
        </div>

        <div className="notes-content">
          <div className="note-preview">
            <div className="quote-mark">“</div>
            <p className="note-text">{notes[0].text}</p>
            <span className="note-updated">Updated 2 hours ago</span>
          </div>
        </div>
      </section>

      <div
        className={["modal", isOpen && "show"].filter(Boolean).join(" ")}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setIsOpen(false);
          }
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h2>My Notes</h2>
            <button
              className="close-modal"
              onClick={() => setIsOpen(false)}
              aria-label="Close notes"
            >
              ×
            </button>
          </div>

          <div className="note-list">
            {notes.map((note) => (
              <div className="note-item" key={note.created_at}>
                <div className="note-item-date">{formatCreatedAt(note.created_at)}</div>
                <div className="note-item-text">{note.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Notes;