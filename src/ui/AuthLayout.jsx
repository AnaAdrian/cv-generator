import Header from "./Header";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Container that fills remaining space and centers its children */}
      <div className="flex flex-1 items-center justify-center p-5">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
