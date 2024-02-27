import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import LoaderFullPage from "../ui/LoaderFullPage";
import SendResetEmail from "../features/auth/SendResetEmail";
import { useAuth } from "../features/auth/AuthContext";
import { FaGoogle } from "react-icons/fa6";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { signInWithEmail, signInWithGoogle, isLoggingIn } = useAuth();
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

  async function handleSignInWithEmail(formData) {
    const { email, password } = formData;
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError("auth", { message: error.message });
      } else {
        navigate("/app", { replace: true });
      }
    } catch (error) {
      console.error("Error signing in", error);
    }
  }

  const formHandler = isEmailRegistered
    ? handleSignInWithEmail
    : handleCheckEmail;

  if (isLoggingIn) return <LoaderFullPage size="lg" color="primary" />;

  if (forgotPassword)
    return <SendResetEmail onClose={() => setForgotPassword(false)} />;

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
          error={formErrors?.email?.message}
          {...register("email", {
            required: "This field is required.",
          })}
          onChange={() => clearErrors("email")}
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
              error={formErrors?.password?.message || formErrors?.auth?.message}
              {...register("password", {
                required: "This field is required.",
              })}
              onChange={() => clearErrors("password")}
            />
          </div>
        )}
      </div>

      <div
        className={`transition-all ease-in-out ${isEmailRegistered ? "translate-y-0" : "-translate-y-5 "}`}
      >
        <div className="flex flex-col gap-3">
          <Button type="submit" variant="primary" size="md">
            <div className="flex justify-center gap-2 ">
              {isSubmitting && <Loader size="sm" color="white" />}
              {isEmailRegistered ? "Sign In" : "Continue"}
            </div>
          </Button>
          {isEmailRegistered && (
            <p
              className="md:text-normal mb-2 cursor-pointer text-center text-sm font-light text-blue-500 text-opacity-90 hover:underline "
              onClick={() => setForgotPassword(true)}
            >
              Forgot password?
            </p>
          )}
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
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
