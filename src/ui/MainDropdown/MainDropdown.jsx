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
    "text-sm transition-all duration-150 hover:text-blue-500 md:text-base font-thin cursor-pointer";

  return (
    <Menu className="relative flex justify-end">
      <Menu.Toggle>
        <UserAvatar showBorder={true} />
      </Menu.Toggle>
      <Menu.List
        classNames={isEditingFormPage ? "resume-dropdown" : "user-dropdown"}
        className={`top-10 rounded-lg bg-white shadow-menu ${isEditingFormPage ? "w-[320px]" : "w-[280px]"}`}
        timeout={isEditingFormPage ? 100 : 200}
      >
        <Menu.Item className="border-b p-5">
          {isEditingFormPage ? <DashboardItem /> : <UserSettingsItem />}
        </Menu.Item>
        <div
          className={`${isEditingFormPage ? "px-10" : "px-5"} flex flex-col gap-2 py-4`}
        >
          {isEditingFormPage && (
            <Menu.Item className={itemCommonClasses}>
              <Link to="/app/account">Account Settings</Link>
            </Menu.Item>
          )}
          <Menu.Item className={itemCommonClasses}>
            <Link>FAQ</Link>
          </Menu.Item>
          <Menu.Item closeMenu={false}>
            <span
              className={`${itemCommonClasses} text-gray-500`}
              onClick={signOut}
            >
              Log Out
            </span>
          </Menu.Item>
        </div>
      </Menu.List>
    </Menu>
  );
}

export default MainDropdown;
