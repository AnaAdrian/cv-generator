import { useState, useEffect, forwardRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import Error from "../ui/Error";

const Input = forwardRef(
  ({ type, label, labelPosition, error, ...rest }, ref) => {
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      setInputType(showPassword ? "text" : type);
    }, [showPassword, type]);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="group mb-2">
        {labelPosition === "outside" && (
          <label
            htmlFor={`input-${label}`}
            className="mb-1 block text-sm font-light text-gray-500"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={`input-${label}`}
            type={inputType}
            placeholder={labelPosition === "inside" ? label : ""}
            {...rest}
            className={`${labelPosition === "inside" ? "font-light" : ""} w-full border bg-slate-50 px-2 py-3 text-[15px] text-gray-500 focus:outline-none md:px-3 md:py-4`}
          />

          {type === "password" && (
            <button
              onClick={toggleShowPassword}
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
            >
              {showPassword ? (
                <IoEyeOffOutline className="text-gray-500" />
              ) : (
                <IoEyeOutline className="text-gray-500" />
              )}
            </button>
          )}

          <div
            className={`absolute bottom-0 h-0.5 w-0 ${error ? "bg-red-500" : "bg-blue-500"} transition-all duration-75 group-focus-within:w-full`}
          ></div>
        </div>

        <div className="min-h-[25px]">{error && <Error error={error} />}</div>
      </div>
    );
  },
);

Input.displayName = "Input";

Input.defaultProps = {
  type: "text",
  label: "Label",
  labelPosition: "outside",
};

export default Input;
