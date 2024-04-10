import MobileModal from "../../../ui/MobileModal";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../ConfirmDelete";
import Button from "../../../ui/Button";
import { useDuplicateResume } from "../useDuplicateResume";

import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineFileText } from "react-icons/ai";
import { PiCopy } from "react-icons/pi";
import { TbRowRemove } from "react-icons/tb";

function MobileActionsDropdown({ resumeId }) {
  const { mutate: copyResume } = useDuplicateResume();

  function handleExportToTxt() {
    console.log("Exporting to TXT");
    console.log(resumeId);
  }

  function handleCopy() {
    copyResume(resumeId);
  }

  return (
    <div className="flex md:hidden">
      <Modal>
        <MobileModal>
          <MobileModal.Open>
            <Button variant="menuAction" size="custom">
              <RxDotsHorizontal className="h-5 w-5 text-blue-500" /> More
            </Button>
          </MobileModal.Open>

          <MobileModal.Content>
            <MobileModal.Row>
              <Button
                variant="menuAction"
                size="custom"
                onClick={handleExportToTxt}
              >
                <AiOutlineFileText className="h-5 w-5 min-w-5 text-blue-500" />
                Export to TXT
              </Button>
            </MobileModal.Row>

            <MobileModal.Row>
              <Button variant="menuAction" size="custom" onClick={handleCopy}>
                <PiCopy className="h-5 w-5 min-w-5 text-blue-500" />
                Make a copy
              </Button>
            </MobileModal.Row>

            <MobileModal.Row>
              <Modal.Open opens="delete-confirm">
                <Button variant="menuAction" size="custom">
                  <TbRowRemove className="h-5 w-5 min-w-5 text-blue-500" />
                  Delete
                </Button>
              </Modal.Open>
            </MobileModal.Row>
          </MobileModal.Content>
        </MobileModal>
        <Modal.Content name="delete-confirm">
          <ConfirmDelete resumeId={resumeId} />
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default MobileActionsDropdown;
