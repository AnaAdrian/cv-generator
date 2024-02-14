import Header from "./Header";

function AuthLayout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {" "}
      <Header />
      <div className="mx-6 flex flex-1 items-center justify-center py-10">
        {" "}
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
