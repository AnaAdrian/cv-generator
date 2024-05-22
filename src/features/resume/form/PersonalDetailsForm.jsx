import { useEffect, useRef, useState } from "react";

import FormInput from "./FormInput";
import EditableHeader from "../EditableHeader";
import TooltipElement from "../../../ui/TooltipElement";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaUndo } from "react-icons/fa";
import { useResize } from "../../../hooks/useResize";

function PersonalDetailsForm({ resumeData, width }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const isMobile = useResize(768);
  const contentRef = useRef(null);

  useEffect(() => {
    const updateContentHeight = () => {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      });
    };
    updateContentHeight();
  }, [isExpanded, contentRef, isMobile]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const inputClass = "md:w-1/2";
  const rowClass =
    "flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-12";

  return (
    <>
      <EditableHeader
        id={resumeData.id}
        defaultTitle="Personal Details"
        title={resumeData.section_titles?.profile || "Personal Details"}
        tableName="resumes"
        fieldName="section_titles"
        sectionTitle="profile"
        currentSectionsTitles={resumeData.section_titles}
        className="mb-4"
        width={width}
      >
        <EditableHeader.Input className="text-sm font-semibold md:text-lg" />
        <EditableHeader.Actions className="mt-[1px] md:mt-[2px]">
          <EditableHeader.Button type="rename">
            <TooltipElement
              tooltipText="Rename"
              tooltipAnimationVariant="delayed"
              tooltipStyleVariant="light"
            >
              <PiPencilSimpleBold className="h-4 w-4 cursor-pointer text-gray-400 transition-colors hover:text-blue-500 md:h-5 md:w-5" />
            </TooltipElement>
          </EditableHeader.Button>
          <EditableHeader.Button type="revert">
            <TooltipElement
              tooltipText="Revert Section Name"
              tooltipAnimationVariant="delayed"
              tooltipStyleVariant="light"
            >
              <FaUndo className="ml-0.5 mt-[2px] h-3 w-3 cursor-pointer text-gray-400 transition-colors hover:text-blue-500 md:h-4 md:w-4" />
            </TooltipElement>
          </EditableHeader.Button>
        </EditableHeader.Actions>
      </EditableHeader>

      <div className="space-y-3">
        <div className="space-y-3">
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
        </div>
        <div
          ref={contentRef}
          className={`space-y-3 overflow-hidden transition-all duration-200 ease-out will-change-transform`}
          style={{
            maxHeight: isExpanded ? `${contentHeight}px` : "0px",
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
    </>
  );
}

export default PersonalDetailsForm;
