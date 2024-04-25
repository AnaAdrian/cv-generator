function CardDefaultIcon() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className={`relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#f1f3fb] transition-all group-hover/card:bg-blue-500`}
      >
        <div className="absolute h-6 w-0.5 bg-[#C7CCCF] group-hover/card:bg-white"></div>
        <div className="absolute h-0.5 w-6 bg-[#C7CCCF] group-hover/card:bg-white"></div>
      </div>
    </div>
  );
}

export default CardDefaultIcon;
