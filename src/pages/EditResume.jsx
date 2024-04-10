import { useParams } from "react-router-dom";

import ResumeForm from "../features/resume/form/ResumeForm";

function EditResume() {
  const { id: resumeId } = useParams();
  console.log("resumeId", resumeId);

  return <ResumeForm resumeId={resumeId} />;
}

export default EditResume;
