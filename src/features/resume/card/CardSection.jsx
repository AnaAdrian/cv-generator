import { Link } from "react-router-dom";

import CardActions from "./CardActions";
import CardPlusIcon from "./CardPlusIcon";
import CardText from "./CardText";

function CardSection({ cardData, className, onClick }) {
  const imageComponent = cardData ? (
    <Link to={`/app/resumes/${cardData.id}/edit`}>
      <img
        className="absolute left-0 top-0 w-full object-cover"
        src={cardData.preview_image}
      />
    </Link>
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
      className={`group my-10 flex w-full flex-1 items-start ${className ? className : ""}`}
      onClick={onClick}
    >
      <div className="relative mr-8 w-28 overflow-hidden rounded-md border pb-40 md:w-48 md:pb-[270px]">
        {imageComponent}
      </div>
      <div className="flex-1">{contentComponent}</div>
    </article>
  );
}

export default CardSection;
