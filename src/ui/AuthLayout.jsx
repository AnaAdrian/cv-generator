import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import HomeButton from "./HomeButton";

function AuthLayout() {
  const { pathname } = useLocation();
  return (
    <>
      <Header>
        {pathname.includes("reset-password") ? "" : <HomeButton />}
      </Header>

      <div className="my-10 flex justify-center">
        <div className="w-full max-w-[410px]">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
