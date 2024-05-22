import { useState, useEffect, forwardRef } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import Error from "../ui/Error";

const Input = forwardRef(
  (
    {
      type = "text",
      label = "",
      labelPosition = "outside",
      labelTooltip,
      displayError = false,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const [inputType, setInputType] = useState(type);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
      setInputType(showPassword ? "text" : type);
    }, [showPassword, type]);

    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="group/input mb-1">
        {label && labelPosition === "outside" && (
          <label
            htmlFor={`input-${label}`}
            className="pointer-events-none mb-1 block text-xs font-light text-gray-400 md:text-sm"
          >
            {label}
            {labelTooltip && (
              <span className="ml-1 text-gray-400">{labelTooltip}</span>
            )}
          </label>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={`input-${label ? label : "no-label"}`}
            type={inputType}
            placeholder={labelPosition === "inside" ? label : ""}
            {...rest}
            className={
              className
                ? className
                : `w-full border bg-slate-50 px-2 py-3 text-[15px] text-gray-500 focus:outline-none md:px-3 md:py-4`
            }
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

          <span
            className={`${error ? "bg-red-500" : "bg-blue-500"} 
              absolute bottom-0 left-1/2 h-[2px] w-1/2 -translate-x-1/2 opacity-0 transition-all duration-100 ease-in-out group-focus-within/input:w-full group-focus-within/input:opacity-100`}
          />
        </div>

        {displayError && (
          <div className="min-h-[25px]">{error && <Error error={error} />}</div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
