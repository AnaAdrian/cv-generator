// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import AuthLayout from "./ui/AuthLayout";
import CustomToaster from "./ui/Toast";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Form from "./features/resume/form/Form";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PublicRoute from "./features/auth/PublicRoute";
import { AuthProvider } from "./features/auth/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <PublicRoute>
                <Homepage />
              </PublicRoute>
            }
          />
          <Route element={<Navigate to="/login" replace />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <AuthLayout>
                  <SignIn />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <AuthLayout>
                  <SignUp />
                </AuthLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="app/resumes/:id/edit"
            element={
              <ProtectedRoute>
                <Form />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <CustomToaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
