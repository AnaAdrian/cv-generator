import { AuthProvider } from "./features/auth/AuthContext";
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

import ModalStateProvider from "./contexts/ModalStateProvider";
import AppLayout from "./ui/AppLayout";
import AuthLayout from "./ui/AuthLayout";
import CustomToaster, { showToast } from "./ui/Toast";
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
      <ReactQueryDevtools initialIsOpen={false} />
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
    </QueryClientProvider>
  );
}

export default App;
