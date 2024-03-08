import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

function PublicRoute({ children }) {
  const { pathname } = useLocation();
  const { user, isLoadingSession } = useAuth();

  const isResetPasswordRoute = pathname.includes("reset-password");

  if (isLoadingSession) return null;

  return user && !isResetPasswordRoute ? (
    <Navigate to="/app" replace />
  ) : (
    children
  );
}

export default PublicRoute;
