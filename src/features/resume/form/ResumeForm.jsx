import PersonalDetailsForm from "./PersonalDetailsForm.jsx";
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
        title={resumeData.title}
        id={resumeData.id}
        tableName="resumes"
        fieldName="title"
        className="justify-center"
      >
        <EditableHeader.Input
          showOnlyInput={true}
          className="max-w-96 text-center text-xl md:text-2xl"
        />
      </EditableHeader>

      <PersonalDetailsForm resumeData={resumeData} />
    </div>
  );
}

export default ResumeForm;
