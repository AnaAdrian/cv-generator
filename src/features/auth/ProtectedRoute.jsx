import { Navigate } from "react-router-dom";

import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoadingSession } = useAuth();

  if (isLoadingSession) return null;

  return user ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
