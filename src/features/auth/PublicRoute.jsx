import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PublicRoute({ children }) {
  const { user, isLoadingSession } = useAuth();

  if (isLoadingSession) return null;

  return user ? <Navigate to="/app" replace /> : children;
}

export default PublicRoute;
