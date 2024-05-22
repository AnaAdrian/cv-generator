import { useCallback, useEffect, useRef, useState } from "react";
import PersonalDetailsForm from "./PersonalDetailsForm.jsx";
import LoaderFullPage from "../../../ui/LoaderFullPage.jsx";
import EditableHeader from "../EditableHeader.jsx";
import { useGetResume } from "../useGetResume.js";

function ResumeForm({ resumeId }) {
  const { data: resumeData } = useGetResume(resumeId);
  const [width, setWidth] = useState(0);
  const maxWidthRef = useRef(null);
  const initialUpdateDone = useRef(false);

  const updateWidth = useCallback(() => {
    if (maxWidthRef.current) {
      setWidth(maxWidthRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (!initialUpdateDone.current && resumeData) {
      updateWidth();
      initialUpdateDone.current = true;
    }
  }, [updateWidth, resumeData]);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [updateWidth]);

  if (!resumeData) {
    return <LoaderFullPage />;
  }

  return (
    <div className="mx-auto max-w-[850px] p-5 md:p-12">
      <div ref={maxWidthRef}>
        <EditableHeader
          title={resumeData.title}
          id={resumeData.id}
          tableName="resumes"
          fieldName="title"
          className="mb-10 justify-center"
        >
          <EditableHeader.Input
            showOnlyInput={true}
            className="max-w-96 text-center text-xl md:text-2xl"
          />
        </EditableHeader>

        <PersonalDetailsForm resumeData={resumeData} width={width} />
      </div>
    </div>
  );
}

export default ResumeForm;
