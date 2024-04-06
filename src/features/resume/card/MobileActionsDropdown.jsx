import MobileModal from "../../../ui/MobileModal";
import Modal from "../../../ui/Modal";
import CardActionsButton from "./CardActionsButton";
import ConfirmDelete from "../ConfirmDelete";
import { useCopyResume } from "../useCopyResume";

import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineFileText } from "react-icons/ai";
import { PiCopy } from "react-icons/pi";
import { TbRowRemove } from "react-icons/tb";

function MobileActionsDropdown({ resumeId }) {
  const { mutate: copyResume } = useCopyResume();

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
            <CardActionsButton>
              <RxDotsHorizontal className="h-5 w-5 text-blue-500" /> More
            </CardActionsButton>
          </MobileModal.Open>

          <MobileModal.Content>
            <MobileModal.Row>
              <CardActionsButton onClick={handleExportToTxt}>
                <AiOutlineFileText className="h-5 w-5 text-blue-500" />
                Export to TXT
              </CardActionsButton>
            </MobileModal.Row>

            <MobileModal.Row>
              <CardActionsButton onClick={handleCopy}>
                <PiCopy className="h-5 w-5 text-blue-500" />
                Make a copy
              </CardActionsButton>
            </MobileModal.Row>

            <MobileModal.Row>
              <Modal.Open opens="delete-confirm">
                <CardActionsButton>
                  <TbRowRemove className="h-5 w-5 text-blue-500" />
                  Delete
                </CardActionsButton>
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
