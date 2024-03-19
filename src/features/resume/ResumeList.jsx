import { useNavigate } from "react-router-dom";

import CardSection from "./card/CardSection";
import CardPreviewImage from "./card/CardPreviewImage";
import CardActions from "./card/CardActions";

function ResumeList({ resumeData }) {
  const navigate = useNavigate();

  return resumeData?.map((card) => (
    <CardSection key={card.id}>
      <CardSection.Preview>
        <CardPreviewImage
          src={card.preview_image}
          onClick={() => navigate(`/app/resumes/${card.id}/edit`)}
        />
      </CardSection.Preview>
      <CardSection.Content>
        <CardActions cardData={card} />
      </CardSection.Content>
    </CardSection>
  ));
}

export default ResumeList;
