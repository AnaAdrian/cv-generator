function CardActionsButton({ Icon, children, onClick }) {
  return (
    <button
      className="flex items-center gap-3 font-light transition-all hover:text-blue-500"
      onClick={onClick}
    >
      {Icon && <Icon className="h-5 w-5 text-blue-500" />}
      {children}
    </button>
  );
}

export default CardActionsButton;
