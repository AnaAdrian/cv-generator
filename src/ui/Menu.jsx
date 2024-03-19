import {
  createContext,
  useContext,
  useRef,
  useState,
  cloneElement,
} from "react";

import { CSSTransition } from "react-transition-group";
import { useOutsideClick } from "../hooks/useOutsideClick";

const MenuContext = createContext();

function Menu({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggleRef = useRef();
  const listRef = useOutsideClick(close, toggleRef);

  return (
    <div className={className}>
      <MenuContext.Provider
        value={{
          open,
          close,
          isOpen,
          toggleRef,
          listRef,
        }}
      >
        {children}
      </MenuContext.Provider>
    </div>
  );
}

function MenuToggle({ children }) {
  const { isOpen, open, close, toggleRef } = useContext(MenuContext);

  const handleClick = () => {
    if (isOpen) {
      close();
      return;
    }
    open();
  };

  const toggle = cloneElement(children, {
    onClick: handleClick,
    ref: toggleRef,
    isOpen,
  });

  return toggle;
}

function MenuList({ children, classNames = "user", className, timeout = 200 }) {
  const { isOpen, listRef } = useContext(MenuContext);

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ enter: timeout, exit: 0 }}
      classNames={classNames}
      unmountOnExit
      nodeRef={listRef}
    >
      <div
        className={`absolute z-10 flex flex-col ${className ? className : ""}`}
        ref={listRef}
      >
        {children}
      </div>
    </CSSTransition>
  );
}

function MenuItem({ children, className, closeMenu = true }) {
  const { close } = useContext(MenuContext);
  const ref = useRef(null);

  const handleClick = (e) => {
    const container = ref.current;

    const firstChild = container.firstChild;

    // If there is a child, pass the close function to it
    if (firstChild?.contains(e.target) || !firstChild) {
      if (closeMenu) {
        close();
      }
    }
  };

  return (
    <div ref={ref} onClick={handleClick} className={className ? className : ""}>
      {children}
    </div>
  );
}

Menu.Toggle = MenuToggle;
Menu.List = MenuList;
Menu.Item = MenuItem;

export default Menu;
