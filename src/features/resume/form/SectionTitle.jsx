import { useState } from "react";

function SectionTitle({ initialTitle }) {
  const [title, setTitle] = useState(initialTitle);

  return <div>{title}</div>;
}

export default SectionTitle;
