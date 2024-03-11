import { Link } from "react-router-dom";

import { PiHouse } from "react-icons/pi";

function DashboardItem() {
  return (
    <Link className="group flex items-center gap-3" to="/app">
      <PiHouse className="h-6 w-6 text-blue-500 transition-all" />
      <div className="flex flex-col">
        <p className="text-sm transition-all group-hover:text-blue-500 md:text-base">
          Dashboard
        </p>
        <p className="text-xs font-thin text-gray-400">Back to your resumes</p>
      </div>
    </Link>
  );
}

export default DashboardItem;
