import Input from "../../../ui/Input";
import { useUpdateResume } from "../useUpdateResume";
import { useState } from "react";

function ResumeTitle({ title, resumeId }) {
  const [value, setValue] = useState(title);
  const { mutate: updateResume } = useUpdateResume();

  function handleUpdateValue(e) {
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
    <Input
      placeholder="Untitled"
      value={value}
      onChange={handleUpdateValue}
      onBlur={handleBlur}
      className="font-base w-full text-center text-xl text-gray-800 outline-none"
    />
  );
}

export default ResumeTitle;
