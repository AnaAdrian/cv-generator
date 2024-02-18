import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Error from "../ui/Error";
import Loader from "../ui/Loader";
import { useAuth } from "../auth/AuthContext";
import { FaGoogle } from "react-icons/fa6";

const LoginPage = () => {
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, isLoadingSesion } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  useEffect(() => {
    if (isSubmitting) clearErrors("auth");
  }, [isSubmitting, clearErrors]);

  function handleCheckEmail(email) {
    if (email) setIsEmailRegistered(true);
  }

  async function handleLogin(formData) {
    const { name, password } = formData;
    const { error } = await signIn(name, password);
    if (error) {
      setError("auth", { message: error.message });
    } else {
      navigate("/app", { replace: true });
    }
  }

  async function handleInputChange(field) {
    clearErrors(field);
  }

  const formHandler = isEmailRegistered ? handleLogin : handleCheckEmail;

  if (isLoadingSesion) return <Loader size="md" color="primary" />;

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div
        className={`transition-all ease-in-out ${isEmailRegistered ? "translate-y-0" : "translate-y-5"}`}
      >
        <div className="mb-10 flex flex-col gap-3 text-center">
          <h1 className="text-[32px] font-bold text-gray-800 md:text-[40px]">
            Log In
          </h1>
          <p className="text-sm font-light text-gray-500 text-opacity-85 md:text-base">
            Welcome back, we&apos;re glad you&apos;re here!
          </p>
        </div>

        <Button
          size="md"
          fontWeight="font-small"
          variant="google"
          className="flex w-full items-center justify-center"
          onClick={signInWithGoogle}
        >
          <FaGoogle className="hidden text-white sm:inline-flex" />
          <span className="flex-grow text-center">Continue with Google</span>
          <FaGoogle className="invisible hidden sm:inline-flex" />
        </Button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 flex-shrink text-sm font-light text-gray-400">
            or
          </span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <Input
          type="text"
          label="Email address"
          labelPosition="inside"
          error={formErrors?.name?.message}
          {...register("name", {
            required: "This field is required.",
          })}
          onChange={() => handleInputChange("name")}
        />
      </div>
      <div
        className={`transition-opacity duration-300 ease-in-out ${isEmailRegistered ? "translate-y-0 opacity-100" : "mt-12 -translate-y-5 opacity-0"}`}
      >
        {isEmailRegistered && (
          <div className="mb-4">
            <Input
              type="password"
              label="Password"
              labelPosition="inside"
              error={formErrors?.password?.message}
              {...register("password", {
                required: "This field is required.",
              })}
              onChange={() => handleInputChange("password")}
            />
          </div>
        )}
      </div>

      <div
        className={`transition-all ease-in-out ${isEmailRegistered ? "translate-y-0" : "-translate-y-5 "}`}
      >
        <div className="flex flex-col gap-5">
          <Button type="submit" variant="primary" size="md">
            <div className="flex justify-center gap-2 ">
              {isSubmitting && <Loader size="sm" color="white" />}
              {isEmailRegistered ? "Sign In" : "Continue"}
            </div>
          </Button>
          <div className="flex flex-col gap-5 text-center">
            <p className="text-sm font-light text-gray-500 text-opacity-90 md:text-base">
              Don&apos;t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-500 hover:text-blue-700 "
              >
                Sign Up
              </NavLink>
            </p>
            <div className="min-h-[25px]">
              {" "}
              {formErrors?.auth && (
                <Error size="md">{formErrors.auth.message}</Error>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
