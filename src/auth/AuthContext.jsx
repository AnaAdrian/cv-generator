import { createContext, useContext, useEffect, useState } from "react";

import supabase from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    }
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        switch (event) {
          case "SIGNED_IN":
            setUser(session?.user);
            break;
          case "SIGNED_OUT":
            setUser(null);
            break;
          default:
            break;
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return result;
    },
    signUp: async (email, password) => {
      const result = await supabase.auth.signUp({ email, password });
      return result;
    },
    signOut: async () => {
      const result = await supabase.auth.signOut();
      return result;
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
