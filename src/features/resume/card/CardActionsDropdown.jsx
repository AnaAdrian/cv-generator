import Menu from "../../../ui/Menu";
import CardActionsButton from "./CardActionsButton";

import { RxDotsHorizontal } from "react-icons/rx";
import { AiOutlineFileText } from "react-icons/ai";
import { PiCopy } from "react-icons/pi";
import { TbRowRemove } from "react-icons/tb";

function CardActionsDropdown({ cardData }) {
  function handleExportToTxt() {
    console.log("Exporting to TXT");
    console.log(cardData);
  }

  function handleCopy() {
    console.log("Copying");
    console.log(cardData);
  }

  function handleDelete() {
    console.log("Deleting");
    console.log(cardData);
  }

  return (
    <Menu className="relative flex">
      <Menu.Toggle>
        <CardActionsButton Icon={RxDotsHorizontal}>More</CardActionsButton>
      </Menu.Toggle>
      <Menu.List classNames="actions-dropdown" timeout={100}>
        <div className="flex flex-col gap-2 px-4 py-3 shadow-sm">
          <Menu.Item>
            <CardActionsButton
              onClick={handleExportToTxt}
              Icon={AiOutlineFileText}
            >
              Export to TXT
            </CardActionsButton>
          </Menu.Item>
          <Menu.Item>
            <CardActionsButton onClick={handleCopy} Icon={PiCopy}>
              Make a copy
            </CardActionsButton>
          </Menu.Item>
          <Menu.Item>
            <CardActionsButton onClick={handleDelete} Icon={TbRowRemove}>
              Delete
            </CardActionsButton>
          </Menu.Item>
        </div>
      </Menu.List>
    </Menu>
  );
}

export default CardActionsDropdown;
