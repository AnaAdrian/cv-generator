import { useNavigate } from "react-router-dom";

import CardSection from "./card/CardSection";

function ResumeList() {
  const navigate = useNavigate();
  const cardData = {
    id: 192,
    preview_image:
      "https://ssr.resume.tools/to-image/9K5m6E9BoznELLnJKAEV3jt6-1.webp?cache=04f8ce12bd&size=384",
  };
  return (
    <CardSection
      cardData={cardData}
      onClick={() => navigate(`/app/resumes/${cardData.id}/edit`)}
    />
  );
}

export default ResumeList;
