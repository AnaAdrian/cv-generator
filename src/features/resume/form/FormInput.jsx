import { useState } from "react";

import Input from "../../../ui/Input";
import { useUpdateResume } from "../useUpdateResume";

//eslint-disable-next-line
function FormInput({ id, tableName, fieldName, ...rest }) {
  const [value, setValue] = useState(rest.value);
  const label = fieldName.split("_").join(" ").toCapitalize();
  const { mutate: onUpdate } = useUpdateResume();

  function onChange(e) {
    setValue(e.target.value);
  }

  function handleBlur() {
    onUpdate({
      tableName,
      id,
      updates: { [fieldName]: value },
    });
  }

  return (
    <Input
      label={label}
      value={value}
      onChange={onChange}
      onBlur={handleBlur}
    />
  );
}

export default FormInput;
