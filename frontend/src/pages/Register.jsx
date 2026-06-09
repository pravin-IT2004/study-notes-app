import { useState } from "react";

const API_URL = "https://study-notes-app-1.onrender.com/api/auth";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      alert(data.message || "Registered successfully");
    } catch (error) {
      console.error("Register error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-page register">
      <div className="auth-card">
        <h2>🚀 Create Account</h2>
        <p>Start your AI Notes journey</p>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;