import ResumeCard from "./ResumeCard";

function ResumeList({ resumeData }) {
  return resumeData?.map((resume) => (
    <ResumeCard key={resume.id} resume={resume} />
  ));
}

export default ResumeList;
