import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ModalStateProvider from "./contexts/ModalStateProvider";
import AppLayout from "./ui/AppLayout";
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
              path="app/auth"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route index element={<Navigate to="sign-in" replace />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route
                path="reset-password"
                element={
                  <ProtectedRoute>
                    <PasswordReset />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="account" element={<Account />} />
              <Route path="resumes/:id/edit" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <CustomToaster />
        </ModalStateProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
