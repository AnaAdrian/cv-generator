import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isLoggingIn } = useAuth();
  const { openModal, closeModal } = useModalState();
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

  async function handleSignUp(formData) {
    const { email, password } = formData;
    const { error } = await signUp(email, password);

    if (error) {
      setError("auth", { message: error.message });
    } else {
      openModal();
    }
  }

  function handleModalClose() {
    closeModal();
    navigate("/sign-in", { replace: true });
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
          error={formErrors?.email?.message}
          {...register("email", {
            required: "This field is required.",
            validate: (value) =>
              checkValidEmail(value) || "Email format is not correct",
          })}
          onChange={() => clearErrors("email")}
        />

        <Input
          type="password"
          label="Password"
          labelPosition="inside"
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

        <Button type="submit" showLoader={isSubmitting} className="mb-4 w-full">
          Sign Up
        </Button>
      </form>

      <p className="mb-3 text-center text-sm font-light text-gray-500 text-opacity-90 md:text-base">
        Already have an account?{" "}
        <NavLink to="/sign-in" className="text-blue-500 hover:text-blue-700 ">
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
        <Modal.Button>Got it</Modal.Button>
      </Modal>
    </>
  );
};

export default SignUpPage;
