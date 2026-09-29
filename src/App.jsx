import Calendar from "./components/Calendar.jsx";
import DayCounter from "./components/DayCounter.jsx";
import Gallery from "./components/Gallery.jsx";
import Header from "./components/Header.jsx";
import Notes from "./components/Notes.jsx";

const counters = [
  {
    id: 1,
    title: "Our First Date",
    date: "2026-08-07",
    image: "/images/counter-1.jpg",
  },
  {
    id: 2,
    title: "First Concert",
    date: "2026-08-10",
    image: "/images/counter-2.jpg",
  },
  {
    id: 3,
    title: "Japan Trip",
    date: "2026-08-12",
    image: "/images/counter-3.jpg",
  },
];

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
];

const notes = [
  {
    date: "20 August 2026",
    text: "Be proud of how far you've come.",
  },
  {
    date: "18 August 2026",
    text: "Don't forget to take a little time for yourself today.",
  },
  {
    date: "15 August 2026",
    text: "Some memories deserve to be kept forever.",
  },
];

const importantDates = [
  "2026-08-07",
  "2026-08-12",
  "2026-08-15",
  "2026-08-25",
];

function App() {
  return (
    <div className="page">
      <Header />

      <main className="dashboard">
        <Calendar importantDates={importantDates} />
        <DayCounter counters={counters} />
        <Gallery images={galleryImages} />
        <Notes notes={notes} />
      </main>
    </div>
  );
}

export default App;