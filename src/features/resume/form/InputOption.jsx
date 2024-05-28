import { highlightText } from "../../../utils/highlightText";

function InputOption({ option, inputValue, handleSelect }) {
  const highlightedText = highlightText(option.name, inputValue);
  return (
    <li
      onMouseDown={handleSelect}
      className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-500 md:text-base"
    >
      {highlightedText}
    </li>
  );
}

export default InputOption;
