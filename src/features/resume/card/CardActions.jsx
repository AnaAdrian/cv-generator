import { Link } from "react-router-dom";

import { PiPencilSimpleBold, PiArrowFatDown } from "react-icons/pi";

import CardActionsButton from "./CardActionsButton";
import CardActionsDropdown from "./CardActionsDropdown";

function CardActions({ cardData }) {
  return (
    <>
      <div className="flex flex-col gap-0.5">
        <div className="group/link flex items-center gap-1">
          <Link
            to={`/app/resumes/${cardData.id}/edit`}
            className="text-md font-normal text-gray-800 hover:text-blue-500 md:text-xl"
          >
            {cardData.name}
          </Link>
          <PiPencilSimpleBold className="mb-0.5 hidden h-5 w-5 cursor-pointer text-gray-400 hover:text-blue-500 md:group-hover/link:inline" />
        </div>
        <div className="max-w-[240px] cursor-default text-xs font-extralight text-gray-400 ">
          Updated {cardData.updated_at}
        </div>
      </div>
      <Link to={`/app/resumes/${cardData.id}/edit`}>
        <div className="my-5 inline-flex items-center gap-2 rounded-md bg-[#F7F9FC] p-2 font-normal hover:bg-[#EAF6FF]">
          <div className="rounded-md bg-rose-400 px-1 py-0.5 text-xs text-white">
            {cardData.resume_score}%
          </div>
          <div className="text-xs text-gray-600 md:text-sm">Resume score</div>
        </div>
      </Link>
      <div className="flex flex-col gap-2.5 text-sm md:text-base  ">
        <CardActionsButton Icon={PiArrowFatDown}>
          Download PDF
        </CardActionsButton>
        <CardActionsDropdown cardData={cardData} />
      </div>
    </>
  );
}

export default CardActions;
