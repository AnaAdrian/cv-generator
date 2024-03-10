import CreateResume from "../features/resume/CreateResume";
import ResumeList from "../features/resume/ResumeList";

function Dashboard() {
  return (
    <div className="flex flex-col flex-wrap items-start justify-between gap-2 lg:flex-row">
      <CreateResume />
      <ResumeList />
    </div>
  );
}

export default Dashboard;
