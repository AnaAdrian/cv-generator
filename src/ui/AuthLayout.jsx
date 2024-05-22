import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import HomeButton from "./HomeButton";

function AuthLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header className="p-5">
        {pathname.includes("reset-password") ? "" : <HomeButton />}
      </Header>

      <div className="pointer-events-none fixed inset-0 flex flex-col">
        <div className="pointer-events-auto m-auto w-full max-w-md rounded-lg p-8 shadow-none md:shadow-lg">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
