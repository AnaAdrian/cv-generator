import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";
import { useModalState } from "../../contexts/ModalStateProvider";
import { useRef } from "react";

function PasswordResetForm() {
  const navigate = useNavigate();
  const { updatePassword } = useAuth();
  const { openModal, closeModal } = useModalState();
  const submitButtonRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    clearErrors,
  } = useForm({ mode: "onChange", reValidateMode: "onSubmit" });

  async function formHandler(formData) {
    const { password } = formData;
    if (password) {
      try {
        const { error } = await updatePassword(password);
        if (error) {
          showToast(error.message, "error");
          console.error("Error updating the password", error);
          return;
        }
        openModal();
      } catch (error) {
        showToast("Something went wrong", "error");
        console.error("Error updating the password", error);
      }
    }
  }

  function handleCloseModal() {
    closeModal();
    navigate("/app");
  }

  function handleKeyDownOnInput(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
      submitButtonRef.current.click();
    }
  }

  return (
    <form onSubmit={handleSubmit(formHandler)}>
      <div className="mb-10 flex flex-col gap-4">
        <h2 className="text-2xl font-normal text-gray-800">Set new password</h2>
        <div className="flex-grow border-t border-gray-300"></div>

        <p className="mt-3 text-sm font-light text-gray-800">
          Please enter your new password below. Make sure it&apos;s strong and
          secure!
        </p>
      </div>

      <Input
        type="password"
        label="Enter new password"
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
        className="w-full font-semibold"
      >
        Update Password
      </Button>

      <Modal onClose={handleCloseModal}>
        <Modal.Title>Password Updated</Modal.Title>
        <Modal.Content>
          Your password has been successfully updated. You will be able to use
          the new password for all future logins. You remain logged in for this
          session.
        </Modal.Content>
        <Modal.Button>Close</Modal.Button>
      </Modal>
    </form>
  );
}

export default PasswordResetForm;
