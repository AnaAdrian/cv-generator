import { useNavigate } from "react-router-dom";
import Card from "./card/Card";
import PreviewImage from "./card/PreviewImage";
import CardActions from "./card/CardActions";

const ResumeCard = ({ resume }) => {
  const navigate = useNavigate();
  const customDisabled = "pointer-events-none opacity-50 grayscale";

  return (
    <Card key={resume.id} className={resume.id === -1 ? customDisabled : ""}>
      <Card.Preview>
        <PreviewImage
          src={resume.preview_image}
          onClick={() => navigate(`/app/resumes/${resume.id}/edit`)}
        />
      </Card.Preview>
      <Card.Content>
        <CardActions resume={resume} />
      </Card.Content>
    </Card>
  );
};

export default ResumeCard;
