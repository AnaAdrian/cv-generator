import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MobileModalContext = createContext();

function MobileModal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(null);
  const ref = useOutsideClick(close);

  return (
    <MobileModalContext.Provider value={{ isOpen, open, close, ref }}>
      {children}
    </MobileModalContext.Provider>
  );
}

function Open({ children }) {
  const { open } = useContext(MobileModalContext);
  return cloneElement(children, { onClick: open });
}

function Content({ children }) {
  const { isOpen, ref } = useContext(MobileModalContext);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 z-10 animate-fadeIn bg-gray-950 bg-opacity-80"></div>
      <div className="fixed bottom-5 left-0 right-0 z-40 m-5 animate-fadeInDown">
        <div
          ref={ref}
          className="flex flex-col justify-center rounded-lg bg-white"
        >
          {children}
        </div>
        <div className="mt-4 animate-fadeInDownSlow cursor-pointer rounded-lg bg-white p-3 text-center text-sm font-semibold text-blue-500">
          Cancel
        </div>
      </div>
    </>,
    document.body,
  );
}

function Row({ children, onClick }) {
  const { close } = useContext(MobileModalContext);
  function handleClick() {
    if (onClick) {
      onClick();
    }
    close();
  }

  return (
    <div className="border-b last:border-b-0">
      <div
        className="m-3 flex cursor-pointer flex-row items-center gap-3 p-1.5 text-sm text-gray-800 transition-colors hover:text-blue-500"
        onClick={handleClick}
      >
        {children}
      </div>
    </div>
  );
}

MobileModal.Open = Open;
MobileModal.Content = Content;
MobileModal.Row = Row;

export default MobileModal;
