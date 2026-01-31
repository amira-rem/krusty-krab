import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

// ✅ backend = 3000
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = useMemo(() => {
    const instance = axios.create({
      baseURL: API_URL,
      withCredentials: true, // ✅ important pour que le cookie "token" soit accepté/envoyé
    });

    instance.interceptors.request.use((config) => {
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    return instance;
  }, [token]);

  useEffect(() => {
    async function load() {
      try {
        // même si token vide, si cookie existe /me peut marcher
        const res = await api.get("/api/auth/me");
        setUser(res.data.user);
      } catch (e) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [api]);

  async function login(email, password) {
    const res = await api.post("/api/auth/login", { email, password });
    if (res.data.token) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    }
    setUser(res.data.user);
  }

  async function register(username, email, password) {
    const res = await api.post("/api/auth/register", { username, email, password });
    if (res.data.token) {
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    }
    setUser(res.data.user);
  }

  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    // optionnel: tu peux aussi ajouter une route backend pour clearCookie si tu veux
  }

  return (
    <AuthContext.Provider value={{ api, token, user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
