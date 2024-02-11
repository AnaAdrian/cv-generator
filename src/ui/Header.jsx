import AuthNavigation from "./AuthNavigation";
import UserDropdown from "../features/users/UserDropdown";

import supabase from "../services/supabase";

function Header() {
  const session = supabase.auth.session;
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md">
      <h1 className="text-2xl font-bold">Logo</h1>
      {!session ? <AuthNavigation /> : <UserDropdown />}
    </header>
  );
}

export default Header;
