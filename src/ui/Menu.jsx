import {
  createContext,
  useContext,
  useRef,
  useState,
  cloneElement,
} from "react";

import { useOutsideClick } from "../hooks/useOutsideClick";
import { isCustomComponent } from "../utils/helpers";

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
  const isReactComponent = isCustomComponent(children);

  const handleClick = () => {
    if (isOpen) {
      close();
    } else open();
  };

  const childProps = {
    onClick: handleClick,
    ref: keepOpen ? null : toggleRef,
  };

  if (isReactComponent) {
    childProps.isOpen = isOpen;
  }

  return cloneElement(children, childProps);
}

function Header({ children, className }) {
  const { close } = useContext(MenuContext);
  return (
    <div onClick={close} className={className}>
      {children}
    </div>
  );
}

function List({ children, className = "" }) {
  const { isOpen, listRef } = useContext(MenuContext);

  return (
    <div
      ref={listRef}
      className={`absolute top-full z-10 mt-2 flex transform flex-col transition-all ease-out ${className} ${
        isOpen ? "scale-100 opacity-100" : "scale-50 opacity-0 duration-0"
      }`}
    >
      {children}
    </div>
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
