import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Loader from "../ui/Loader";
import LoaderFullPage from "../ui/LoaderFullPage";
import Modal from "../ui/Modal";
import SignUpSuccess from "../features/auth/SignUpSuccess";
import { useAuth } from "../features/auth/AuthContext";
import { useModal } from "../hooks/useModal";
import { checkValidEmail } from "../utils/helpers";
import { FaGoogle } from "react-icons/fa6";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signUp, signInWithGoogle, isLoggingIn } = useAuth();
  const { isOpen: isModalOpen, openModal, closeModal } = useModal();
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

  function handleModalClose() {
    closeModal();
    navigate("/login", { replace: true });
  }

  function handleInputChange(field) {
    clearErrors(field);
  }

  async function handleSignUp(formData) {
    const { email, password } = formData;
    const { error } = await signUp(email, password);

    if (error) {
      setError("auth", { message: error.message });
    } else {
      openModal();
    }
  }

  if (isLoggingIn) return <LoaderFullPage size="lg" color="primary" />;

  return (
    <>
      <form noValidate className="w-full" onSubmit={handleSubmit(handleSignUp)}>
        <div className="mb-10 flex flex-col gap-4 text-center">
          <h1 className="text-[32px] font-bold text-gray-800 md:text-[40px]">
            Sign Up
          </h1>
          <p className="text-sm font-light text-gray-500 md:text-base">
            Create your account
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
          type="email"
          label="Email address"
          labelPosition="inside"
          error={formErrors?.email?.message}
          {...register("email", {
            required: "This field is required.",
            validate: (value) =>
              checkValidEmail(value) || "Email format is not correct",
          })}
          onChange={() => handleInputChange("email")}
        />
        <Input
          type="password"
          label="Password"
          labelPosition="inside"
          error={formErrors?.password?.message || formErrors?.auth?.message}
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          onChange={() => handleInputChange("password")}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mb-3 w-full"
        >
          <div className="flex justify-center gap-2">
            {isSubmitting && <Loader size="sm" color="white" />}
            Sign Up
          </div>
        </Button>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <SignUpSuccess onClose={handleModalClose} />
      </Modal>
    </>
  );
};

export default SignUpPage;
