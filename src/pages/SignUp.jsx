import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useRef } from "react";

import Input from "../ui/Input";
import LoaderFullPage from "../ui/LoaderFullPage";
import Modal from "../ui/Modal";
import Error from "../ui/Error";
import Button from "../ui/Button";
import GoogleSignInOption from "../features/auth/GoogleSignInOption";
import AuthPageTitle from "../features/auth/AuthPageTitle";
import ActionSuccessMessage from "../features/auth/ActionSuccessMessage";
import { useAuth } from "../features/auth/AuthContext";
import { checkValidEmail } from "../utils/helpers";
import { showToast } from "../ui/Toast";

const SignUpPage = () => {
  const { signUp, signInWithGoogle, isLoggingIn } = useAuth();
  const submitButtonRef = useRef(null);
  const modalButtonRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    clearErrors,
    setError,
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  async function handleSignUp(formData) {
    const { email, password } = formData;
    try {
      const { error } = await signUp(email, password);
      if (error) {
        throw error;
      } else {
        modalButtonRef.current.click();
      }
    } catch (error) {
      if (error.message === "User already registered") {
        setError("email", { message: "Email already in use" });
      } else {
        showToast("Something went wrong", "error");
        console.error("Error signing up", error);
      }
    }
  }

  function handleKeyDownOnInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      submitButtonRef.current.click();
    }
  }

  if (isLoggingIn) return <LoaderFullPage />;

  return (
    <>
      <AuthPageTitle title="Sign Up" text="Create your account" />
      <GoogleSignInOption onClick={signInWithGoogle} />

      <form
        className="animate-fadeIn"
        noValidate
        onSubmit={handleSubmit(handleSignUp)}
      >
        <Input
          type="email"
          label="Email address"
          labelPosition="inside"
          onKeyDown={handleKeyDownOnInput}
          error={formErrors?.email?.message}
          {...register("email", {
            required: "This field is required.",
            validate: (value) =>
              checkValidEmail(value) || "Email format is not correct.",
          })}
          onChange={() => clearErrors("email")}
        />

        <Input
          type="password"
          label="Password"
          labelPosition="inside"
          onKeyDown={handleKeyDownOnInput}
          error={formErrors?.password?.message}
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          onChange={() => clearErrors("password")}
        />

        <Button
          ref={submitButtonRef}
          type="submit"
          showLoader={isSubmitting}
          className="mb-6 w-full font-semibold"
        >
          Sign Up
        </Button>
      </form>

      <p className="mb-3 text-center text-sm text-gray-400 text-opacity-90 md:text-base">
        I already have an account —{" "}
        <NavLink
          to="/app/auth/sign-in"
          className="text-blue-400 hover:text-blue-500 "
        >
          Sign In
        </NavLink>
      </p>
      <Error
        error={formErrors?.auth?.message}
        className="flex justify-center"
      />
      <Modal>
        <Modal.Open opens="sign-up-success">
          <button ref={modalButtonRef} className="hidden" />
        </Modal.Open>
        <Modal.Content name="sign-up-success">
          <ActionSuccessMessage
            title="Verification Email Sent"
            text="Please check your inbox and follow the instructions to complete your
            sign-up."
            navigateTo="/app/auth/sign-in"
          />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default SignUpPage;
