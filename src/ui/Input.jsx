import { forwardRef } from "react";
import Error from "../ui/Error";

const Input = forwardRef(({ label, error, ...rest }, ref) => {
  return (
    <div className="group mb-2">
      <label
        htmlFor={`input-${label}`}
        className="block text-sm font-light text-gray-500"
      >
        {label}
      </label>
      <div className="relative mt-1">
        <input
          ref={ref}
          id={`input-${label}`}
          {...rest}
          className="font-small w-full border bg-slate-50 px-3 py-4 text-[15px] text-gray-500 focus:outline-none"
        />

        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-transparent">
          <div
            className={`absolute bottom-0 h-0.5 w-0 ${error ? "bg-red-500" : "bg-sky-500"}  transition-all duration-75 group-focus-within:w-full`}
          ></div>
        </div>
      </div>
      <div className=" min-h-[25px]"> {error && <Error>{error}</Error>}</div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
