import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiPencilSimpleBold } from "react-icons/pi";
import { FaUndo } from "react-icons/fa";

import Input from "../../ui/Input";
import EditableHeaderButton from "./EditableHeaderButton";
import { useUpdateResume } from "./useUpdateResume";

function EditableHeader({
  title,
  id,
  tableName,
  fieldName,
  defaultTitle = "",
}) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef(null);
  const { mutate: onUpdate } = useUpdateResume();
  const isTitleChanged = title !== defaultTitle;

  function handleEdit() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select();
    });
  }

  function handleBlur() {
    setIsEditing(false);
    onUpdate({
      tableName,
      id,
      updates: { [fieldName]: value || "Untitled" },
    });
    if (!value) {
      setValue("Untitled");
    }
  }

  function handleRevert() {
    setValue(defaultTitle);
    onUpdate({
      tableName,
      id,
      updates: { [fieldName]: defaultTitle },
    });
  }

  function handleInput(e) {
    setValue(e.target.value);
  }

  function handleNavigate() {
    !isEditing && navigate(`/app/resumes/${id}/edit`);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
    }
  }

  return (
    <div className="group/header flex items-center gap-[4.5px] ">
      {isEditing ? (
        <Input
          ref={inputRef}
          placeholder="Untitled"
          className={`${value ? "text-gray-800" : "text-gray-400"} w-52 text-base font-normal outline-none md:text-xl`}
          value={value}
          onChange={handleInput}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          displayError={false}
          autoComplete="off"
        />
      ) : (
        <div
          onClick={handleNavigate}
          className={`mb-1 max-w-52 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-800 transition-all hover:text-blue-500 md:text-xl`}
        >
          {value}
        </div>
      )}

      {!isEditing && (
        <div className="mb-[5px] hidden items-center gap-0.5 text-gray-400 md:group-hover/header:flex ">
          <EditableHeaderButton onClick={handleEdit} tooltipText="Rename">
            <PiPencilSimpleBold size={18.5} />
          </EditableHeaderButton>
          {isTitleChanged && defaultTitle !== "" ? (
            <EditableHeaderButton
              onClick={handleRevert}
              tooltipText="Revert Section Name"
            >
              <FaUndo size={14} />
            </EditableHeaderButton>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default EditableHeader;
