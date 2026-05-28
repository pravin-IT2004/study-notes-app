import { useState, useEffect } from "react";
import "./App.css";
import FeatureCard from "./components/FeatureCard";
import StepCard from "./components/StepCard";
import NotesForm from "./components/NotesForm";
import NotesList from "./components/NotesList";
import Login from "./pages/Login";
import Register from "./pages/Register";

const API_URL = "http://localhost:5000/api/notes";

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
    {
      title: "📄 Smart Notes",
      desc: "Convert long content into clean, structured study notes instantly.",
    },
    {
      title: "🧠 AI Summarization",
      desc: "Advanced AI simplifies complex topics into easy explanations.",
    },
    {
      title: "⚡ Fast Output",
      desc: "Generate notes in seconds with multiple formats.",
    },
    {
      title: "⬇️ Export Anytime",
      desc: "Download or copy notes for offline study.",
    },
  ];

  // ================= STEPS =================
  const STEPS = [
    {
      number: "1",
      title: "Enter Topic",
      desc: "Provide subject name, topic, or paste content.",
    },
    {
      number: "2",
      title: "Choose Format",
      desc: "Select notes type like bullet points, Q & A, or detailed notes.",
    },
    {
      number: "3",
      title: "Generate",
      desc: "Click generate and get AI-powered study notes instantly.",
    },
  ];

  return (
    <>
      {/* 🔐 LOGIN / REGISTER SCREEN */}
      {!token ? (
        <div className="auth-container">
          <h1>Notes Generator</h1>

          <Login setToken={(t) => {
            localStorage.setItem("token", t);
            setToken(t);
          }} />

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
          <section id="features" className="section">
            <div className="container">
              <h2>Why Students Love It</h2>

              <div className="grid">
                {FEATURES.map((feature, index) => (
                  <FeatureCard key={index} {...feature} />
                ))}
              </div>
            </div>
          </section>

          {/* STEPS */}
          <section id="how" className="section alt">
            <div className="container">
              <h2>How It Works</h2>

              <div className="steps">
                {STEPS.map((step, index) => (
                  <StepCard key={index} {...step} />
                ))}
              </div>
            </div>
          </section>

          {/* NOTES */}
          <section id="generator" className="section">
            <div className="container">
              <h2>Create Your Notes</h2>

              <div className="generator">
                <NotesForm addNote={addNote} />

                {loading ? (
                  <p>Loading notes...</p>
                ) : (
                  <NotesList notes={notes} deleteNote={deleteNote} />
                )}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default App;