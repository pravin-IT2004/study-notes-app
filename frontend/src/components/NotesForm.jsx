import { useState } from "react";

function NotesForm({ addNote }) {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("bullet");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!subject || !topic) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const result = await addNote({
        subject,
        topic,
        type,
      });

      if (result) {
        setSubject("");
        setTopic("");
        setType("bullet");
      } else {
        alert("Failed to generate note");
      }

    } catch (error) {
      console.error("Generate note error:", error);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="card input-card">
      <h3>Generate Notes</h3>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="text"
        placeholder="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="bullet">Bullet Points</option>
        <option value="qa">Q & A</option>
        <option value="detailed">Detailed Notes</option>
      </select>

      <button
        className="btn-primary full"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate"}
      </button>
    </div>
  );
}

export default NotesForm;