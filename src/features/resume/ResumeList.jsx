import { useNavigate } from "react-router-dom";

import CardSection from "./card/CardSection";
import CardPreviewImage from "./card/CardPreviewImage";
import CardActions from "./card/CardActions";

function ResumeList({ resumeData }) {
  const navigate = useNavigate();

  return resumeData?.map((resume) => (
    <CardSection key={resume.id}>
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
  ));
}

export default ResumeList;
