import { useGetResume } from "../useGetResume.js";

function ResumeForm({ resumeId }) {
  const { data: resumeData } = useGetResume(resumeId);
  console.log(resumeData);

  return <div></div>;
}

export default ResumeForm;
