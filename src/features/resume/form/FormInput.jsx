import { useCallback, useRef, useState, useEffect } from "react";
import debounce from "lodash.debounce";

import Input from "../../../ui/Input";
import { useUpdateResume } from "../useUpdateResume";
import InputOptions from "./InputOptions";

//eslint-disable-next-line
function FormInput({
  id,
  tableName,
  fieldName,
  value,
  displayOptions = false,
  optionsHandler,
  onSelectOption,
  ...rest
}) {
  const [inputValue, setInputValue] = useState(value ? value : "");
  const [isFocused, setIsFocused] = useState(false);
  const [options, setOptions] = useState([]);
  const previousValueRef = useRef(value);
  const label = fieldName
    .split("_")
    .join(" ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const { mutate: onUpdate } = useUpdateResume();

  useEffect(() => {
    if (!displayOptions || !optionsHandler || !isFocused) return;

    const fetchOptions = async (inputValue) => {
      try {
        const data = await optionsHandler(inputValue);
        setOptions(data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    const debouncedFetchOptions = debounce(fetchOptions, 300);

    if (inputValue) {
      debouncedFetchOptions(inputValue);
    }
    return () => {
      debouncedFetchOptions.cancel();
    };
  }, [inputValue, displayOptions, optionsHandler, isFocused]);

  // eslint-disable-next-line
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
    if (onSelectOption) onSelectOption(e.target.value);
  }

  function handleSelect(e) {
    setInputValue(e.target.textContent);
    debouncedUpdate(e.target.textContent);
    setOptions([]);
    if (onSelectOption) onSelectOption(e.target.textContent);
  }

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setTimeout(() => {
      setIsFocused(false);
      setOptions([]);
    }, 10);
    if (onSelectOption) onSelectOption("");
  }

  const showOptions =
    displayOptions && options.length > 0 && isFocused && inputValue;

  return (
    <div className="relative">
      <Input
        label={label}
        value={inputValue}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={displayOptions ? handleBlur : null}
        className="h-11 w-full rounded-[3px] bg-slate-100 px-4 py-3 text-sm text-gray-700 focus:outline-none md:h-[50px] md:text-base"
        {...rest}
      />
      {showOptions ? (
        <InputOptions
          options={options}
          inputValue={inputValue}
          handleSelect={handleSelect}
        />
      ) : null}
    </div>
  );
}

export default FormInput;
