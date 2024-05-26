import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import EditableHeader from "../EditableHeader";
import TooltipElement from "../../../ui/TooltipElement";
import { PiPencilSimpleBold } from "react-icons/pi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import { SlQuestion } from "react-icons/sl";
import { FaUndo } from "react-icons/fa";
import { useResize } from "../../../hooks/useResize";

function PersonalDetailsForm({ resumeData, width }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [overflowVisible, setOverflowVisible] = useState(false);
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

  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setOverflowVisible(true);
      }, 300);
    } else {
      setOverflowVisible(false);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const inputClass = "md:w-1/2";
  const rowClass =
    "flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-12";

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
              <PiPencilSimpleBold className="h-4 w-4 cursor-pointer text-gray-400 hover:text-blue-500 md:h-5 md:w-5" />
            </TooltipElement>
          </EditableHeader.Button>
          <EditableHeader.Button type="revert">
            <TooltipElement
              tooltipText="Revert Section Name"
              tooltipAnimationVariant="delayed"
              tooltipStyleVariant="light"
            >
              <FaUndo className="ml-0.5 mt-[2px] h-3 w-3 cursor-pointer text-gray-400 hover:text-blue-500 md:h-4 md:w-4" />
            </TooltipElement>
          </EditableHeader.Button>
        </EditableHeader.Actions>
      </EditableHeader>
      <div className="mb-6 space-y-6">
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
        className={`space-y-6 duration-200`}
        style={{
          maxHeight: isExpanded ? `${contentHeight}px` : "0px",
          opacity: isExpanded ? 1 : 0,
          overflow: overflowVisible ? "visible" : "hidden",
          marginBottom: isExpanded ? "24px" : "0",
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
              labelTooltip={
                <TooltipElement
                  tooltipStyleVariant="info"
                  tooltipText="Include this section if your profession requires a certain type of license. If not, leave it blank."
                  width="180px"
                >
                  <SlQuestion className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-800" />
                </TooltipElement>
              }
            />
          </div>
          <div className={inputClass}>
            <FormInput
              id={resumeData.id}
              tableName="resumes"
              fieldName="nationality"
              value={resumeData.nationality}
              labelTooltip={
                <TooltipElement
                  tooltipStyleVariant="info"
                  tooltipText="Include your nationality only if it's relevant to your position. In most cases, leave this blank."
                  width="180px"
                >
                  <SlQuestion className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-800" />
                </TooltipElement>
              }
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
              labelTooltip={
                <TooltipElement
                  tooltipStyleVariant="info"
                  tooltipText=" Add your date of birth only if it is a relevant requirement for your position. In most cases, leave this blank."
                  width="180px"
                >
                  <SlQuestion className="h-4 w-4 cursor-pointer text-blue-500 hover:text-blue-800" />
                </TooltipElement>
              }
            />
          </div>
        </div>
      </div>
      <div className="flex cursor-pointer justify-start">
        <span
          onClick={toggleExpand}
          className="flex flex-row items-center gap-0.5 text-xs font-semibold text-blue-500 transition-all hover:text-blue-700 md:text-sm"
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
