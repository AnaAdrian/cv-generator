import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../ui/Button";
import MobileModal from "../../ui/MobileModal";
import { useUpdateResume } from "./useUpdateResume";
import { RxDotsHorizontal } from "react-icons/rx";
import { FaUndo } from "react-icons/fa";
import { PiPencilSimpleBold } from "react-icons/pi";
import { useResize } from "../../hooks/useResize";

const EditableHeaderContext = createContext(null);

function EditableHeader({
  children,
  id,
  title,
  defaultTitle,
  tableName,
  fieldName,
  sectionTitle = "",
  currentSectionsTitles = {},
  className = "",
}) {
  const navigate = useNavigate();
  const { mutate: onUpdate } = useUpdateResume();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title || defaultTitle);
  const [hiddenValue, setHiddenValue] = useState(title);
  const previousValueRef = useRef(title || defaultTitle);
  const inputRef = useRef(null);
  const textRef = useRef(null);
  const minWidthRef = useRef(null);
  const isMobile = useResize(768);
  const titleUpdated = defaultTitle && value !== defaultTitle;

  useEffect(() => {
    adjustInputSize();
  }, [value, isEditing, isMobile]);

  function adjustInputSize() {
    if (inputRef.current && textRef.current && minWidthRef.current) {
      const minWidth = minWidthRef.current.getBoundingClientRect().width;
      inputRef.current.style.width = `${minWidth}px`;

      const textContainer = textRef.current.getBoundingClientRect();
      let exactWidth = Math.max(textContainer.width, minWidth);

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

    const previousValue = previousValueRef.current;
    const value = inputRef.current.value;
    if (previousValue === value) return;

    let updates = { [fieldName]: value.trim() || defaultTitle || "Untitled" };

    if (sectionTitle) {
      const updatedSectionsTitles = { ...currentSectionsTitles };
      updatedSectionsTitles[sectionTitle] = value.trim();
      updates = { [fieldName]: updatedSectionsTitles };
    }

    onUpdate({
      tableName,
      id,
      updates,
    });

    if (value.trim() === "") {
      setValue(defaultTitle || "Untitled");
      setHiddenValue(defaultTitle || "Untitled");
    }
    setValue((prev) => prev.trim());
    setHiddenValue((prev) => prev.trim());
  }

  function handleRevert() {
    let updates = { [fieldName]: defaultTitle };

    if (sectionTitle) {
      const updatedSectionsTitles = { ...currentSectionsTitles };
      delete updatedSectionsTitles[sectionTitle];
      updates = { [fieldName]: updatedSectionsTitles };
    }

    setValue(defaultTitle);
    setHiddenValue(defaultTitle);
    onUpdate({
      tableName,
      id,
      updates,
    });
  }

  function handleInput(e) {
    setValue(e.target.value);
    setHiddenValue(e.target.value.replace(/ /g, "\u00A0"));
  }

  function handleNavigate() {
    navigate(`/app/resumes/${id}/edit`);
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
      <div className={`group/header relative flex items-center ${className}`}>
        {children}
      </div>
    </EditableHeaderContext.Provider>
  );
}

function EditableHeaderInput({ className = "", showOnlyInput = false }) {
  const {
    inputRef,
    value,
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
            className={`${className} mx-auto h-[2px] w-1/2 bg-blue-500 opacity-0 transition-all duration-100 before:h-0.5 group-focus-within/header:w-full group-focus-within/header:opacity-100`}
          ></div>
        </div>
      ) : (
        <div
          onClick={handleNavigate}
          className={`${className} mb-0.5 cursor-pointer items-center truncate text-gray-800 transition-colors hover:text-blue-500`}
        >
          {value}
        </div>
      )}

      {/* The following divs are used to calculate the width and minWidth of the input field. */}
      <div className={className}>
        <div ref={textRef} className="invisible absolute">
          {hiddenValue}
        </div>
        <div ref={minWidthRef} className="invisible absolute">
          {"Untitled"}
        </div>
      </div>
    </>
  );
}

function EditableHeaderActions({ children, className = "" }) {
  const { titleUpdated } = useContext(EditableHeaderContext);
  return (
    <div className={className}>
      <div className={`${titleUpdated ? "hidden" : ""} md:flex`}>
        {children}
      </div>

      {titleUpdated ? (
        <div className="flex md:hidden">
          <MobileEditableHeaderActions />
        </div>
      ) : null}
    </div>
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

  const transitionClass = "transition-opacity duration-150 ease-in-out";

  let buttonClass = mobileVisible
    ? "md:opacity-0 opacity-100 group-hover/header:opacity-100"
    : "opacity-0 md:group-hover/header:opacity-100";

  if (showOnEdit && isEditing) {
    buttonClass = "opacity-100";
  }

  if (!showOnEdit && isEditing) {
    buttonClass = "hidden";
  }

  if (!titleUpdated && type === "revert") {
    buttonClass = "hidden";
  }

  return (
    <div className={`${buttonClass} ${transitionClass}`}>
      {cloneElement(children, { onClick })}
    </div>
  );
}

function MobileEditableHeaderActions() {
  const { handleEdit, handleRevert } = useContext(EditableHeaderContext);
  return (
    <MobileModal>
      <MobileModal.Open>
        <Button variant="menuAction" size="custom">
          <RxDotsHorizontal
            size={18}
            className="ml-1 text-gray-400 hover:text-blue-500"
          />
        </Button>
      </MobileModal.Open>

      <MobileModal.Content>
        <MobileModal.Row>
          <Button variant="menuAction" size="custom" onClick={handleEdit}>
            <PiPencilSimpleBold size={18.5} className="min-w-5 text-blue-500" />
            Rename
          </Button>
        </MobileModal.Row>

        <MobileModal.Row>
          <Button variant="menuAction" size="custom" onClick={handleRevert}>
            <FaUndo size={14} className="min-w-5 text-blue-500" />
            Revert Section Name
          </Button>
        </MobileModal.Row>
      </MobileModal.Content>
    </MobileModal>
  );
}

EditableHeader.Input = EditableHeaderInput;
EditableHeader.Actions = EditableHeaderActions;
EditableHeader.Button = EditableHeaderButton;

export default EditableHeader;
