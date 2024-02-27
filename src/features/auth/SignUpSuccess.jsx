import { MdMarkEmailRead } from "react-icons/md";
import Button from "../../ui/Button"; // Ensure this path is correct for your project structure

function SignUpSuccess({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 text-center">
      <MdMarkEmailRead className="text-6xl text-slate-700" />
      <h2 className="text-2xl font-bold text-gray-800">
        A verification email has been sent.
      </h2>
      <p className="text-gray-500">
        Please check your inbox and follow the instructions to complete your
        sign-up.
      </p>
      <Button size="md" variant="primary" className="mt-6" onClick={onClose}>
        Got it
      </Button>
    </div>
  );
}

export default SignUpSuccess;
