import { forwardRef } from "react";

import Loader from "./Loader";

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700",
  secondary: "bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-700",
  inverse:
    "bg-transparent text-gray-800 ring-1 ring-gray-200 hover:text-blue-500 hover:ring-blue-500 active:bg-blue-100",
  back: "bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 active:bg-gray-200",
  link: "bg-transparent text-blue-500 hover:text-blue-700",
  google: "bg-[#DB4537] hover:bg-[#C53D32] text-white",
  menuAction:
    "flex items-center gap-3 font-light transition-all hover:text-blue-500",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-md",
  lg: "px-8 py-4 text-lg",
  custom: "px-0 py-0",
};

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className = "",
      showLoader = false,
      attachRef = true,
      ...rest
    },
    ref,
  ) => {
    const type = variants[variant] || variants.primary;
    const textSize = sizes[size] || sizes.md;

    return (
      <button
        ref={attachRef ? ref : null}
        className={`${className} ${type} ${textSize} flex items-center justify-center gap-2 rounded-[4px] transition-all duration-100 ease-in-out`}
        {...rest}
      >
        {showLoader && <Loader size="sm" color="white" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
