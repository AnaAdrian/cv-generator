function CardSection({ children, className, onClick }) {
  return (
    <article
      className={`group my-10 flex w-full flex-1 items-start ${className ? className : ""}`}
      onClick={onClick}
    >
      {children}
    </article>
  );
}

function CardPreview({ children }) {
  return (
    <div className="relative mr-8 w-28 overflow-hidden rounded-md border pb-40 md:w-48 md:pb-[270px]">
      {children}
    </div>
  );
}

function CardContent({ children, className }) {
  return (
    <div className={"flex-1" + className ? className : ""}>{children}</div>
  );
}

CardSection.Preview = CardPreview;
CardSection.Content = CardContent;

export default CardSection;
