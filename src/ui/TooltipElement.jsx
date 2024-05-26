const TOOLTIP_ANIMATION_VARIANTS = {
  default:
    "pointer-events-none duration-100 ease-in-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
  delayed:
    "pointer-events-none duration-200 ease-in-out opacity-0 group-hover:opacity-100 group-hover:delay-300",
};

const TOOLTIP_STYLE_VARIANTS = {
  default:
    "absolute bottom-full mb-4 whitespace-nowrap rounded text-center bg-gray-800 px-3 py-1.5 text-sm font-light text-white drop-shadow-lg",
  light:
    "absolute bottom-full mb-2.5 rounded whitespace-nowrap text-center bg-gray-800 px-2 py-1.5 text-xs font-light text-white drop-shadow-lg",
  info: "absolute bottom-full mb-4 rounded bg-gray-800 px-3 py-2 text-sm font-light text-white drop-shadow-lg",
};

const TOOLTIP_TAIL =
  "after:absolute after:bottom-0 after:left-1/2 after:mb-[-6px] after:border-l-[8px] after:border-l-transparent after:border-r-[8px] after:border-r-transparent after:border-t-[6px] after:border-t-gray-800 after:-translate-x-1/2 after:content-['']";

function TooltipElement({
  children,
  onClick,
  tooltipText,
  tooltipAnimationVariant = "default",
  tooltipStyleVariant = "default",
  width = "",
}) {
  const tooltipAnimation = TOOLTIP_ANIMATION_VARIANTS[tooltipAnimationVariant];
  const tooltipStyle = `${TOOLTIP_STYLE_VARIANTS[tooltipStyleVariant]} ${TOOLTIP_TAIL} left-1/2 transform -translate-x-1/2 transform-origin-bottom`;

  return (
    <div className="group relative inline-block">
      <div
        className={`${tooltipAnimation} ${tooltipStyle} z-10 will-change-transform`}
        style={{ width }}
      >
        <div className="select-none">{tooltipText}</div>
      </div>
      <span onClick={onClick}>{children}</span>
    </div>
  );
}

export default TooltipElement;
