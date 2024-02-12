import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signUp } = useAuth();

  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    const { error } = await signUp(email, password);
    if (!error) navigate("/signup/success");
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-full max-w-2xl space-y-4" onSubmit={handleSignUp}>
        <div className="mb-20 flex flex-col gap-7">
          <h1 className="text-center text-4xl font-bold">Sign Up</h1>
          <p className="text-md text-center font-light text-gray-500">
            Create your account
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <Input
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <Button type="button" variant="back" onClick={handleGoBack}>
            Back
          </Button>
          {/* Make "Sign Up" button larger by spanning two columns */}
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
