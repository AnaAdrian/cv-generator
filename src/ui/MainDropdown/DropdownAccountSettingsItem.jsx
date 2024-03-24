import { Link } from "react-router-dom";

import UserIcon from "./UserAvatar";
import { useAuth } from "../../features/auth/AuthContext";
import { MdKeyboardArrowRight } from "react-icons/md";

function UserSettingsItem() {
  const { user } = useAuth();
  const displayName = user.user_metadata?.full_name || user.email;

  return (
    <Link
      to="/app/account"
      className="group flex w-full cursor-pointer items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <UserIcon size={10} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold transition-all duration-200 group-hover:text-blue-400 md:text-base">
            {displayName}
          </span>
          <span className="text-xs font-thin text-gray-400">
            Account Settings
          </span>
        </div>
      </div>
      <MdKeyboardArrowRight className="h-6 w-6 text-gray-300 transition-all duration-200 group-hover:text-blue-400" />
    </Link>
  );
}

export default UserSettingsItem;
