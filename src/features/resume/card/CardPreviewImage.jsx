function CardPreviewImage({ src, onClick, className }) {
  return (
    <img
      className={
        "absolute left-0 top-0 w-full cursor-pointer object-cover" + className
          ? className
          : ""
      }
      src={src || "/public/resume-placeholder.png"}
      alt={"preview image"}
      onClick={onClick}
    />
  );
}

export default CardPreviewImage;
