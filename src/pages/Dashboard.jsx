import CreateResume from "../features/resume/CreateResume";
import ResumeList from "../features/resume/ResumeList";
import Header from "../ui/Header";
import UserDropdown from "../features/users/UserDropdown";

function Dashboard() {
  return (
    <div className="mx-5">
      <div className="mx-auto w-full max-w-6xl">
        <Header className="border-b">
          <UserDropdown />
        </Header>
        <div className="flex flex-col md:flex-row">
          <CreateResume />
          <ResumeList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
