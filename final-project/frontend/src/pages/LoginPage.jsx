import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function LoginPage() {
  const { login, register } = useAuth();
  const nav = useNavigate();
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      if (mode === "login") await login(email, password);
      else await register(username, email, password);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Error");
    }
  }

  return (
    <div className="card">
      <h2>{mode === "login" ? "Login" : "Register"}</h2>
      {err && <p style={{ color: "#b00020" }}>{err}</p>}
      <form onSubmit={onSubmit}>
        {mode === "register" && (
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        )}
        <input placeholder="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btnPrimary" type="submit">
          {mode === "login" ? "Login" : "Create account"}
        </button>
      </form>

      <p className="small" style={{ marginTop: 10 }}>
        {mode === "login" ? (
          <>No account? <button className="btn" onClick={() => setMode("register")}>Register</button></>
        ) : (
          <>Already have an account? <button className="btn" onClick={() => setMode("login")}>Login</button></>
        )}
      </p>

      <p className="small">Note: le 1er compte créé devient <b>admin</b>.</p>
    </div>
  );
}
