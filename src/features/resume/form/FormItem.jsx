import { useState } from "react";
import MobileFormItem from "./MobileFormItem";

function FormItem({ item }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [at, setAt] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  return (
    <div className="border">
      <div className="invisible md:flex">
        {open && render({ setTitle, setAt, setStartDate, setEndDate })}
      </div>
      <div className="absolute md:hidden">
        <MobileFormItem item={item} />
      </div>
    </div>
  );
}

export default FormItem;
