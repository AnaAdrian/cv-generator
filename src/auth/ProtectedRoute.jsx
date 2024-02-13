import { Navigate } from "react-router-dom";

import Loader from "../ui/Loader";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, isLoadingSesion } = useAuth();

  if (isLoadingSesion) return <Loader />;

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
