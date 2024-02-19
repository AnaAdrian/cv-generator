import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

import supabase from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingSesion, setIsLoadingSesion] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const checkSession = useCallback(async function checkSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setUser(session?.user);
    setIsLoadingSesion(false);
  }, []);

  useEffect(() => {
    if (
      user &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/app", { replace: true });
    }
  }, [user, location, navigate]);

  useEffect(() => {
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN") {
          setUser(session.user);
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [checkSession]);

  const value = {
    user,
    isLoadingSesion,
    signIn: async (email, password) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return result;
    },
    signInWithGoogle: async () => {
      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: "http://localhost:5173/login" },
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
    console.warn("useAuth must be used within an AuthProvider");
    return {
      user: null,
      isLoadingSesion: true,
      signIn: () => {},
      signInWithGoogle: () => {},
      signUp: () => {},
      signOut: () => {},
    };
  }
  return context;
}
