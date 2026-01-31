import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";

export default function NewRecipePage() {
  const { api } = useAuth();
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [price, setPrice] = useState(0);
  const [isSecret, setIsSecret] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const payload = {
        name,
        description,
        ingredients: ingredients.split("\n").map(s => s.trim()).filter(Boolean),
        steps: steps.split("\n").map(s => s.trim()).filter(Boolean),
        price: Number(price),
        isSecret
      };
      await api.post("/api/recipes", payload);
      nav("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Error");
    }
  }

  return (
    <div className="card">
      <h2>New recipe</h2>
      {err && <p style={{ color: "#b00020" }}>{err}</p>}

      <form onSubmit={onSubmit}>
        <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <textarea placeholder={"ingredients (1 per line)"} value={ingredients} onChange={(e) => setIngredients(e.target.value)} rows={5} />
        <textarea placeholder={"steps (1 per line)"} value={steps} onChange={(e) => setSteps(e.target.value)} rows={5} />
        <input placeholder="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} min="0" />

        <label className="small">
          <input type="checkbox" checked={isSecret} onChange={(e) => setIsSecret(e.target.checked)} /> Secret recipe
        </label>

        <div style={{ marginTop: 10 }}>
          <button className="btn btnPrimary" type="submit">Create</button>{" "}
          <button className="btn" type="button" onClick={() => nav("/")}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
