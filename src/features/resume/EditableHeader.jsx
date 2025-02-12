import {
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  width,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: onUpdate } = useUpdateResume();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title || defaultTitle);
  const [hiddenValue, setHiddenValue] = useState(title);
  const previousValueRef = useRef(title || defaultTitle);
  const inputRef = useRef(null);
  const actionsRef = useRef(null);
  const textRef = useRef(null);
  const minWidthRef = useRef(null);
  const isMobile = useResize(768);
  const titleUpdated = defaultTitle && value !== defaultTitle;

  const adjustInputSize = useCallback(() => {
    if (inputRef.current && textRef.current && minWidthRef.current) {
      const minWidth = minWidthRef.current.getBoundingClientRect().width;
      const actionsWidth = actionsRef?.current?.getBoundingClientRect().width;
      const maxWidth = width - actionsWidth - 4; // The width will be parent width - actions - gap between elements.
      inputRef.current.style.width = `${minWidth}px`;

      const textContainer = textRef.current.getBoundingClientRect();
      let exactWidth = Math.max(textContainer.width, minWidth);

      if (exactWidth >= maxWidth) {
        exactWidth = maxWidth;
      }

      inputRef.current.style.width = `${exactWidth}px`;
    }
  }, [width]);

  useEffect(() => {
    adjustInputSize();
  }, [value, isEditing, isMobile, adjustInputSize]);

  function handleEdit() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current.focus();
      inputRef.current.select();
    }, 0);
  }

  function handleInputBlur() {
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

  function handleInputChange(e) {
    setValue(e.target.value);
    setHiddenValue(e.target.value.replace(/ /g, "\u00A0"));
  }

  function handleNavigate() {
    if (location.pathname !== `/app/resumes/${id}/edit`)
      navigate(`/app/resumes/${id}/edit`);
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputBlur();
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
        actionsRef,
        textRef,
        minWidthRef,
        titleUpdated,
        handleEdit,
        handleRevert,
        handleInputBlur,
        handleInputChange,
        handleInputKeyDown,
        handleNavigate,
      }}
    >
      <div
        className={`group/header relative flex min-h-7 items-center gap-[2px] ${className}`}
      >
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
    handleInputChange,
    handleInputBlur,
    handleInputKeyDown,
    handleNavigate,
  } = useContext(EditableHeaderContext);
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    handleInputBlur();
    setIsFocused(false);
  }

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
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            maxLength={100}
          />
          {showOnlyInput ? (
            <div
              className={`${className} mx-auto h-[2px] w-1/2 bg-blue-500 ${isFocused ? "w-full opacity-100 duration-100" : "opacity-0 duration-0"} ease-out before:h-0.5`}
            ></div>
          ) : (
            <div
              className={`${className} mx-auto h-[2px] w-1/2 bg-blue-500 opacity-0 transition-all duration-75 ease-out before:h-0.5 group-focus-within/header:w-full group-focus-within/header:opacity-100`}
            ></div>
          )}
        </div>
      ) : (
        <div
          onClick={handleNavigate}
          className={`mb-0.5 ${location.pathname.includes("edit") ? "cursor-default" : "cursor-pointer hover:text-blue-500"} items-center truncate text-gray-800 ${className} `}
        >
          {value}
        </div>
      )}

      {/* The following divs are used to calculate the width and minWidth of the input field. */}
      <div className={className}>
        <div ref={textRef} className="invisible absolute left-0 top-0">
          {hiddenValue}
        </div>
        <div ref={minWidthRef} className="invisible absolute left-0 top-0">
          {"Untitled"}
        </div>
      </div>
    </>
  );
}

function EditableHeaderActions({ children, className = "" }) {
  const { titleUpdated, actionsRef } = useContext(EditableHeaderContext);
  return (
    <div ref={actionsRef}>
      <div className={`${titleUpdated ? "hidden" : ""} md:flex ${className}`}>
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
        <RxDotsHorizontal
          size={18}
          className="ml-1 cursor-pointer text-gray-400 transition-colors hover:text-blue-500"
        />
      </MobileModal.Open>

      <MobileModal.Content>
        <MobileModal.Row onClick={handleEdit}>
          <PiPencilSimpleBold size={18.5} className="w-5 text-blue-500" />
          Rename
        </MobileModal.Row>

        <MobileModal.Row onClick={handleRevert}>
          <FaUndo size={14} className="w-5 text-blue-500" />
          Revert Section Name
        </MobileModal.Row>
      </MobileModal.Content>
    </MobileModal>
  );
}

EditableHeader.Input = EditableHeaderInput;
EditableHeader.Actions = EditableHeaderActions;
EditableHeader.Button = EditableHeaderButton;

export default EditableHeader;
