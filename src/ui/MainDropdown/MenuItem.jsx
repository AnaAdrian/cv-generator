import { Link } from "react-router-dom";

function Item({ to, children, className, onClick }) {
  const itemClass = `text-sm transition-all duration-150 hover:text-blue-500 md:text-base cursor-pointer ${className ? className : ""}`;

  if (onClick) {
    return (
      <span onClick={onClick} className={itemClass}>
        {children}
      </span>
    );
  }

  return (
    <Link to={to} className={itemClass}>
      {children}
    </Link>
  );
}

export default Item;
