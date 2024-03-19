function CardSection({ img, content, className, onClick }) {
  return (
    <article
      className={`group my-10 flex w-full flex-1 items-start ${className ? className : ""}`}
      onClick={onClick}
    >
      <div className="relative mr-8 w-28 overflow-hidden rounded-md border pb-40 md:w-48 md:pb-[270px]">
        {img}
      </div>
      <div className="flex-1">{content}</div>
    </article>
  );
}

export default CardSection;
