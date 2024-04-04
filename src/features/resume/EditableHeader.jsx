import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiPencilSimpleBold } from "react-icons/pi";

import Input from "../../ui/Input";
import { useUpdateResume } from "./useUpdateResume";

function EditableHeader({ title, id, tableName, fieldName }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const inputRef = useRef(null);
  const { mutate: onUpdate } = useUpdateResume();

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
          className={`max-w-52 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-800 transition-all hover:text-blue-500 md:text-xl`}
        >
          {value}
        </div>
      )}

      {!isEditing && (
        <div className="mb-[1px] hidden text-gray-400 md:group-hover/header:inline">
          <PiPencilSimpleBold
            className="h-[18.5px] w-[18.5px] cursor-pointer transition-all hover:text-blue-500"
            onClick={handleEdit}
          />
        </div>
      )}
    </div>
  );
}

export default EditableHeader;
