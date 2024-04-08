import { useParams } from "react-router-dom";

import ResumeForm from "../features/resume/form/ResumeForm";

function EditResume() {
  const { id: resumeId } = useParams();

  return <ResumeForm resumeId={resumeId} />;
}

export default EditResume;
