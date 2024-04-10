import { forwardRef } from "react";

// eslint-disable-next-line no-unused-vars
const CardActionsButton = forwardRef(({ children, onClick }, _) => {
  return (
    <button
      className="flex items-center gap-3 font-light transition-all hover:text-blue-500"
      onClick={onClick}
    >
      {children}
    </button>
  );
});

CardActionsButton.displayName = "CardActionsButton";

export default CardActionsButton;
