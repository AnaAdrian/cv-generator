import Header from "./Header";

function AuthLayout({ children }) {
  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0">
        <Header />
      </div>
      <div className="flex min-h-[680px] flex-col justify-center">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
