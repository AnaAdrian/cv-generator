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
  const itemCommonClasses = `cursor-pointer transition-all duration-150 hover:text-blue-500`;

  return (
    <Menu className="relative flex justify-end">
      <Menu.Toggle border="true">
        <UserAvatar showBorder={true} />
      </Menu.Toggle>
      <Menu.List
        classNames={isEditingFormPage ? "resume-dropdown" : "user-dropdown"}
        timeout={isEditingFormPage ? 100 : 200}
      >
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
                <Link to="/app/account" className={itemCommonClasses}>
                  Account Settings
                </Link>
              </Menu.Item>
            )}
            <Menu.Item>
              <Link className={itemCommonClasses}>FAQ</Link>
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
        </div>
      </Menu.List>
    </Menu>
  );
}

export default MainDropdown;
