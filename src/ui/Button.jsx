import { forwardRef } from "react";

import Loader from "./Loader";

const Button = forwardRef(
  (
    {
      children,
      variant,
      size,
      className,
      icon: Icon, // Renamed to follow React component naming convention
      showLoader,
      ...rest
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700",
      secondary: "bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-700",
      inverse:
        "bg-transparent text-gray-500 border border-gray-300 hover:text-blue-400 hover:border-blue-500 active:bg-blue-100",
      back: "bg-white hover:bg-gray-100 text-gray-600 border border-gray-300 active:bg-gray-200",
      link: "bg-transparent text-blue-500 hover:text-blue-700",
      google: "bg-[#DB4537] hover:bg-[#C53D32] text-white",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-[14px] text-[15px]",
      lg: "px-8 py-4 text-lg",
    };

    const type = variants[variant] || variants.primary;
    const textSize = sizes[size] || sizes.sm;

    return (
      <button
        ref={ref} // Attach the ref to the button element
        className={`${className} ${type} ${textSize} flex items-center justify-center gap-2 rounded-[4px] transition-all duration-100 ease-in-out`}
        {...rest}
      >
        {Icon && <Icon />}
        {showLoader && <Loader size="sm" color="white" />}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

Button.defaultProps = {
  type: "button",
  variant: "primary",
  size: "md",
  className: "",
  showLoader: false,
};

export default Button;
