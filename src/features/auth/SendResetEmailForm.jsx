import { useForm } from "react-hook-form";
import { useRef } from "react";

import ActionSuccessMessage from "./ActionSuccessMessage";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";
import { useAuth } from "./AuthContext";
import { showToast } from "../../ui/Toast";
import { IoIosArrowRoundBack } from "react-icons/io";
import { checkValidEmail } from "../../utils/helpers";

function SendResetEmailForm({ email, onClose }) {
  const { resetPassword } = useAuth();
  const submitButtonRef = useRef();
  const modalButtonRef = useRef();

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
          throw error;
        }
        modalButtonRef.current.click();
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

  return (
    <>
      <form className="animate-fadeIn" onSubmit={handleSubmit(formHandler)}>
        <div className="mb-10 flex flex-col gap-2 ">
          <h2 className=" text-2xl font-normal text-gray-800">
            Reset your password?
          </h2>
          <div className="flex-grow border-t border-gray-300"></div>

          <p className=" text-sm font-light text-gray-800">
            Please provide the email address that you used when you signed up
            for your account. <br /> <br />
            We will send you an email that will allow you to reset your
            password.
          </p>
        </div>

        <Input
          type="text"
          label="Email address"
          labelPosition="inside"
          defaultValue={email}
          onKeyDown={handleKeyDownOnInput}
          displayError="true"
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
      </form>

      <Modal>
        <Modal.Open opens="send-reset-success">
          <button type="button" ref={modalButtonRef} className="hidden" />
        </Modal.Open>
        <Modal.Content name="send-reset-success">
          <ActionSuccessMessage
            title="Email Sent"
            text="An email with password reset instructions has been sent to your email 
            address if it exists on our system."
            navigateTo="/app/auth"
          />
        </Modal.Content>
      </Modal>
    </>
  );
}

export default SendResetEmailForm;
