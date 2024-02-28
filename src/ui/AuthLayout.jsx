import Header from "./Header";
import HomeButton from "./HomeButton";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col px-7">
      <Header>
        <HomeButton />
      </Header>

      <div className="my-10 flex justify-center">
        <div className="w-full max-w-[410px]">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
