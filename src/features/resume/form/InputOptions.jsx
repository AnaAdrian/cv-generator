import InputOption from "./InputOption";

function InputOptions({ options, inputValue, handleSelect }) {
  if (options.length === 0) return null;
  return (
    <ul className="shadow-options absolute left-0 right-0 z-10 -mt-1 rounded-b-sm bg-slate-100 duration-150 focus:outline-none">
      {options.map((option) => (
        <InputOption
          option={option}
          inputValue={inputValue}
          handleSelect={handleSelect}
          key={option?.name}
        />
      ))}
    </ul>
  );
}

export default InputOptions;
