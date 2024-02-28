import { createContext, useContext, useEffect, useState } from "react";

import supabase from "../../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user);
      setIsLoadingSession(false);
    }
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
  }, []);

  const value = {
    user,
    isLoadingSession,
    isLoggingIn,
    signInWithEmail: async (email, password) => {
      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return result;
    },
    signInWithGoogle: async () => {
      setIsLoggingIn(true);
      const result = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: "http://localhost:5173/sign-in" },
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
    resetPassword: async (email) => {
      const result = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/sign-in/reset-password",
      });
      return result;
    },
    updatePassword: async (password) => {
      const result = await supabase.auth.updateUser({
        password: password,
      });
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
      isLoadingSession: true,
      isLoggingIn: false,
      signInWithEmail: () => {},
      signInWithGoogle: () => {},
      signUp: () => {},
      signOut: () => {},
      resetPassword: () => {},
      updatePassword: () => {},
    };
  }
  return context;
}
