import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import MobileEditableHeaderActions from "./MobileEditableHeaderActions";
import { useUpdateResume } from "./useUpdateResume";

const EditableHeaderContext = createContext(null);

function EditableHeader({
  children,
  title,
  id,
  tableName,
  fieldName,
  defaultTitle,
  className = "",
}) {
  const navigate = useNavigate();
  const { mutate: onUpdate } = useUpdateResume();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title || defaultTitle);
  const [hiddenValue, setHiddenValue] = useState(title);
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const minWidthRef = useRef(null);
  const titleUpdated = defaultTitle && value !== defaultTitle;

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
      updates: { [fieldName]: value.trim() || defaultTitle || "Untitled" },
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
    <EditableHeaderContext.Provider
      value={{
        isEditing,
        value,
        defaultTitle,
        hiddenValue,
        inputRef,
        textRef,
        minWidthRef,
        titleUpdated,
        handleEdit,
        handleBlur,
        handleRevert,
        handleInput,
        handleNavigate,
        handleKeyDown,
      }}
    >
      <div className={`group/header relative inline-block w-full ${className}`}>
        {children}
      </div>
    </EditableHeaderContext.Provider>
  );
}

function EditableHeaderInput({ className = "", showOnlyInput = false }) {
  const {
    inputRef,
    value,
    defaultTitle,
    hiddenValue,
    textRef,
    minWidthRef,
    isEditing,
    handleInput,
    handleBlur,
    handleKeyDown,
    handleNavigate,
  } = useContext(EditableHeaderContext);

  return (
    <>
      {isEditing || showOnlyInput ? (
        <div className="flex flex-col">
          <input
            ref={inputRef}
            name="title"
            placeholder="Untitled"
            className={`${className} overflow-hidden whitespace-pre text-gray-800 caret-blue-500 outline-none`}
            value={value}
            onChange={handleInput}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <div
            className={`${className} block h-[2px] w-0 bg-blue-500 transition-all duration-100 before:h-[2px] group-focus-within/header:w-full`}
          ></div>
        </div>
      ) : (
        <div
          onClick={handleNavigate}
          className={`${className} mb-[2px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-gray-800 transition-colors hover:text-blue-500`}
        >
          {value}
        </div>
      )}

      {/* The following divs are used to calculate the width and minWidth of the input field. */}
      <div className={className}>
        <div ref={textRef} className="invisible absolute whitespace-nowrap">
          {hiddenValue}
        </div>
        <div ref={minWidthRef} className="invisible absolute">
          {defaultTitle || "Untitled"}
        </div>
      </div>
    </>
  );
}

function EditableHeaderActions({ children, className = "" }) {
  const { handleEdit, handleRevert, isTitleChanged } = useContext(
    EditableHeaderContext,
  );

  return (
    <>
      <div className={className}>
        <div className={`${isTitleChanged ? "hidden" : ""} md:flex`}>
          {children}
        </div>
      </div>

      {isTitleChanged ? (
        <div className="flex md:hidden">
          <MobileEditableHeaderActions
            onEdit={handleEdit}
            onRevert={handleRevert}
          />
        </div>
      ) : null}
    </>
  );
}

function EditableHeaderButton({
  type = "rename",
  children,
  showOnEdit = true,
  mobileVisible = true,
}) {
  const { handleEdit, handleRevert, isEditing, titleUpdated } = useContext(
    EditableHeaderContext,
  );

  const handlers = {
    rename: handleEdit,
    revert: titleUpdated ? handleRevert : null,
  };

  const onClick = handlers[type];

  let buttonClass = mobileVisible
    ? "flex md:hidden md:group-hover/header:flex"
    : "hidden md:group-hover/header:flex";

  if (showOnEdit && isEditing) {
    buttonClass = "flex";
  }

  if (!showOnEdit && isEditing) {
    buttonClass = "hidden";
  }

  if (!titleUpdated && type === "revert") {
    buttonClass = "hidden";
  }

  return (
    <div className={buttonClass}>{cloneElement(children, { onClick })}</div>
  );
}

EditableHeader.Input = EditableHeaderInput;
EditableHeader.Actions = EditableHeaderActions;
EditableHeader.Button = EditableHeaderButton;

export default EditableHeader;
