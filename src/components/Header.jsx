import { useState } from "react";

function Header() {
  const [currentDate] = useState(() => new Date());

  return (
    <header className="header">
      <div className="greeting">
        <h1>Hello, Aleyna</h1>
        <p>Your little corner of memories</p>
      </div>

      <div className="current-date">
        <span>◫</span>
        <span>
          {currentDate?.toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </header>
  );
}

export default Header;