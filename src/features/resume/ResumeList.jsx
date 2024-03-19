import { useNavigate } from "react-router-dom";

import CardSection from "./card/CardSection";
import CardPreviewImage from "./card/CardPreviewImage";
import CardActions from "./card/CardActions";

function ResumeList() {
  const navigate = useNavigate();
  const cardData = [
    {
      id: 192,
      preview_image:
        "https://ssr.resume.tools/to-image/QR3gY7hJghgZWpwXssgcUJ9o-1.webp?cache=fd6234897c&size=384",
      name: "Untitled",
      updated_at: "10 March, 15:49",
      resume_score: 20,
    },
  ];

  return cardData.map((card) => (
    <CardSection
      key={card.id}
      img={
        <CardPreviewImage
          src={card.preview_image}
          onClick={() => navigate(`/app/resumes/${card.id}/edit`)}
        />
      }
      content={<CardActions cardData={card} />}
    />
  ));
}

export default ResumeList;
