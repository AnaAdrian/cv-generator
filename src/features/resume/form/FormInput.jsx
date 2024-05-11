import { useCallback, useRef, useState } from "react";
import debounce from "lodash.debounce";

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdate = useCallback(
    debounce((newValue) => {
      const previousValue = previousValueRef.current;
      if (previousValue !== newValue) {
        onUpdate({
          tableName,
          id,
          updates: { [fieldName]: newValue },
        });
        previousValueRef.current = newValue;
      }
    }, 500),
    [],
  );

  function onChange(e) {
    setInputValue(e.target.value);
    debouncedUpdate(e.target.value);
  }

  return (
    <Input
      label={label}
      value={inputValue}
      onChange={onChange}
      className="h-[50px] w-full rounded-[3px] bg-slate-100 px-4 py-3 text-sm text-gray-700 focus:outline-none md:text-base"
      {...rest}
    />
  );
}

export default FormInput;
