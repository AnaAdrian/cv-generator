import { createContext, useContext, useCallback, useState } from "react";

const ModalStateContext = createContext();

function ModalStateProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ModalStateContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
    </ModalStateContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModalState() {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error("useModalState must be used within a ModalStateProvider");
  }
  return context;
}

export default ModalStateProvider;
