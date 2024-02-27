import Button from "../../ui/Button";

function PasswordResetConfirm({ onClose }) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold text-gray-800">Email Sent</h2>
      <p className="mt-3 text-gray-500">
        We&apos;ve sent you an email with instructions to reset your password.
      </p>
      <Button size="md" variant="primary" className="mt-6" onClick={onClose}>
        Got it
      </Button>
    </div>
  );
}

export default PasswordResetConfirm;
