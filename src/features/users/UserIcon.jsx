import { forwardRef } from "react";

const UserIcon = forwardRef(
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
          className={`absolute inset-0 rounded-full ${isOpen ? "border-2 border-blue-500" : "border-2 border-transparent"} transition-all duration-200 hover:border-blue-500 active:border-blue-700`}
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

UserIcon.displayName = "UserIcon";

export default UserIcon;
