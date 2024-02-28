function Error({ error, className, size }) {
  const sizes = {
    sm: "text-[13px]",
    md: "text-[15px]",
    lg: "text-[18px]",
  };
  const style = sizes[size];

  return (
    <span
      className={`${style} font-light text-red-500 ${className ? className : ""}`}
    >
      {error}
    </span>
  );
}

Error.defaultProps = {
  size: "sm",
};

export default Error;
