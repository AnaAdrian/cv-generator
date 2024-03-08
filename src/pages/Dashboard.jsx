import CreateResume from "../features/resume/CreateResume";
import ResumeList from "../features/resume/ResumeList";
import Header from "../ui/Header";
import UserDropdown from "../features/users/UserDropdown";
import DashboardLayout from "../ui/DashboardLayout";

function Dashboard() {
  return (
    <DashboardLayout>
      <Header className="border-b">
        <UserDropdown />
      </Header>
      <div className="flex flex-col flex-wrap items-center justify-between gap-2 md:flex-row">
        <CreateResume />
        <ResumeList />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
