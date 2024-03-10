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

function MenuList({ children, classNames = "user", timeout = 200 }) {
  const { isOpen, listRef } = useContext(MenuContext);

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ enter: timeout, exit: 0 }}
      classNames={classNames}
      unmountOnExit
      nodeRef={listRef}
    >
      <ul
        className="absolute top-10 z-10 flex flex-col rounded-lg bg-white shadow-custom"
        ref={listRef}
      >
        {children}
      </ul>
    </CSSTransition>
  );
}

function MenuItem({ children, closeMenu = true }) {
  const { close } = useContext(MenuContext);
  const ref = useRef(null);

  const handleClick = (e) => {
    const container = ref.current;

    const firstChild = container.firstChild;

    if (firstChild.contains(e.target) && e.target !== container) {
      if (closeMenu) {
        close();
      }
    }
  };

  return (
    <li ref={ref} onClick={handleClick}>
      {children}
    </li>
  );
}

Menu.Toggle = MenuToggle;
Menu.List = MenuList;
Menu.Item = MenuItem;

export default Menu;
