import React, { useEffect, useState } from "react";
import { useAuth } from "../state/AuthContext";

export default function RecipesPage() {
  const { api, user } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await api.get("/api/recipes");
    setRecipes(res.data.recipes);
    setLoading(false);
  }

  useEffect(() => { load(); }, [user?.id]);

  if (loading) return <div className="card">Loading...</div>;

  return (
    <div>
      <h2>Recipes</h2>
      <p className="small">Les recettes "secret" ne s'affichent que si tu es connecté.</p>

      {recipes.length === 0 && <div className="card">No recipes yet. Create one!</div>}

      {recipes.map((r) => (
        <div key={r._id} className="card">
          <div className="row">
            <strong>{r.name}</strong>
            <span className="small">price: {r.price}</span>
          </div>
          <p>{r.description}</p>
          <p className="small">by {r.createdBy?.username || "unknown"} • {r.isSecret ? "secret" : "public"}</p>

          {r.ingredients?.length > 0 && (
            <>
              <p className="small"><b>Ingredients</b></p>
              <ul>
                {r.ingredients.map((ing, idx) => <li key={idx}>{ing}</li>)}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
