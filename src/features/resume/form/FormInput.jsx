import { useRef, useState } from "react";

import Input from "../../../ui/Input";
import { useUpdateResume } from "../useUpdateResume";

//eslint-disable-next-line
function FormInput({ id, tableName, fieldName, value, ...rest }) {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const previousValueRef = useRef(value);
  const label = fieldName
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const { mutate: onUpdate } = useUpdateResume();

  function onChange(e) {
    setInputValue(e.target.value);
  }

  function handleBlur() {
    const previousValue = previousValueRef.current;
    if (previousValue === inputValue) return;
    onUpdate({
      tableName,
      id,
      updates: { [fieldName]: inputValue },
    });
    previousValueRef.current = inputValue;
  }

  return (
    <Input
      label={label}
      value={inputValue}
      onChange={onChange}
      onBlur={handleBlur}
      className="w-full bg-slate-100 px-4 py-3 text-sm text-gray-700 focus:outline-none md:text-base"
      {...rest}
    />
  );
}

export default FormInput;
