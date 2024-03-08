import { Outlet } from "react-router-dom";
import Header from "./Header";
import UserDropdown from "../features/users/UserDropdown";

function AppLayout() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl">
        <Header className="border-b">
          <UserDropdown />
        </Header>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
