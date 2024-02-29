import Button from "../../ui/Button";

import { FaGoogle } from "react-icons/fa6";

function GoogleSignInOption({ onClick }) {
  return (
    <>
      <Button
        size="md"
        variant="google"
        className="flex w-full items-center justify-center font-normal"
        onClick={onClick}
      >
        <FaGoogle className="hidden text-white sm:inline-flex" />
        <span className="flex-grow text-center">Continue with Google</span>
        <FaGoogle className="invisible hidden sm:inline-flex" />
      </Button>

      <div className="my-6 flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 flex-shrink text-sm font-light text-gray-400">
          or
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
    </>
  );
}

export default GoogleSignInOption;
