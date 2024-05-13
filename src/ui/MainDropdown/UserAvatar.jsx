import { forwardRef } from "react";

const UserAvatar = forwardRef(
  ({ isOpen, size = 8, showBorder = false, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      style={{ height: `${size * 0.25}rem`, width: `${size * 0.25}rem` }}
      className="relative overflow-hidden rounded-full"
    >
      <span className={`absolute inset-0 rounded-full border `} />

      {showBorder && (
        <span
          className={`absolute inset-0 rounded-full border-2 transition-all duration-200 ${
            isOpen
              ? "border-blue-500"
              : "border-transparent hover:border-blue-500 active:border-blue-700"
          }`}
        />
      )}
      <img
        className="pointer-events-none h-full w-full object-cover"
        src="/user.png"
        alt="User Icon"
        draggable="false"
      />
    </button>
  ),
);

UserAvatar.displayName = "UserIcon";

export default UserAvatar;
