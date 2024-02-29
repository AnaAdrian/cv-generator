import { createPortal } from "react-dom";
import { createContext, useContext } from "react";
import { HiX } from "react-icons/hi";

import Button from "./Button";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { useModalState } from "../contexts/ModalStateProvider";

const ModalContext = createContext();

function Modal({ onClose, children }) {
  const { isOpen } = useModalState();

  const ref = useOutsideClick(onClose);
  if (!isOpen) return null;

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div
          ref={ref}
          className="relative mx-5 max-w-3xl rounded bg-white px-4 py-10"
        >
          <button onClick={onClose} className="absolute right-2 top-2 text-xl">
            <HiX />
          </button>
          <div className="max-w-lg p-5 text-center">{children}</div>
        </div>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
}

function Title({ children }) {
  return <h2 className="mb-4 text-2xl font-bold text-gray-800">{children}</h2>;
}

function Content({ children }) {
  return <p className="mb-10 text-gray-500">{children}</p>;
}

function ModalButton({ children }) {
  const { onClose } = useContext(ModalContext);

  return (
    <div className="flex justify-center">
      <Button className="font-semibold" variant="primary" onClick={onClose}>
        {children}
      </Button>
    </div>
  );
}

Modal.Title = Title;
Modal.Content = Content;
Modal.Button = ModalButton;

export default Modal;
