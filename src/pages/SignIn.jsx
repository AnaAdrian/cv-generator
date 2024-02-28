import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import LoaderFullPage from "../ui/LoaderFullPage";
import SendResetEmailForm from "../features/auth/SendResetEmailForm";
import GoogleSignInOption from "../features/auth/GoogleSignInOption";
import AuthPageTitle from "../features/auth/AuthPageTitle";
import { useAuth } from "../features/auth/AuthContext";
import Button from "../ui/Button";

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
    return <SendResetEmailForm onClose={() => setForgotPassword(false)} />;

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div
        className={`transition-all ease-in-out ${isEmailRegistered ? "translate-y-0" : "translate-y-5"}`}
      >
        <AuthPageTitle
          title="Log In"
          text="Welcome back, we're glad you're here!"
        />

        <GoogleSignInOption onClick={signInWithGoogle} />

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
        <Button type="submit" showLoader={isSubmitting} className="mb-4 w-full">
          {isEmailRegistered ? "Sign in" : "Continue"}
        </Button>

        <div className="flex flex-col gap-3">
          {isEmailRegistered && (
            <p className="text-normal mb-2 text-center text-sm font-light text-blue-600 text-opacity-90  ">
              <span
                className="cursor-pointer hover:underline"
                onClick={() => setForgotPassword(true)}
              >
                Forgot password?
              </span>
            </p>
          )}

          <p className="text-center text-sm font-light text-gray-500 text-opacity-90 md:text-base">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/sign-up"
              className="text-blue-500 hover:text-blue-700 "
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
