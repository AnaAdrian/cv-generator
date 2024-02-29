import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import LoaderFullPage from "../ui/LoaderFullPage";
import SendResetEmailForm from "../features/auth/SendResetEmailForm";
import GoogleSignInOption from "../features/auth/GoogleSignInOption";
import AuthPageTitle from "../features/auth/AuthPageTitle";
import Button from "../ui/Button";
import { useAuth } from "../features/auth/AuthContext";
import { checkValidEmail } from "../utils/helpers";
import { handleKeyDown } from "../utils/formUtils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const { signInWithEmail, signInWithGoogle, isLoggingIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
    clearErrors,
    setFocus,
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  const formHandler = isEmailValid ? handleSignInWithEmail : handleCheckEmail;
  const handleKeySubmit = handleKeyDown(handleSubmit(formHandler), setFocus);

  useEffect(() => {
    if (isSubmitting) clearErrors("auth");
  }, [isSubmitting, clearErrors]);

  function handleCheckEmail({ email }) {
    if (checkValidEmail(email)) setIsEmailValid(true);
    else setError("email", { message: "Email format is not correct." });
  }

  async function handleSignInWithEmail(formData) {
    const { email, password } = formData;
    try {
      const { error } = await signInWithEmail(email, password);
      if (error) {
        setError("auth", { message: "Invalid email or password" });
      } else {
        navigate("/app", { replace: true });
      }
    } catch (error) {
      console.error("Error signing in", error);
    }
  }

  if (isLoggingIn) return <LoaderFullPage size="lg" color="primary" />;

  if (forgotPassword)
    return <SendResetEmailForm onClose={() => setForgotPassword(false)} />;

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div
        className={`transition-all ease-in-out ${isEmailValid ? "translate-y-0" : "translate-y-5"}`}
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
          onKeyDown={(e) => handleKeySubmit(e, "password")}
          error={formErrors?.email?.message}
          {...register("email", {
            required: "This field is required.",
            validate: (value) =>
              checkValidEmail(value) || "Email format is not correct.",
          })}
          onChange={() => clearErrors("email")}
        />
      </div>

      <div
        className={`transition-opacity duration-300 ease-in-out ${isEmailValid ? "translate-y-0 opacity-100" : "mt-12 -translate-y-5 opacity-0"}`}
      >
        {isEmailValid && (
          <Input
            type="password"
            label="Password"
            labelPosition="inside"
            onKeyDown={handleKeySubmit}
            error={formErrors?.password?.message || formErrors?.auth?.message}
            {...register("password", {
              required: "This field is required.",
            })}
            onChange={() => clearErrors("password")}
          />
        )}
      </div>

      <div
        className={`transition-all ease-in-out ${isEmailValid ? "translate-y-0" : "-translate-y-5 "}`}
      >
        <Button
          type="submit"
          showLoader={isSubmitting}
          className="mb-6 w-full font-normal md:font-semibold"
        >
          {isEmailValid ? "Sign In" : "Continue"}
        </Button>

        <div className="flex flex-col gap-3 text-opacity-80">
          {isEmailValid && (
            <p className="mb-2 text-center text-sm font-light text-blue-400 ">
              <span
                className="cursor-pointer hover:underline"
                onClick={() => setForgotPassword(true)}
              >
                Forgot password?
              </span>
            </p>
          )}

          <p className="text-center text-sm text-gray-400 md:text-base ">
            Become a member —{" "}
            <NavLink
              to="/sign-up"
              className="text-blue-400 hover:text-blue-500 "
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
