import Header from "../ui/Header";
import AuthNavigation from "../features/auth/AuthNavigation";

function Homepage() {
  return (
    <>
      <Header className="p-5">
        <AuthNavigation />
      </Header>
    </>
  );
}

export default Homepage;
