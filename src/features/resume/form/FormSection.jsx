// import EditableHeader from "../EditableHeader";

function FormSection({ title, children }) {
  return (
    <div>
      {/* <EditableHeader
        title={title}
        showOnlyInput={true}
        variant="formSection"
      /> */}
      {children}
    </div>
  );
}

export default FormSection;
