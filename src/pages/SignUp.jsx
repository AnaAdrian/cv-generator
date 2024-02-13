import { useForm } from "react-hook-form";

import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { checkValidEmail } from "../utils/helpers";
import { useEffect, useState } from "react";
import Error from "../ui/Error";
import Loader from "../ui/Loader";
import Modal from "../ui/Modal";
import SignUpSuccess from "../ui/SignUpSuccess";

const SignUpPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setError,
    clearErrors,
    getValues,
  } = useForm();

  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
    navigate("/login", { replace: true });
  }

  useEffect(() => {
    if (isSubmitting) clearErrors("auth");
  }, [isSubmitting, clearErrors]);

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <form
          noValidate
          className="w-full max-w-sm"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <div className="mb-10 flex flex-col gap-4 text-center">
            <h1 className="text-4xl font-bold">Sign Up</h1>
            <p className="text-md font-light text-gray-500">
              Create your account
            </p>
          </div>
          <Input
            type="email"
            label="Email"
            error={formErrors?.email?.message}
            {...register("email", {
              required: "This field is required.",
              validate: (value) =>
                checkValidEmail(value) || "Email format is not correct",
            })}
          />
          <Input
            type="password"
            label="Password"
            error={formErrors?.password?.message}
            {...register("password", {
              required: "This field is required.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <Input
            type="password"
            label="Confirm Password"
            error={formErrors?.["confirm-password"]?.message}
            {...register("confirm-password", {
              required: "This field is required.",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          <div className="mb-4 mt-4 grid grid-cols-2 gap-x-2">
            <Button type="button" variant="back" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button type="submit" variant="primary">
              <div className="flex justify-center gap-2 ">
                {isSubmitting && <Loader size="sm" color="white" />}
                Sign Up
              </div>
            </Button>
          </div>
          <div className="min-h-[25px] text-center">
            {" "}
            {formErrors?.auth && (
              <Error size="md">{formErrors.auth.message}</Error>
            )}
          </div>
        </form>
      </div>
      <div className="flex max-w-64 flex-col">
        <Modal isOpen={isModalOpen} onClose={handleModalClose}>
          <SignUpSuccess />
        </Modal>
      </div>
    </>
  );
};

export default SignUpPage;
