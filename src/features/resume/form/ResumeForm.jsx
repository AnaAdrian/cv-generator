import PersonalDetails from "./PersonalDetails.jsx";
import LoaderFullPage from "../../../ui/LoaderFullPage.jsx";
import EditableHeader from "../EditableHeader.jsx";
import { useGetResume } from "../useGetResume.js";

function ResumeForm({ resumeId }) {
  const { data: resumeData } = useGetResume(resumeId);

  if (!resumeData) {
    return <LoaderFullPage />;
  }

  return (
    <div className="mt-16">
      <EditableHeader
        title={resumeData?.title}
        id={resumeId}
        tableName="resumes"
        fieldName="title"
        showOnlyInput={true}
        variant="formTitle"
        className="flex justify-center"
      />
      <PersonalDetails resumeData={resumeData} />
    </div>
  );
}

export default ResumeForm;
