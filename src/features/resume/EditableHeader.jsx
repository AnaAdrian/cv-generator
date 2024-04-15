import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import EditableHeaderActions from "./EditableHeaderActions";
import MobileEditableHeaderActions from "./MobileEditableHeaderActions";
import { useUpdateResume } from "./useUpdateResume";

function EditableHeader({
  title,
  id,
  tableName,
  fieldName,
  defaultTitle = "",
  editIconMobileVisible = true,
  showActionsOnEdit = true,
}) {
  const navigate = useNavigate();
  const { mutate: onUpdate } = useUpdateResume();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const [hiddenValue, setHiddenValue] = useState(title);
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const isTitleChanged = defaultTitle !== "" && value !== defaultTitle;

  useEffect(() => {
    adjustInputSize();
  }, [value, isEditing]);

  function adjustInputSize() {
    if (inputRef.current && textRef.current) {
      const minWidth = 75;
      inputRef.current.style.width = `${minWidth}px`;

      const rect = textRef.current.getBoundingClientRect();
      let exactWidth = Math.max(rect.width, minWidth);

      inputRef.current.style.width = `${exactWidth}px`;
    }
  }

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
    if (value.trim() === "") {
      setValue("Untitled");
    }
    setValue((prev) => prev.trim());
    setHiddenValue((prev) => prev.trim());
  }

  function handleRevert() {
    setValue(defaultTitle);
    setHiddenValue(defaultTitle);
    onUpdate({
      tableName,
      id,
      updates: { [fieldName]: defaultTitle },
    });
  }

  function handleInput(e) {
    setValue(e.target.value);
    setHiddenValue(e.target.value.replace(/ /g, "\u00A0"));
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
    <div className={`group/header flex items-center gap-[4.5px] `}>
      <div>
        {isEditing ? (
          <>
            <input
              ref={inputRef}
              name="title"
              placeholder="Untitled"
              className="max-w-52 whitespace-pre text-base text-gray-800 caret-blue-500 outline-none md:text-xl"
              value={value}
              onChange={handleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <div className="mb-[2px] h-[2px] w-0 bg-blue-500 transition-all duration-100 group-focus-within/header:w-full"></div>
          </>
        ) : (
          <div
            onClick={handleNavigate}
            className="mb-1 max-w-52 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-800 transition-all hover:text-blue-500 md:text-xl"
          >
            {value}
          </div>
        )}
        <div
          ref={textRef}
          className="invisible absolute top-0 mb-1 max-w-52 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal text-gray-800 transition-all hover:text-blue-500 md:text-xl"
        >
          {hiddenValue || "Untitled"}
        </div>
      </div>

      {/* If title has been changed, don't show the EditableHeaderActions for mobile screens. */}
      <div className={`${isTitleChanged ? "hidden" : ""} md:flex`}>
        <EditableHeaderActions
          onEdit={handleEdit}
          onRevert={isTitleChanged ? handleRevert : null}
          editIconMobileVisible={editIconMobileVisible}
          isEditing={isEditing}
          showActionsOnEdit={showActionsOnEdit}
        />
      </div>

      {/* The MobileEditableHeaderActions is visible only for mobile screens. */}
      {/* Show the component only if title has been changed, otherwise the EditableHeaderActions will be displayed. */}
      {isTitleChanged ? (
        <div className="flex md:hidden">
          <MobileEditableHeaderActions
            onEdit={handleEdit}
            onRevert={handleRevert}
          />
        </div>
      ) : null}
    </div>
  );
}

export default EditableHeader;
