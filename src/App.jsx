import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";
import AuthLayout from "./ui/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PasswordReset from "./pages/PasswordReset";
import Homepage from "./pages/Homepage";
import EditResume from "./pages/EditResume";
import Account from "./pages/Account";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PublicRoute from "./features/auth/PublicRoute";
import { showToast } from "./ui/Toast";
import { AuthProvider } from "./features/auth/AuthContext";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      let errorMessage = error.message;
      if (query.meta.errorMessage) errorMessage = query.meta.errorMessage;
      showToast(errorMessage, "error");
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          custom: {
            duration: 3000,
          },
        }}
      />
      <ReactQueryDevtools initialIsOpen={false} />
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
              <Route path="resumes/:id/edit" element={<EditResume />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
