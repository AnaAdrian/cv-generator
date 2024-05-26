import { Link, useLocation } from "react-router-dom";

import Menu from "../Menu";
import UserAvatar from "./UserAvatar";
import UserSettingsItem from "./DropdownAccountSettingsItem";
import DashboardItem from "./DropdownDashboardItem";
import { useAuth } from "../../features/auth/AuthContext";

function MainDropdown() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const isEditingFormPage = pathname.includes("edit");
  const itemCommonClasses =
    "text-sm transition-colors duration-150 hover:text-blue-500 md:text-base font-thin cursor-pointer";

  return (
    <Menu className="relative flex justify-end">
      <Menu.Toggle>
        <UserAvatar showBorder={true} />
      </Menu.Toggle>
      <Menu.List
        className={`origin-top-right rounded-lg bg-white shadow-menu ${isEditingFormPage ? "w-[320px] duration-100" : "w-[280px] duration-200"}`}
      >
        <div className="border-b">
          <Menu.Header className={`${isEditingFormPage ? "m-3" : "m-5"}`}>
            {isEditingFormPage ? <DashboardItem /> : <UserSettingsItem />}
          </Menu.Header>
        </div>

        <div
          className={`${isEditingFormPage ? "px-12 py-3" : "px-6 py-4"} flex flex-col gap-3`}
        >
          {isEditingFormPage && (
            <Link to="/app/account">
              <Menu.Item className={itemCommonClasses}>
                Account Settings
              </Menu.Item>
            </Link>
          )}
          <Link>
            <Menu.Item className={itemCommonClasses}>FAQ</Menu.Item>
          </Link>
          <Menu.Item
            className={`${itemCommonClasses} text-gray-500`}
            onClick={signOut}
            closeMenu={false}
          >
            Log Out
          </Menu.Item>
        </div>
      </Menu.List>
    </Menu>
  );
}

export default MainDropdown;
