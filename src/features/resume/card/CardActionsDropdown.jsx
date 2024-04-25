import Menu from "../../../ui/Menu";
import Modal from "../../../ui/Modal";
import ConfirmDelete from "../ConfirmDelete";
import { useDuplicateResume } from "../useDuplicateResume";

import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineFileText } from "react-icons/ai";
import { PiCopy } from "react-icons/pi";
import { TbRowRemove } from "react-icons/tb";

function CardActionsDropdown({ resumeId }) {
  const { mutate: copyResume } = useDuplicateResume();

  function handleExportToTxt() {
    console.log("Exporting to TXT");
    console.log(resumeId);
  }

  function handleCopy() {
    copyResume(resumeId);
  }

  return (
    <div className="relative hidden md:flex">
      <Modal>
        <Menu>
          <Menu.Toggle keepOpen={true}>
            <div className="flex cursor-pointer items-center gap-3 font-light transition-all hover:text-blue-500">
              <RxDotsHorizontal className="h-5 w-5 text-blue-500" /> More
            </div>
          </Menu.Toggle>
          <Menu.List
            classNames="actions-dropdown"
            className="absolute flex max-w-[165px] gap-2.5 rounded-md bg-white px-4 py-3 shadow-even"
            timeout={150}
          >
            <Menu.Item onClick={handleExportToTxt}>
              <AiOutlineFileText className="h-5 w-5 text-blue-500" />
              Export to TXT
            </Menu.Item>
            <Menu.Item onClick={handleCopy}>
              <PiCopy className="h-5 w-5 text-blue-500" />
              Make a copy
            </Menu.Item>
            <Modal.Open opens="delete-confirm">
              <Menu.Item>
                <TbRowRemove className="h-5 w-5 text-blue-500" />
                Delete
              </Menu.Item>
            </Modal.Open>
          </Menu.List>
          <Modal.Content name="delete-confirm">
            <ConfirmDelete resumeId={resumeId} />
          </Modal.Content>
        </Menu>
      </Modal>
    </div>
  );
}

export default CardActionsDropdown;
