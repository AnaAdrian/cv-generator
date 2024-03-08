import CardActions from "./CardActions";
import CardPlusIcon from "./CardPlusIcon";
import CardPreviewImg from "./CardPreviewImg";
import CardText from "./CardText";

function CardSection({ cardData, onClick }) {
  const imageComponent = cardData ? (
    <CardPreviewImg imgUrl={cardData.preview_image} />
  ) : (
    <CardPlusIcon />
  );

  const contentComponent = cardData ? (
    <CardActions cardData={cardData} />
  ) : (
    <CardText />
  );

  return (
    <article
      className="group my-10 flex max-w-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="relative mr-8 w-48 overflow-hidden rounded-md border pb-[270px]">
        {imageComponent}
      </div>
      <div className="min-w-0 flex-1">{contentComponent}</div>
    </article>
  );
}

export default CardSection;
