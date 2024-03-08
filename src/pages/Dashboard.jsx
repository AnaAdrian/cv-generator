import CreateResume from "../features/resume/CreateResume";
import ResumeList from "../features/resume/ResumeList";

function Dashboard() {
  return (
    <div className="flex flex-col flex-wrap items-center justify-between gap-2 md:flex-row">
      <CreateResume />
      <ResumeList />
    </div>
  );
}

export default Dashboard;
