import { cloneElement } from "react";

const TOOLTIP_ANIMATION_VARIANTS = {
  default:
    "transition duration-100 ease-in-out opacity-0 translate-y-2 group-hover/button:opacity-100 group-hover/button:translate-y-0",
  delayed:
    "transition duration-300 ease-in-out opacity-0 group-hover/button:opacity-100 group-hover/button:delay-500",
};

const TOOLTIP_STYLE_VARIANTS = {
  default:
    "absolute bottom-full mb-4 rounded bg-gray-700 px-3 py-1.5 text-sm font-light text-white drop-shadow-lg",
  light:
    "absolute bottom-full mb-2.5 rounded bg-gray-700 px-2 py-1.5 text-xs font-light text-white drop-shadow-lg",
};

const TOOLTIP_TAIL =
  "after:absolute after:bottom-0 after:left-1/2 after:mb-[-6px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[6px] after:border-t-gray-700 after:-translate-x-1/2 after:content-['']";

function EditableHeaderButton({
  children,
  onClick,
  tooltipText,
  tooltipAnimationVariant = "default",
  tooltipStyleVariant = "default",
}) {
  const tooltipAnimation = TOOLTIP_ANIMATION_VARIANTS[tooltipAnimationVariant];
  const tooltipStyle = `${TOOLTIP_STYLE_VARIANTS[tooltipStyleVariant]} ${TOOLTIP_TAIL} left-1/2 transform -translate-x-1/2`;

  const clonedChild = cloneElement(children, {
    className: "cursor-pointer transition-all hover:text-blue-500",
    onClick,
  });

  return (
    <div className="group/button relative">
      <div className={`${tooltipAnimation} ${tooltipStyle}`}>{tooltipText}</div>
      {clonedChild}
    </div>
  );
}

export default EditableHeaderButton;
