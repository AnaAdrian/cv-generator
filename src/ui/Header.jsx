import AuthNavigation from "./AuthNavigation";
import UserDropdown from "../features/users/UserDropdown";

import { useAuth } from "../auth/AuthContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { user } = useAuth();
  return (
    <div className="border bg-white p-4">
      <div className="mx-0 flex items-center justify-between md:mx-4">
        {" "}
        <NavLink to="/app">
          <img
            src={`logo.svg`}
            alt="Your.Resume"
            className="h-auto w-32 md:w-40"
          />
        </NavLink>
        {user ? <UserDropdown /> : <AuthNavigation />}
      </div>
    </div>
  );
}

export default Header;
