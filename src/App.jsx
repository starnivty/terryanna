import Calendar from "./components/Calendar.jsx";
import DayCounter from "./components/DayCounter.jsx";
import Gallery from "./components/Gallery.jsx";
import Header from "./components/Header.jsx";
import Notes from "./components/Notes.jsx";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.js";

const galleryImages = [
  {
    src: "/images/gallery-1.jpg",
    title: "From Orion",
    description: "",
    created_at: null,
  },
  {
    src: "/images/gallery-2.jpg",
    title: "",
    description: "",
    created_at: null,
  },
  {
    src: "/images/gallery-3.jpg",
    title: "",
    description: "",
    created_at: null,
  },
  {
    src: "/images/gallery-4.jpg",
    title: "",
    description: "",
    created_at: null,
  },
  {
    src: "/images/gallery-5.jpg",
    title: "",
    description: "",
    created_at: null,
  },
];

function App() {

  const [counters, setCounters] = useState([]);
  const [loadingCounters, setLoadingCounters] = useState(true);

  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);

  const [importantDates, setImportantDates] = useState([]);
  const [loadingImportantDates, setLoadingImportantDates] = useState(true);

  const [galleryImages, setGalleryImages] = useState([]);
  const [loadingGalleryImages, setLoadingGalleryImages] = useState(true);
  
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

  useEffect(() => {
    async function fetchGalleryImages() {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("src, title, description, created_at")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Gagal mengambil gallery images:", error.message);
      } else {
        setGalleryImages(data ?? []);
      }

      setLoadingGalleryImages(false);
    }

    fetchGalleryImages();
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
        {loadingGalleryImages ? (
          <p>Memuat gallery images...</p>
        ) : galleryImages.length > 0 ? (
          <Gallery images={galleryImages} />
        ) : (
          <p>Belum ada gallery images.</p>
        )}
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