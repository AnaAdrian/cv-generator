import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import ActionSuccessMessage from "./ActionSuccessMessage";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";
import { useRef } from "react";

function PasswordResetForm() {
  const { updatePassword } = useAuth();
  const submitButtonRef = useRef();
  const modalButtonRef = useRef();
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
          throw error;
        }
        modalButtonRef.current.click();
      } catch (error) {
        showToast("Something went wrong", "error");
        console.error("Error updating the password", error);
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

  return (
    <>
      <form className="animate-fadeIn" onSubmit={handleSubmit(formHandler)}>
        <div className="mb-10 flex flex-col gap-4">
          <h2 className="text-2xl font-normal text-gray-800">
            Set new password
          </h2>
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
      </form>

      <Modal>
        <Modal.Open opens="password-reset-success">
          <button type="button" ref={modalButtonRef} className="hidden" />
        </Modal.Open>
        <Modal.Content name="password-reset-success">
          <ActionSuccessMessage
            title="Password Updated"
            text="Your password has been successfully updated. You will be able to use 
            the new password for all future logins. You remain logged in for this session."
            navigateTo="/app"
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default PasswordResetForm;
