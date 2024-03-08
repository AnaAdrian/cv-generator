import { Link, useLocation } from "react-router-dom";

import Menu from "../../ui/Menu";
import UserIcon from "./UserIcon";
import UserSettingsItem from "./UserSettingsItem";
import DashboardItem from "./DashboardItem";
import { useAuth } from "../auth/AuthContext";

function UserDropdown() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const isEditingFormPage = pathname.includes("edit");

  return (
    <Menu>
      <Menu.Toggle border="true">
        <UserIcon showBorder={true} />
      </Menu.Toggle>
      <Menu.List>
        <div className={`${isEditingFormPage ? "w-[320px]" : "w-[280px]"}`}>
          <div className="border-b p-5">
            {isEditingFormPage ? (
              <DashboardItem />
            ) : (
              <Menu.Item>
                <UserSettingsItem />
              </Menu.Item>
            )}
          </div>
          <div
            className={`${isEditingFormPage ? "px-10" : "px-5"} flex flex-col gap-2 py-4 font-thin`}
          >
            {isEditingFormPage && (
              <Menu.Item>
                <Link
                  to="/app/account"
                  className="cursor-pointer transition-all duration-150 hover:text-blue-500"
                >
                  Account Settings
                </Link>
              </Menu.Item>
            )}
            <Menu.Item>
              <div
                onClick={() => console.log("CLICK")}
                className="cursor-pointer transition-all duration-150 hover:text-blue-500"
              >
                FAQ
              </div>
            </Menu.Item>
            <Menu.Item closeMenu={false}>
              <span
                className="cursor-pointer text-gray-500 transition-all duration-150 hover:text-blue-500"
                onClick={signOut}
              >
                Log Out
              </span>
            </Menu.Item>
          </div>
        </div>
      </Menu.List>
    </Menu>
  );
}

export default UserDropdown;
