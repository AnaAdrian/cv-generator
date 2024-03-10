import CardSection from "./card/CardSection";

function ResumeList() {
  const cardData = {
    id: 192,
    preview_image:
      "https://ssr.resume.tools/to-image/QR3gY7hJghgZWpwXssgcUJ9o-1.webp?cache=fd6234897c&size=384",
    name: "Untitled",
    updated_at: "10 March, 15:49",
    resume_score: 20,
  };
  return <CardSection cardData={cardData} />;
}

export default ResumeList;
