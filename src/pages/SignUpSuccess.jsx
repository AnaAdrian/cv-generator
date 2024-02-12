import { Navigate, useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";

import supabase from "../services/supabase";
import Button from "../ui/Button";

function SignUpSuccess() {
  const navigate = useNavigate();
  const session = supabase.auth.getSession();
  console.log(session);

  const goToLogin = () => navigate("/login");

  if (!session) {
    return <Navigate to="/app" />;
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-50">
      <div className="mx-16 max-w-[600px] text-center">
        <MdMarkEmailRead className="mx-auto text-6xl text-slate-700  " />
        <h1 className="mt-4 text-3xl font-bold text-gray-800">
          A verification email has been sent.{" "}
        </h1>
        <p className="mb-10 mt-5 text-lg text-gray-500">
          Please check your inbox and follow the instructions to complete your
          sign-up.
        </p>
        <Button variant="inverse" onClick={goToLogin} className="mt-6">
          Back to Login
        </Button>
      </div>
    </div>
  );
}

export default SignUpSuccess;
