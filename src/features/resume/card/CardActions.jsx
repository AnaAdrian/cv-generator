import { Link } from "react-router-dom";

import { PiPencilSimpleBold, PiArrowFatDown } from "react-icons/pi";

import CardActionsButton from "./CardActionsButton";
import CardActionsDropdown from "./CardActionsDropdown";
import { formatDateTime } from "../../../utils/helpers";

function CardActions({ resume }) {
  return (
    <div className="flex flex-col text-sm md:text-base">
      <div className="flex flex-col gap-1">
        <div className="group flex items-center gap-1">
          <Link
            to={`/app/resumes/${resume.id}/edit`}
            className="text-md font-normal text-gray-800 hover:text-blue-500 md:text-xl"
          >
            {resume.title}
          </Link>
          <PiPencilSimpleBold className="mb-0.5 hidden h-5 w-5 cursor-pointer text-gray-400 hover:text-blue-500 md:group-hover:inline" />
        </div>
        <div className="max-w-[240px] cursor-default text-xs font-extralight text-gray-400">
          Updated {formatDateTime(resume.updated_at)}
        </div>
      </div>
      <Link to={`/app/resumes/${resume.id}/edit`}>
        <div className="my-4 inline-flex items-center gap-2 rounded-md bg-[#F7F9FC] p-2 font-normal hover:bg-[#EAF6FF]">
          <div className="rounded-md bg-rose-400 px-1 py-0.5 text-xs text-white">
            {resume.score}%
          </div>
          <div className="text-xs text-gray-600 md:text-sm">Resume score</div>
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <CardActionsButton>
          <PiArrowFatDown className="h-5 w-5 text-blue-500" />
          Download PDF
        </CardActionsButton>
        <CardActionsDropdown resumeId={resume.id} />
      </div>
    </div>
  );
}

export default CardActions;
