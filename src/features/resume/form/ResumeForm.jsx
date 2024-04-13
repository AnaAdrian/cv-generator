import PersonalDetails from "./PersonalDetails.jsx";
import { useGetResume } from "../useGetResume.js";
import ResumeTitle from "./ResumeTitle.jsx";
import LoaderFullPage from "../../../ui/LoaderFullPage.jsx";

function ResumeForm({ resumeId }) {
  const { data: resumeData } = useGetResume(resumeId);

  if (!resumeData) {
    return <LoaderFullPage />;
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-center">
        <ResumeTitle title={resumeData?.title} resumeId={resumeId} />
      </div>
      <PersonalDetails resumeData={resumeData} />
    </div>
  );
}

export default ResumeForm;
