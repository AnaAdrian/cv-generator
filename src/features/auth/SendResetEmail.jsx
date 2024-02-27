import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import PasswordResetConfirm from "./PasswordResetConfirm";
import { useModal } from "../../hooks/useModal";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";

function SendResetEmail({ onClose }) {
  const { resetPassword } = useAuth();
  const { isOpen: isModalOpen, openModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    clearErrors,
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  async function formHandler(formData) {
    const { email } = formData;
    if (email) {
      try {
        await resetPassword(email);
        openModal();
      } catch (error) {
        showToast("error", error.message);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div className="mb-10 flex flex-col gap-1 ">
        <h2 className="text-2xl font-normal text-gray-800">
          Reset your password?
        </h2>
        <div className="flex-grow border-t border-gray-300"></div>

        <p className="mt-3 text-sm font-light text-gray-500">
          Please provide the email address that you used when you signed up for
          your account.
          <br /> <br /> We will send you an email that will allow you to reset
          your password.
        </p>
      </div>

      <Input
        type="text"
        label="Email address"
        labelPosition="inside"
        error={formErrors?.email?.message || formErrors?.auth?.message}
        {...register("email", {
          required: "This field is required.",
        })}
        onChange={() => clearErrors("email")}
      />
      <div className="flex flex-row gap-2">
        <Button
          type="button"
          size="md"
          variant="back"
          className="flex-shrink-0"
          onClick={onClose}
        >
          Go Back
        </Button>
        <Button
          type="submit"
          size="md"
          variant="primary"
          className="flex flex-grow justify-center gap-2"
        >
          {" "}
          {/* Set width to 2/3 and apply flex styling */}
          {isSubmitting && <Loader size="sm" color="white" />}
          Send verification email
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={onClose}>
        <PasswordResetConfirm onClose={onClose} />
      </Modal>
    </form>
  );
}

export default SendResetEmail;
