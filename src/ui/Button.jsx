function Button({ children, variant, size, className, ...rest }) {
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white active:bg-blue-700",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-700",
    inverse:
      "bg-transparent text-black border border-gray-300 hover:text-blue-400 hover:border-blue-500 active:bg-blue-100",
    back: "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 active:bg-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    noBorder: "bg-transparent text-blue-500 hover:text-blue-700",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-[15px] px-6 py-[14px]",
    lg: "text-lg px-8 py-4",
  };

  const type = variants[variant];
  const textSize = sizes[size];

  return (
    <button
      className={`${type} ${textSize} ${className} rounded-[4px] font-semibold transition-all duration-100 ease-in-out `}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  variant: "primary",
  size: "sm",
};

export default Button;
