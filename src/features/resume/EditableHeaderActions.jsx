import EditableHeaderButton from "./EditableHeaderButton";
import { PiPencilSimpleBold } from "react-icons/pi";
import { FaUndo } from "react-icons/fa";

function EditableHeaderActions({
  onEdit,
  onRevert,
  isTitleChanged,
  iconMobileVisible,
}) {
  return (
    <div className={`${isTitleChanged ? "hidden" : ""} md:flex`}>
      <div className="mb-[5px] flex items-end justify-center gap-0.5 text-gray-400 md:mb-1.5">
        <div
          className={`${iconMobileVisible ? "flex md:hidden md:group-hover/header:flex" : "hidden md:group-hover/header:flex"} `}
        >
          <EditableHeaderButton onClick={onEdit} tooltipText="Rename">
            <PiPencilSimpleBold className="h-4 w-4 md:h-5 md:w-5" />
          </EditableHeaderButton>
        </div>
        <div className="hidden md:group-hover/header:flex">
          {isTitleChanged ? (
            <EditableHeaderButton
              onClick={onRevert}
              tooltipText="Revert Section Name"
              tooltipAnimationVariant="delayed"
              tooltipStyleVariant="light"
            >
              <FaUndo className="mb-0.5 h-4 w-4" />
            </EditableHeaderButton>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EditableHeaderActions;
