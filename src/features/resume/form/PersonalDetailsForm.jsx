import { useEffect, useRef, useState } from "react";

import FormInput from "./FormInput";
import EditableHeader from "../EditableHeader";
import TooltipElement from "../../../ui/TooltipElement";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

function PersonalDetailsForm({ resumeData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateContentHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    updateContentHeight();
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const inputClass = "md:w-1/2";
  const rowClass =
    "flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-12 xl:space-x-10";

  return (
    <div className="mx-auto max-w-[800px] md:px-6 xl:px-4">
      <EditableHeader
        title={resumeData.section_titles[0] || "Personal Details"}
        defaultTitle={"Personal Details"}
        id={resumeData.id}
        tableName="resumes"
        fieldName=""
        className="flex gap-[2px]"
      >
        <EditableHeader.Input className="max-w-full text-base font-semibold md:text-xl" />
        <EditableHeader.Actions className="mt-1">
          <EditableHeader.Button type="rename">
            <TooltipElement
              tooltipText="Rename"
              tooltipAnimationVariant="delayed"
              tooltipStyleVariant="light"
            >
              <PiPencilSimpleBold className="h-4 w-4 animate-fadeIn cursor-pointer text-gray-400 transition-all hover:text-blue-500 md:h-5 md:w-5" />
            </TooltipElement>
          </EditableHeader.Button>
        </EditableHeader.Actions>
      </EditableHeader>

      <div className="my-4 space-y-3">
        <div className={rowClass}>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="first_name"
              value={resumeData.first_name}
            />
          </div>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="last_name"
              value={resumeData.last_name}
            />
          </div>
        </div>
        <div className={rowClass}>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="email"
              value={resumeData.email}
            />
          </div>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="phone"
              value={resumeData.phone}
            />
          </div>
        </div>
        <div className={rowClass}>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="country"
              value={resumeData.country}
            />
          </div>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="city"
              value={resumeData.city}
            />
          </div>
        </div>
        <div
          ref={contentRef}
          className={`my-4 space-y-3 overflow-hidden transition-all duration-200 ease-out`}
          style={{
            height: isExpanded ? `${contentHeight}px` : "0px",
            opacity: isExpanded ? 1 : 0,
          }}
        >
          <div className={rowClass}>
            <div className={inputClass}>
              <FormInput
                id={resumeData.id}
                tableName="resumes"
                fieldName="address"
                value={resumeData.address}
              />
            </div>
            <div className={inputClass}>
              <FormInput
                id={resumeData.id}
                tableName="resumes"
                fieldName="postal_code"
                value={resumeData.postal_code}
              />
            </div>
          </div>
          <div className={rowClass}>
            <div className={inputClass}>
              <FormInput
                id={resumeData.id}
                tableName="resumes"
                fieldName="driving_license"
                value={resumeData.driving_license}
              />
            </div>
            <div className={inputClass}>
              <FormInput
                id={resumeData.id}
                tableName="resumes"
                fieldName="nationality"
                value={resumeData.nationality}
              />
            </div>
          </div>
          <div className={rowClass}>
            <div className={inputClass}>
              <FormInput
                id={resumeData.id}
                tableName="resumes"
                fieldName="birth_place"
                value={resumeData.birth_place}
              />
            </div>
            <div className={inputClass}>
              <FormInput
                type="date"
                id={resumeData.id}
                tableName="resumes"
                fieldName="birth_date"
                value={resumeData.birth_date}
              />
            </div>
          </div>
        </div>

        <div className="flex cursor-pointer justify-start">
          <span
            onClick={toggleExpand}
            className="flex flex-row items-center gap-0.5 text-sm font-semibold text-blue-500 transition-all hover:text-blue-700"
          >
            {isExpanded ? "Hide additional details" : "Edit additional details"}
            {isExpanded ? (
              <MdKeyboardArrowUp className="h-6 w-6" />
            ) : (
              <MdKeyboardArrowDown className="h-6 w-6" />
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailsForm;
