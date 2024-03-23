function CardPreviewImage({ src, onClick, className }) {
  return (
    <img
      className={
        "absolute left-0 top-0 w-full cursor-pointer object-cover" + className
          ? className
          : ""
      }
      src={src}
      alt="card_preview_image"
      onClick={onClick}
    />
  );
}

export default CardPreviewImage;
