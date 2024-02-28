import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Loader from "../../ui/Loader";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useModalState } from "../../contexts/ModalStateProvider";

function SendResetEmailForm({ onClose }) {
  const { resetPassword } = useAuth();
  const { openModal, closeModal } = useModalState();
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
        const { error } = await resetPassword(email);
        if (error) {
          showToast("Something went wrong", "error");
          console.error("Error sending reset email", error);
          return;
        }
        openModal();
      } catch (error) {
        showToast("Something went wrong", "error");
        console.error("Error sending reset email", error);
      }
    }
  }

  function handleCloseModal() {
    closeModal();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div className="mb-10 flex flex-col gap-1 ">
        <h2 className=" text-2xl font-normal text-gray-800">
          Reset your password?
        </h2>
        <div className="flex-grow border-t border-gray-300"></div>

        <p className=" mt-3 text-sm font-light text-gray-800">
          Please provide the email address that you used when you signed up for
          your account. <br /> <br />
          We will send you an email that will allow you to reset your password.
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
          variant="back"
          className="flex-shrink-0 text-xs md:text-sm"
          onClick={onClose}
        >
          <IoIosArrowRoundBack />
          Back
        </Button>

        <Button
          type="submit"
          size="md"
          className="flex-grow text-xs md:text-sm"
        >
          {" "}
          {isSubmitting && <Loader size="sm" color="white" />}
          {isSubmitting
            ? "Sending verification email"
            : "Send verification email"}
        </Button>
      </div>

      <Modal onClose={handleCloseModal}>
        <Modal.Title>Email Sent</Modal.Title>
        <Modal.Content>
          We&apos;ve sent you an email with instructions to reset your password.
        </Modal.Content>
        <Modal.Button>Got it</Modal.Button>
      </Modal>
    </form>
  );
}

export default SendResetEmailForm;
