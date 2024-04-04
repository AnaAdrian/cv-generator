import { useNavigate } from "react-router-dom";
import CardSection from "./card/CardSection";
import CardPreviewImage from "./card/CardPreviewImage";
import CardActions from "./card/CardActions";

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();
  const customDisabled = "pointer-events-none opacity-50 grayscale";

  return (
    <CardSection
      key={resume.id}
      className={resume.id === -1 ? customDisabled : ""}
    >
      <CardSection.Preview>
        <CardPreviewImage
          src={resume.preview_image}
          onClick={() => navigate(`/app/resumes/${resume.id}/edit`)}
        />
      </CardSection.Preview>
      <CardSection.Content>
        <CardActions resume={resume} />
      </CardSection.Content>
    </CardSection>
  );
};

export default ResumeCard;
