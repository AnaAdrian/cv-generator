import AuthNavigation from "./AuthNavigation";
import UserDropdown from "../features/users/UserDropdown";

import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between border bg-white p-4">
      <NavLink to="/app">
        <img
          src={`logo.svg`}
          alt="Your.Resume"
          className="h-auto w-28 sm:w-40"
        />
      </NavLink>
      {user ? <UserDropdown /> : <AuthNavigation />}
    </div>
  );
}

export default Header;
