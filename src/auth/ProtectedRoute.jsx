import { Navigate } from "react-router-dom";
import supabase from "../services/supabase.js";

const ProtectedRoute = ({ children }) => {
  const session = supabase.auth.session;

  return session ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
