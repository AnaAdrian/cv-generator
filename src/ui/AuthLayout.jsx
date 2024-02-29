import Header from "./Header";
import HomeButton from "./HomeButton";

function AuthLayout({ children }) {
  return (
    <>
      <Header>
        <HomeButton />
      </Header>

      <div className="my-10 flex justify-center">
        <div className="w-full max-w-[410px]">{children}</div>
      </div>
    </>
  );
}

export default AuthLayout;
