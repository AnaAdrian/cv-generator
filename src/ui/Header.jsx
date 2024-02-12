import AuthNavigation from "./AuthNavigation";
import UserDropdown from "../features/users/UserDropdown";

import { useAuth } from "../auth/AuthContext";

function Header() {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      <h1 className="text-2xl font-bold">Logo</h1>
      {user ? <UserDropdown /> : <AuthNavigation />}
    </div>
  );
}

export default Header;
