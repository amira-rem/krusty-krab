import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { useAuth } from "./state/AuthContext";
import LoginPage from "./pages/LoginPage";
import RecipesPage from "./pages/RecipesPage";
import NewRecipePage from "./pages/NewRecipePage";

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="container">
      <div className="nav">
        <Link to="/">Recipes</Link>
        {user ? (
          <>
            <Link to="/new">New recipe</Link>
            <span className="small">Logged: {user.username} ({user.role})</span>
            <button className="btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <a className="small" href="http://localhost:3000/admin/login" target="_blank" rel="noreferrer">
          Admin dashboard
        </a>
      </div>

      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/new"
          element={
            <PrivateRoute>
              <NewRecipePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
