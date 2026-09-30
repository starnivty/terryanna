import Calendar from "./components/Calendar.jsx";
import DayCounter from "./components/DayCounter.jsx";
import Gallery from "./components/Gallery.jsx";
import Header from "./components/Header.jsx";
import Notes from "./components/Notes.jsx";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.js";

const galleryImages = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
];

const importantDates = [
  { date: "2026-08-07", title: "Contoh tanggal", description: "" },
  { date: "2026-08-12", title: "", description: "" },
  { date: "2026-08-15", title: "", description: "" },
  { date: "2026-08-25", title: "", description: "" },
];

function App() {

  const [counters, setCounters] = useState([]);
  const [loadingCounters, setLoadingCounters] = useState(true);

  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const [importantDates, setImportantDates] = useState([]);
  const [loadingImportantDates, setLoadingImportantDates] = useState(true);

  useEffect(() => {
    async function fetchCounters() {
      const { data, error } = await supabase
        .from("counters")
        .select("id, title, date, image")
        .order("date", { ascending: true });

      if (error) {
        console.error("Gagal mengambil counters:", error.message);
      } else {
        setCounters(data ?? []);
      }

      setLoadingCounters(false);
    }

    fetchCounters();
  }, []);

  useEffect(() => {
    async function fetchNotes() {
      const { data, error } = await supabase
        .from("notes")
        .select("created_at, text")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Gagal mengambil notes:", error.message);
      } else {
        setNotes(data ?? []);
      }

      setLoadingNotes(false);
    }

    fetchNotes();
  }, []);
  
  useEffect(() => {
    async function fetchImportantDates() {
      const { data, error } = await supabase
        .from("important_dates")
        .select("date, title, description")
        .order("date", { ascending: true });

      if (error) {
        console.error("Gagal mengambil important dates:", error.message);
      } else {
        setImportantDates(data ?? []);
      }

      setLoadingImportantDates(false);
    }

    fetchImportantDates();
  }, []);


  return (
    <div className="page">
      <Header />

      <main className="dashboard">
        <Calendar importantDates={importantDates} />
        {loadingCounters ? (
          <p>Memuat memories...</p>
        ) : counters.length > 0 ? (
          <DayCounter counters={counters} />
        ) : (
          <p>Belum ada memories.</p>
        )}
        <Gallery images={galleryImages} />
        {loadingNotes ? (
          <p>Memuat notes...</p>
        ) : notes.length > 0 ? (
          <Notes notes={notes} />
        ) : (
          <p>Belum ada notes.</p>
        )}
      </main>
    </div>
  );
}

export default App;