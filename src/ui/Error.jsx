function Error({ size, children }) {
  const sizes = {
    sm: "text-[13px]",
    md: "text-[15px]",
    lg: "text-[18px]",
  };
  const style = sizes[size];
  return <span className={`${style} font-light text-red-500`}>{children}</span>;
}

Error.defaultProps = {
  size: "sm",
};

export default Error;
