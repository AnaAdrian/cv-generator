function Input({ type, placeholder, value, onChange }) {
  return (
    <div className="group mb-4">
      <label
        htmlFor={`input-${placeholder}`}
        className="block text-sm font-light text-gray-400"
      >
        {placeholder}
      </label>
      <div className="relative mt-1">
        <input
          type={type}
          id={`input-${placeholder}`}
          value={value}
          onChange={onChange}
          className="relative w-full bg-slate-50 px-3 py-3 font-medium text-gray-700 focus:outline-none"
        />
        <div className="absolute bottom-0 left-0 h-0.5 w-full bg-transparent">
          <div className="absolute bottom-0 h-0.5 w-0 bg-sky-500 transition-all duration-75 group-focus-within:w-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Input;
