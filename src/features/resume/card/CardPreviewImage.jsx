function CardPreviewImage({ src, onClick }) {
  return (
    <img
      className="absolute left-0 top-0 w-full cursor-pointer object-cover"
      src={src}
      alt="card_preview_image"
      onClick={onClick}
    />
  );
}

export default CardPreviewImage;
