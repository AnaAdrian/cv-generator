import { Link } from "react-router-dom";

import CardActionsDropdown from "./CardActionsDropdown";
import EditableHeader from "../EditableHeader";
import MobileActionsDropdown from "./MobileActionsDropdown";
import { formatDateTime } from "../../../utils/helpers";
import { PiArrowFatDown } from "react-icons/pi";

function CardActions({ resume }) {
  return (
    <div className="flex flex-col text-sm md:text-base">
      <EditableHeader
        title={resume.title}
        id={resume.id}
        tableName="resumes"
        fieldName="title"
        editIconMobileVisible={false}
        showActionsOnEdit={false}
        className="flex"
      />
      <div className="cursor-default text-xs font-extralight text-gray-400">
        Updated {formatDateTime(resume.updated_at)}
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
        <div className="flex cursor-pointer items-center gap-3 font-light transition-all hover:text-blue-500">
          <PiArrowFatDown className="h-5 w-5 text-blue-500" /> Download PDF
        </div>
        <CardActionsDropdown resumeId={resume.id} />
        <MobileActionsDropdown resumeId={resume.id} />
      </div>
    </div>
  );
}

export default CardActions;
