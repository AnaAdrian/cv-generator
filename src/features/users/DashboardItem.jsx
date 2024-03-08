import { Link } from "react-router-dom";

import { PiHouse } from "react-icons/pi";

function DashboardItem() {
  return (
    <Link className="group flex items-center gap-3" to="/app">
      <PiHouse className="h-6 w-6 text-blue-500 transition-all" />
      <div className="flex flex-col">
        <p className="transition-all group-hover:text-blue-500">Dashboard</p>
        <p className="text-xs text-gray-500">Back to your resumes</p>
      </div>
    </Link>
  );
}

export default DashboardItem;
