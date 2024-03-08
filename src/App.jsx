import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AuthLayout from "./ui/AuthLayout";
import CustomToaster from "./ui/Toast";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import Homepage from "./pages/Homepage";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Form from "./features/resume/form/Form";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PublicRoute from "./features/auth/PublicRoute";
import { AuthProvider } from "./features/auth/AuthContext";
import ModalStateProvider from "./contexts/ModalStateProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ModalStateProvider>
          <Routes>
            <Route
              index
              element={
                <PublicRoute>
                  <Homepage />
                </PublicRoute>
              }
            />
            <Route
              path="/sign-in"
              element={
                <PublicRoute>
                  <AuthLayout>
                    <SignIn />
                  </AuthLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/sign-up"
              element={
                <PublicRoute>
                  <AuthLayout>
                    <SignUp />
                  </AuthLayout>
                </PublicRoute>
              }
            />
            <Route
              path="/sign-in/reset-password"
              element={
                <ProtectedRoute>
                  <AuthLayout>
                    <PasswordReset />
                  </AuthLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="app/account/"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
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
        </ModalStateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
