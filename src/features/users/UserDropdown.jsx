import Menu from "../../ui/Menu";
import UserIcon from "./UserIcon";
import { useAuth } from "../auth/AuthContext";
import UserSettingsItem from "./UserSettingsItem";

function UserDropdown() {
  const { signOut } = useAuth();

  return (
    <Menu>
      <Menu.Toggle border="true">
        <UserIcon showBorder={true} />
      </Menu.Toggle>
      <Menu.List>
        <div className="border-b p-5">
          <Menu.Item>
            <UserSettingsItem />
          </Menu.Item>
        </div>
        <div className="flex flex-col gap-2 px-5 py-4 font-thin">
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
      </Menu.List>
    </Menu>
  );
}

export default UserDropdown;
