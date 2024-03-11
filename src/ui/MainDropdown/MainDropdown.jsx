import { useLocation } from "react-router-dom";

import Menu from "../Menu";
import UserAvatar from "./UserAvatar";
import UserSettingsItem from "./DropdownAccountSettingsItem";
import DashboardItem from "./DropdownDashboardItem";
import Item from "./MenuItem";
import { useAuth } from "../../features/auth/AuthContext";

function MainDropdown() {
  const { pathname } = useLocation();
  const { signOut } = useAuth();

  const isEditingFormPage = pathname.includes("edit");

  return (
    <Menu className="relative flex justify-end">
      <Menu.Toggle border="true">
        <UserAvatar showBorder={true} />
      </Menu.Toggle>
      <Menu.List
        classNames={isEditingFormPage ? "resume-dropdown" : "user-dropdown"}
        className={`shadow-menu top-10 rounded-lg bg-white ${isEditingFormPage ? "w-[320px]" : "w-[280px]"}`}
        timeout={isEditingFormPage ? 100 : 200}
      >
        <Menu.Item className="border-b p-5">
          {isEditingFormPage ? <DashboardItem /> : <UserSettingsItem />}
        </Menu.Item>
        <div
          className={`${isEditingFormPage ? "px-10" : "px-5"} flex flex-col gap-2 py-4 font-thin`}
        >
          {isEditingFormPage && (
            <Menu.Item>
              <Item to="/app/account">Account Settings</Item>
            </Menu.Item>
          )}
          <Menu.Item>
            <Item>FAQ</Item>
          </Menu.Item>
          <Menu.Item closeMenu={false}>
            <Item className="text-gray-500" onClick={signOut}>
              Log Out
            </Item>
          </Menu.Item>
        </div>
      </Menu.List>
    </Menu>
  );
}

export default MainDropdown;
