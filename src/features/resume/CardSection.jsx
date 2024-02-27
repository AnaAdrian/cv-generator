function CardSection({ cardSection, textSection }) {
  return (
    <div className="flex">
      <div className="card-section">{cardSection}</div>
      <div className="text-section">{textSection}</div>
    </div>
  );
}

export default CardSection;
