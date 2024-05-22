import { useState, useRef, useEffect } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

function Account({ initialValue = "Untitled" }) {
  const [value, setValue] = useState(initialValue);
  const [focused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const hiddenDivRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const headerRef = useOutsideClick(handleBlur);

  const handleInput = (e) => {
    setValue(e.target.value === "" ? "Untitled" : e.target.value);
  };

  useEffect(() => {
    if (hiddenDivRef.current && inputRef.current) {
      inputRef.current.style.width = `${hiddenDivRef.current.offsetWidth}px`;
    }
  }, [value]);

  const visibilityClass = focused
    ? "opacity-100 transition-all ease-out"
    : "opacity-0";

  return (
    <div ref={headerRef} className="relative mb-4" onClick={handleFocus}>
      <div className="relative flex flex-row items-center">
        <div className="mr-1 inline-flex min-w-0 items-center text-2xl leading-7">
          <div
            ref={hiddenDivRef}
            className="invisible absolute overflow-hidden whitespace-pre"
            style={{ font: "inherit", whiteSpace: "pre" }}
          >
            {value}
          </div>
          <input
            ref={inputRef}
            className="absolute inset-0 border-none bg-transparent p-0 text-2xl leading-7 text-gray-800 outline-none"
            placeholder="Untitled"
            value={value}
            onChange={handleInput}
          />
          <div
            className={`pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500 ${visibilityClass}`}
          />
        </div>
      </div>
    </div>
  );
}

export default Account;
