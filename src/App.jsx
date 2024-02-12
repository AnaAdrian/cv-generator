// src/App.js
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./auth/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import AuthLayout from "./ui/AuthLayout";
import ResumeEditor from "./features/resume/ResumeEditor";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import CustomToaster from "./ui/Toast";
import { AuthProvider } from "./auth/AuthContext";
import SignUpSuccess from "./pages/SignUpSuccess";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthLayout>
                <SignUp />
              </AuthLayout>
            }
          />
          <Route
            path="/signup/success"
            element={
              <AuthLayout>
                <SignUpSuccess />
              </AuthLayout>
            }
          />
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="resume/:id" element={<ResumeEditor />} />
          </Route>
          {/* Additional routes here */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <CustomToaster />
    </AuthProvider>
  );
}

export default App;
