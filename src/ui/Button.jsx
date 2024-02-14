function Button({ children, variant, size, ...rest }) {
  const variants = {
    primary: "bg-sky-500 hover:bg-sky-600 text-white active:bg-sky-700",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white active:bg-gray-700",
    inverse:
      "bg-transparent text-black border border-gray-300 hover:text-sky-400 hover:border-sky-500 active:bg-sky-100",
    back: "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 active:bg-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
  };

  const sizes = {
    sm: "text-sm md:px-5 md:py-3 px-4 py-2",
    md: "text-[15px] px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const style = variants[variant];
  const textSize = sizes[size];

  return (
    <button
      className={`${style} ${textSize} rounded-[4px] font-semibold transition-all duration-100 ease-in-out `}
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
