import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import EditableHeaderActions from "./EditableHeaderActions";
import MobileEditableHeaderActions from "./MobileEditableHeaderActions";
import { useUpdateResume } from "./useUpdateResume";

const variants = {
  resumeTitle: "max-w-52 text-base md:text-xl",
  formTitle: "max-w-96 text-xl md:text-2xl justify-center text-center",
  formSection: "max-w-96 text-base md:text-xl font-semibold",
};

const actionsPosition = {
  resumeTitle: "absolute left-full ml-1 top-[3px]",
  formTitle: "absolute left-full ml-1 top-[6.5px] md:top-[7px]",
  formSection: "absolute left-full ml-1 top-[2px] md:top-[3px]",
};

function EditableHeader({
  title,
  id,
  tableName,
  fieldName,
  defaultTitle,
  variant = "resumeTitle",
  editIconMobileVisible = true,
  showActionsOnEdit = true,
  showOnlyInput = false,
  className,
}) {
  const navigate = useNavigate();
  const { mutate: onUpdate } = useUpdateResume();
  const [isEditing, setIsEditing] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);
  const [value, setValue] = useState(title);
  const [hiddenValue, setHiddenValue] = useState(title);
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const minWidthRef = useRef(null);
  const isTitleChanged = defaultTitle && value !== defaultTitle;
  const headerVariantClass = variants[variant];
  const actionsPostionClass = actionsPosition[variant];
  showOnlyInput = showOnlyInput && wasEdited;

  useEffect(() => {
    adjustInputSize();
  }, [value, isEditing]);

  function adjustInputSize() {
    if (inputRef.current && textRef.current) {
      const minWidth = minWidthRef.current.getBoundingClientRect().width;
      inputRef.current.style.width = `${minWidth}px`;

      const rect = textRef.current.getBoundingClientRect();
      let exactWidth = Math.max(rect.width, minWidth);

      inputRef.current.style.width = `${exactWidth}px`;
    }
  }

  function handleEdit() {
    setIsEditing(true);
    setWasEdited(true);
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
      updates: { [fieldName]: value.trim() || "Untitled" },
    });
    if (value.trim() === "") {
      setValue(defaultTitle || "Untitled");
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
    <div className={`group/header w-full ${className}`}>
      {/* Title of the header, switched between input and div */}
      <div className={`relative inline-block`}>
        {isEditing || showOnlyInput ? (
          <div className="flex flex-col">
            <input
              ref={inputRef}
              name="title"
              placeholder="Untitled"
              className={`${headerVariantClass} overflow-hidden whitespace-pre text-gray-800 caret-blue-500 outline-none`}
              value={value}
              onChange={handleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              autoComplete="off"
            />
            <div
              className={`${headerVariantClass} mb-[2px] block h-[2px] w-0 bg-blue-500 transition-all duration-100 group-focus-within/header:w-full`}
            ></div>
          </div>
        ) : (
          <div
            onClick={handleNavigate}
            className={`${headerVariantClass} mb-1 cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 transition-colors hover:text-blue-500`}
          >
            {value}
          </div>
        )}

        {/* The following divs are used to calculate the width and minWidth of the input field. */}
        <div className={headerVariantClass}>
          <div ref={textRef} className="invisible absolute whitespace-nowrap">
            {hiddenValue}
          </div>
          <div ref={minWidthRef} className="invisible absolute">
            Untitled
          </div>
        </div>

        {/* Actions for the header. */}
        <div className={`${showOnlyInput ? "hidden" : actionsPostionClass}`}>
          {/* If title has been changed, don't display the EditableHeaderActions for mobile screens. */}
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
      </div>
    </div>
  );
}

export default EditableHeader;
