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
      <form className="w-full max-w-sm" onSubmit={handleSignUp}>
        <h1 className="mb-4 text-center text-4xl font-bold">Sign Up</h1>
        <p className="text-md mb-10 text-center font-light text-gray-500">
          Create your account
        </p>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="flex flex-col space-y-4">
          <Button type="submit" variant="primary">
            Sign Up
          </Button>

          <Button type="button" variant="back" onClick={handleGoBack}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
