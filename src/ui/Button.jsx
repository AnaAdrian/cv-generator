function Button({
  children,
  variant,
  size,
  className,
  fontWeight,
  icon,
  ...rest
}) {
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
      className={`${type} ${textSize} ${fontWeight} rounded-[4px] transition-all duration-100 ease-in-out ${className}`}
      {...rest}
    >
      {icon && <icon />} {/* Render icon if provided */}
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: "button",
  variant: "primary",
  size: "sm",
  className: "",
  fontWeight: "font-semibold", // Default font weight
};

export default Button;
