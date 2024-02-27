import { NavLink } from "react-router-dom";

function Header({ children, className }) {
  return (
    <div
      className={`z-50 flex min-h-20 items-center justify-between ${className}`}
    >
      {" "}
      <NavLink to="/">
        <img src="logo.svg" alt="Your.Resume" className="h-auto w-32 md:w-40" />
      </NavLink>
      {children}
    </div>
  );
}

export default Header;
