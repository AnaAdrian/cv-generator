function Loader({ size, color }) {
  const sizes = {
    sm: "h-5 w-5",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const colors = {
    primary: "border-blue-500",
    secondary: "border-red-500",
    white: "border-white",
  };

  const style = sizes[size];
  const borderColor = colors[color];

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`animate-spin rounded-full border-2 ${borderColor} ${style} border-t-transparent`}
      ></div>
    </div>
  );
}

Loader.defaultProps = {
  size: "md",
  color: "primary",
};

export default Loader;
