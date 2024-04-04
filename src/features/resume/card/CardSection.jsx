function CardSection({ children, className, onClick }) {
  return (
    <article
      className={`flex items-start ${className || ""}`}
      onClick={onClick}
    >
      <div className="group/card relative flex">{children}</div>
    </article>
  );
}

function CardPreview({ children }) {
  return (
    <div className="relative mr-8 h-40 w-28 cursor-pointer overflow-hidden rounded-md border md:h-[270px] md:w-48">
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return (
    <div className={`absolute left-full top-0 w-72 ${className || ""}`}>
      {children}
    </div>
  );
}

CardSection.Preview = CardPreview;
CardSection.Content = CardContent;

export default CardSection;
