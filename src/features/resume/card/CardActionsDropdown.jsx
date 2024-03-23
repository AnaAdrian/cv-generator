import Menu from "../../../ui/Menu";
import CardActionsButton from "./CardActionsButton";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "./ConfirmDelete";
import { useCopyResume } from "../useCopyResume";

import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineFileText } from "react-icons/ai";
import { PiCopy } from "react-icons/pi";
import { TbRowRemove } from "react-icons/tb";

function CardActionsDropdown({ resumeId }) {
  const { mutate: copyResume } = useCopyResume();

  function handleExportToTxt() {
    console.log("Exporting to TXT");
    console.log(resumeId);
  }

  function handleCopy() {
    copyResume(resumeId);
  }

  return (
    <Modal>
      <Menu className="relative flex">
        <Menu.Toggle>
          <CardActionsButton>
            <RxDotsHorizontal className="h-5 w-5 text-blue-500" /> More
          </CardActionsButton>
        </Menu.Toggle>
        <Menu.List
          classNames="actions-dropdown"
          className="top-9 gap-2.5 rounded-md bg-white px-4 py-3 shadow-even"
          timeout={100}
        >
          <Menu.Item>
            <CardActionsButton onClick={handleExportToTxt}>
              <AiOutlineFileText className="h-5 w-5 text-blue-500" />
              Export to TXT
            </CardActionsButton>
          </Menu.Item>
          <Menu.Item>
            <CardActionsButton onClick={handleCopy}>
              <PiCopy className="h-5 w-5 text-blue-500" />
              Make a copy
            </CardActionsButton>
          </Menu.Item>
          <Menu.Item>
            <Modal.Open opens="delete-confirm">
              <CardActionsButton>
                <TbRowRemove className="h-5 w-5 text-blue-500" />
                Delete
              </CardActionsButton>
            </Modal.Open>
          </Menu.Item>
        </Menu.List>
        <Modal.Content name="delete-confirm">
          <ConfirmDelete resumeId={resumeId} />
        </Modal.Content>
      </Menu>
    </Modal>
  );
}

export default CardActionsDropdown;
