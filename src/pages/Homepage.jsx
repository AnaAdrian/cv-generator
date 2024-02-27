import Header from "../ui/Header";
import AuthNavigation from "../features/auth/AuthNavigation";

function Homepage() {
  return (
    <div className="px-7">
      <Header>
        <AuthNavigation />
      </Header>
    </div>
  );
}

export default Homepage;
