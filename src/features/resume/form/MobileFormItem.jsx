import { useState } from "react";

function MobileFormItem({ itemName }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <h2 className="text-lg font-semibold text-gray-800">{itemName}</h2>
      <div className="absolute right-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-2 w-2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default MobileFormItem;
