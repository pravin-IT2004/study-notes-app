import { useState, useEffect } from "react";
import "./App.css";

import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";

import Login from "./pages/Login";
import Register from "./pages/Register";

// ✅ PRODUCTION API URL (Vercel env)
const API_URL = `${import.meta.env.VITE_API_URL}/api/notes`;

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH TOKEN
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ================= LOAD NOTES =================
  useEffect(() => {
    if (token) {
      fetchNotes();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading notes:", error);
    } finally {
      setLoading(false);
    }
  };

  // ================= ADD NOTE =================
  const addNote = async (note) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });

      const data = await response.json();
      setNotes((prev) => [data, ...prev]);
    } catch (error) {
      console.error("Add note error:", error);
    }
  };

  // ================= DELETE NOTE =================
  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setNotes([]);
  };

  // ================= FEATURES =================
  const FEATURES = [
    { title: "📄 Smart Notes", desc: "Convert long content into clean study notes instantly." },
    { title: "🧠 AI Summarization", desc: "Simplifies complex topics." },
    { title: "⚡ Fast Output", desc: "Generate notes in seconds." },
    { title: "⬇️ Export Anytime", desc: "Copy or download notes." },
  ];

  // ================= STEPS =================
  const STEPS = [
    { number: "1", title: "Enter Topic", desc: "Provide subject or topic." },
    { number: "2", title: "Choose Format", desc: "Bullet / Q&A / detailed." },
    { number: "3", title: "Generate", desc: "Get AI notes instantly." },
  ];

  return (
    <>
      {/* 🔐 LOGIN / REGISTER */}
      {!token ? (
        <div className="auth-container">
          <h1>Notes Generator</h1>

          <Login
            setToken={(t) => {
              localStorage.setItem("token", t);
              setToken(t);
            }}
          />

          <Register />
        </div>
      ) : (
        <>
          {/* HEADER */}
          <header className="header">
            <div className="container header-container">
              <a href="#home" className="logo">
                Notes<span>Generator</span><em>.</em>
              </a>

              <button onClick={logout} className="btn-primary">
                Logout
              </button>
            </div>
          </header>

          {/* HERO */}
          <section id="home" className="hero">
            <div className="hero-content container">
              <h1>
                AI-Powered <span>Study Notes</span> Generator
              </h1>

              <p>
                Turn any topic into structured notes and store them in MongoDB.
              </p>
            </div>
          </section>

          {/* FEATURES */}
          <section className="section">
            <div className="container">
              <h2>Why Students Love It</h2>

              <div className="grid">
                {FEATURES.map((f, i) => (
                  <FeatureCard key={i} {...f} />
                ))}
              </div>
            </div>
          </section>

          {/* STEPS */}
          <section className="section alt">
            <div className="container">
              <h2>How It Works</h2>

              <div className="steps">
                {STEPS.map((s, i) => (
                  <StepCard key={i} {...s} />
                ))}
              </div>
            </div>
          </section>

          {/* NOTES */}
          <section className="section">
            <div className="container">
              <h2>Create Your Notes</h2>

              <NotesForm addNote={addNote} />

              {loading ? (
                <p>Loading notes...</p>
              ) : (
                <NotesList notes={notes} deleteNote={deleteNote} />
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App;