import { useForm } from "react-hook-form";
import { useRef } from "react";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useModalState } from "../../contexts/ModalStateProvider";
import { checkValidEmail } from "../../utils/helpers";

function SendResetEmailForm({ email, onClose }) {
  const { resetPassword } = useAuth();
  const { openModal, closeModal } = useModalState();
  const submitButtonRef = useRef();

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

  function handleKeyDownOnInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      submitButtonRef.current.click();
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

        <p className="mt-3 text-sm font-light text-gray-800">
          Please provide the email address that you used when you signed up for
          your account. <br /> <br />
          We will send you an email that will allow you to reset your password.
        </p>
      </div>

      <Input
        type="text"
        label="Email address"
        labelPosition="inside"
        defaultValue={email}
        onKeyDown={handleKeyDownOnInput}
        error={formErrors?.email?.message || formErrors?.auth?.message}
        {...register("email", {
          required: "This field is required.",
          validate: (value) =>
            checkValidEmail(value) || "Email format is not correct.",
        })}
        onChange={() => clearErrors("email")}
      />
      <div className="flex flex-row gap-2">
        <Button
          variant="back"
          className="flex-shrink-0 font-semibold"
          onClick={onClose}
        >
          <IoIosArrowRoundBack />
          Back
        </Button>

        <Button
          ref={submitButtonRef}
          type="submit"
          showLoader={isSubmitting}
          className="flex-grow font-semibold"
        >
          Send Reset Email
        </Button>
      </div>

      <Modal onClose={handleCloseModal}>
        <Modal.Title>Email Sent</Modal.Title>
        <Modal.Content>
          An email with password reset instructions has been sent to your email
          address if it exists on our system.
        </Modal.Content>
        <Modal.Button>Got it</Modal.Button>
      </Modal>
    </form>
  );
}

export default SendResetEmailForm;
