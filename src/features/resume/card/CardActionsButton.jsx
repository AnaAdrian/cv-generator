import { forwardRef } from "react";

// eslint-disable-next-line no-unused-vars
const CardActionsButton = forwardRef(({ Icon, children, onClick }, ref) => {
  return (
    <button
      className="flex items-center gap-3 font-light transition-all hover:text-blue-500"
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5 text-blue-500" />}
      {children}
    </button>
  );
});

CardActionsButton.displayName = "CardActionsButton";

export default CardActionsButton;
