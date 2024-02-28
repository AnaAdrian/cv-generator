function AuthPageTitle({title, text}) {
  return (
    <div className="mb-10 flex flex-col gap-4 text-center">
      <h1 className="text-[32px] font-bold text-gray-800 md:text-[40px]">
        {title}
      </h1>
      <p className="text-sm font-light text-gray-500 md:text-base">
        {text}
      </p>
    </div>
  );
}

export default AuthPageTitle;
