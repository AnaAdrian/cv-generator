import { useState } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { NavLink } from "react-router-dom";

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault(); // Prevent form submission from reloading the page
    console.log("Name: ", name);
    console.log("Password: ", password);
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form className="w-full max-w-sm" onSubmit={handleLogin}>
        <h1 className="mb-4 text-center text-4xl font-bold">Log In</h1>
        <p className="text-md mb-10 text-center font-light text-gray-500">
          Welcome back!
        </p>
        <Input
          type="text"
          placeholder="Email"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex flex-col space-y-4">
          <Button type="submit" variant="primary">
            Login
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <NavLink to="/signup" className="text-sky-500">
              Sign Up
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
