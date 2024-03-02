import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useRef } from "react";

import Input from "../ui/Input";
import LoaderFullPage from "../ui/LoaderFullPage";
import Modal from "../ui/Modal";
import Error from "../ui/Error";
import Button from "../ui/Button";
import GoogleSignInOption from "../features/auth/GoogleSignInOption";
import AuthPageTitle from "../features/auth/AuthPageTitle";
import { useAuth } from "../features/auth/AuthContext";
import { checkValidEmail } from "../utils/helpers";
import { useModalState } from "../contexts/ModalStateProvider";
import { showToast } from "../ui/Toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isLoggingIn } = useAuth();
  const { openModal, closeModal } = useModalState();
  const submutButtonRef = useRef(null);

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
        openModal();
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

  function handleModalClose() {
    closeModal();
    navigate("/sign-in", { replace: true });
  }

  function handleKeyDownOnInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      submutButtonRef.current.click();
    }
  }

  if (isLoggingIn) return <LoaderFullPage size="lg" color="primary" />;

  return (
    <>
      <AuthPageTitle title="Sign Up" text="Create your account" />
      <GoogleSignInOption onClick={signInWithGoogle} />

      <form noValidate onSubmit={handleSubmit(handleSignUp)}>
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
          ref={submutButtonRef}
          type="submit"
          showLoader={isSubmitting}
          className="mb-6 w-full font-semibold"
        >
          Sign Up
        </Button>
      </form>

      <p className="mb-3 text-center text-sm text-gray-400 text-opacity-90 md:text-base">
        I already have an account —{" "}
        <NavLink to="/sign-in" className="text-blue-400 hover:text-blue-500 ">
          Sign In
        </NavLink>
      </p>

      <Error
        error={formErrors?.auth?.message}
        className="flex justify-center"
      />

      <Modal onClose={handleModalClose}>
        <Modal.Title>A verification email has been sent.</Modal.Title>
        <Modal.Content>
          Please check your inbox and follow the instructions to complete your
          sign-up.
        </Modal.Content>
        <Modal.Button>Close</Modal.Button>
      </Modal>
    </>
  );
};

export default SignUpPage;
