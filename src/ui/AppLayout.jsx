import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import MainDropdown from "./MainDropdown/MainDropdown";

function AppLayout() {
  const { pathname } = useLocation();
  const isEditingFormPage = pathname.includes("edit");

  return (
    <div className="flex flex-col items-center p-5 md:p-0">
      {!isEditingFormPage && (
        <div className="w-full md:max-w-6xl">
          <Header className="border-b">
            <MainDropdown />
          </Header>
        </div>
      )}

      {isEditingFormPage && (
        <div className="absolute right-0 top-0 m-4">
          <MainDropdown />
        </div>
      )}

      <div className={`w-full ${isEditingFormPage ? "" : "md:max-w-6xl"}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default AppLayout;
