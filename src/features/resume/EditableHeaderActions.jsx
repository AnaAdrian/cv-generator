import EditableHeaderButton from "./EditableHeaderButton";
import { PiPencilSimpleBold } from "react-icons/pi";
import { FaUndo } from "react-icons/fa";

function EditableHeaderActions({
  onEdit,
  onRevert,
  editIconMobileVisible,
  isEditing,
  showActionsOnEdit,
}) {
  const baseButtonClass = "hidden md:group-hover/header:flex";
  let editButtonClass = editIconMobileVisible
    ? "flex md:hidden md:group-hover/header:flex"
    : baseButtonClass;
  let revertButtonClass = baseButtonClass;

  if (showActionsOnEdit && isEditing) {
    editButtonClass = "flex";
    revertButtonClass = "flex";
  }

  if (!showActionsOnEdit && isEditing) {
    editButtonClass = "hidden";
    revertButtonClass = "hidden";
  }

  return (
    <div className="mb-[5px] flex items-end justify-center gap-0.5 text-gray-400 md:mb-1.5">
      <div className={editButtonClass}>
        <EditableHeaderButton onClick={onEdit} tooltipText="Rename">
          <PiPencilSimpleBold className="h-4 w-4 md:h-5 md:w-5" />
        </EditableHeaderButton>
      </div>
      <div className={revertButtonClass}>
        {onRevert ? (
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
  );
}

export default EditableHeaderActions;
