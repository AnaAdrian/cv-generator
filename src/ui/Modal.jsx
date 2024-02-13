import { createPortal } from "react-dom";
import { HiX } from "react-icons/hi";

import useOutsideClick from "../hooks/useOutsideClick";

const Modal = ({ isOpen, onClose, children }) => {
  const ref = useOutsideClick(onClose);
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={ref}
        className="p relative mx-5 max-w-3xl rounded bg-white px-4 py-10"
      >
        <button onClick={onClose} className="absolute right-2 top-2 text-xl">
          <HiX />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
