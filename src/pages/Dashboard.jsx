import CreateResume from "../features/resume/CreateResume";
import ResumeList from "../features/resume/ResumeList";
import { useGetResumes } from "../features/resume/useGetResumes";

function Dashboard() {
  const { data: resumeData, isLoading } = useGetResumes();

  const noResumes = !resumeData?.length;
  const gridClass = noResumes ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2";

  if (isLoading) return null;

  return (
    <div className={`grid gap-2 ${gridClass} animate-fadeIn`}>
      <CreateResume noResumes={noResumes} />
      <ResumeList resumeData={resumeData} />
    </div>
  );
}

export default Dashboard;
