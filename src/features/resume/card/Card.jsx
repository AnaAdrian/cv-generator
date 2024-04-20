function Card({ children, className, onClick }) {
  return (
    <article
      className={`group/card flex items-start ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </article>
  );
}

function Preview({ children }) {
  return (
    <div className="relative mr-8 h-40 w-28 cursor-pointer overflow-hidden rounded-md border md:h-[270px] md:w-48">
      {children}
    </div>
  );
}

function Content({ children }) {
  return <div className="w-72">{children}</div>;
}

Card.Preview = Preview;
Card.Content = Content;

export default Card;
