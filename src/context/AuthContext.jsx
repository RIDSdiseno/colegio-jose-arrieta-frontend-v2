import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    // onAuthStateChange dispara INITIAL_SESSION como primer evento,
    // reemplazando getSession por separado y evitando la race condition entre ambos.
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const login = (email, password) => {
    if (!supabase) return Promise.reject(new Error("Supabase no configurado."));
    return supabase.auth.signInWithPassword({ email, password });
  };

  const logout = () => {
    if (!supabase) return Promise.resolve();
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
