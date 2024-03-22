import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { HiX } from "react-icons/hi";

import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext();

function Modal({ children }) {
  const [openContent, setOpenContent] = useState(null);
  const open = setOpenContent;
  const close = () => setOpenContent(null);

  return (
    <ModalContext.Provider value={{ openContent, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
}

function Content({ children, name }) {
  const { openContent, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openContent !== name) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-40 animate-fadeIn bg-gray-950  bg-opacity-80"></div>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          ref={ref}
          className="relative mx-5 animate-fadeInUp rounded-md bg-white p-4"
        >
          <HiX
            onClick={close}
            className="absolute right-4 top-4 h-6 w-6 text-xl text-gray-400 transition-all hover:text-blue-500"
          />
          {cloneElement(children, { onCloseModal: close })}
        </div>
      </div>
    </>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Content = Content;

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

export default Modal;
