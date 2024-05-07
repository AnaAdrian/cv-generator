import {
  createContext,
  useContext,
  useRef,
  useState,
  cloneElement,
  isValidElement,
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
    <div>
      <MenuContext.Provider
        value={{
          open,
          close,
          isOpen,
          toggleRef,
          listRef,
        }}
      >
        <div className={className}>{children}</div>
      </MenuContext.Provider>
    </div>
  );
}

function Toggle({ children, keepOpen = false }) {
  const { isOpen, open, close, toggleRef } = useContext(MenuContext);
  const isReactComponent =
    isValidElement(children) && !Object.keys(children).length;

  const handleClick = () => {
    if (isOpen) {
      close();
      return;
    }
    open();
  };

  if (isReactComponent) {
    return cloneElement(children, {
      onClick: handleClick,
      ref: keepOpen ? null : toggleRef,
      isOpen,
    });
  }

  return cloneElement(children, {
    onClick: handleClick,
    ref: keepOpen ? null : toggleRef,
  });
}

function Header({ children, className }) {
  const { close } = useContext(MenuContext);
  return (
    <div onClick={close} className={className}>
      {children}
    </div>
  );
}

function List({
  children,
  classNames = "user",
  className = "",
  timeout = 200,
}) {
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
        className={`absolute top-full z-10 mt-2 flex flex-col ${className}`}
        ref={listRef}
      >
        {children}
      </div>
    </CSSTransition>
  );
}

function Item({ children, className, closeMenu = true, onClick }) {
  const { close } = useContext(MenuContext);

  const handleClick = () => {
    if (closeMenu) close();
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`transition-color flex cursor-pointer items-center gap-3 font-light hover:text-blue-500 ${className}`}
    >
      {children}
    </div>
  );
}

Menu.Toggle = Toggle;
Menu.Header = Header;
Menu.List = List;
Menu.Item = Item;

export default Menu;
