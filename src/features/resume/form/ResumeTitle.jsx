import { useRef, useState, useEffect } from "react";
import { useUpdateResume } from "../useUpdateResume";

function ResumeTitle({ title, resumeId }) {
  const [value, setValue] = useState(title || "");
  const inputRef = useRef(null);
  const { mutate: updateResume } = useUpdateResume();

  useEffect(() => {
    adjustInputSize();
  }, [value]);

  function adjustInputSize() {
    if (inputRef.current) {
      const minWidth = "90px";
      inputRef.current.style.width = `${minWidth}`;

      const scrollWidth = `${inputRef.current.scrollWidth}px`;
      inputRef.current.style.width = scrollWidth;
    }
  }

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleBlur() {
    updateResume({
      tableName: "resumes",
      id: resumeId,
      updates: { title: value || "Untitled" },
    });
    if (!value) {
      setValue("Untitled");
    }
  }

  return (
    <div className="group/header">
      <input
        ref={inputRef}
        className="max-w-96 text-center text-2xl text-gray-800 caret-blue-500 outline-none"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Untitled"
      />
      <div className="h-[2px] w-0 bg-blue-500 transition-all duration-100 group-focus-within/header:w-full"></div>
    </div>
  );
}

export default ResumeTitle;
