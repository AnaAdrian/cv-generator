import Header from "./Header";

function AuthLayout({ children }) {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 w-full">
        <Header />
      </div>
      <div>{children}</div>
    </div>
  );
}

export default AuthLayout;
