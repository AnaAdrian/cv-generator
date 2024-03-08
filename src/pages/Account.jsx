import Header from "../ui/Header";
import UserDropdown from "../features/users/UserDropdown";
import UserSettingsForm from "../features/users/UserSettingsForm";
import DashboardLayout from "../ui/DashboardLayout";

function Account() {
  return (
    <DashboardLayout>
      <Header className="border-b">
        <UserDropdown />
      </Header>
      <UserSettingsForm />;
    </DashboardLayout>
  );
}

export default Account;
