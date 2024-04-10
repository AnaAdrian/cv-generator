import { FaUndo } from "react-icons/fa";
import Button from "../../ui/Button";
import MobileModal from "../../ui/MobileModal";
import { RxDotsHorizontal } from "react-icons/rx";
import { PiPencilSimpleBold } from "react-icons/pi";

function MobileEditableHeaderActions({ onEdit, onRevert }) {
  return (
    <div className="flex md:hidden">
      <MobileModal>
        <MobileModal.Open>
          <Button variant="menuAction" size="custom">
            <RxDotsHorizontal
              size={18}
              className="ml-1 text-gray-400 hover:text-blue-500"
            />
          </Button>
        </MobileModal.Open>

        <MobileModal.Content>
          <MobileModal.Row>
            <Button variant="menuAction" size="custom" onClick={onEdit}>
              <PiPencilSimpleBold size={18.5} className="text-blue-500" />
              Rename
            </Button>
          </MobileModal.Row>

          <MobileModal.Row>
            <Button variant="menuAction" size="custom" onClick={onRevert}>
              <FaUndo size={14} className="text-blue-500" />
              Revert Section Name
            </Button>
          </MobileModal.Row>
        </MobileModal.Content>
      </MobileModal>
    </div>
  );
}

export default MobileEditableHeaderActions;
