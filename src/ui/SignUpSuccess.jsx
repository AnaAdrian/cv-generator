import { MdMarkEmailRead } from "react-icons/md";

function SignUpSuccess() {
  return (
    <div className="flex flex-col gap-5 px-3 py-10 text-center">
      <MdMarkEmailRead className="mx-auto text-6xl text-slate-700" />
      <h1 className="text-3xl font-bold text-gray-800">
        A verification email has been sent.{" "}
      </h1>
      <p className="text-lg text-gray-500">
        Please check your inbox and follow the instructions to complete your
        sign-up.
      </p>
    </div>
  );
}

export default SignUpSuccess;
