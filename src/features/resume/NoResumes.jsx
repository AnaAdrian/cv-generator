import { useState } from "react";
import Button from "../../ui/Button";

function NoResumes({ onClick }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className={`${!imageLoaded && "hidden"} flex flex-col items-center`}>
      <Button
        size="custom"
        className="w-full py-3 text-sm md:hidden"
        onClick={onClick}
      >
        + New Resume
      </Button>

      <img
        className="w-60"
        src="/avatar.png"
        alt="avatar"
        onLoad={handleImageLoad}
      />
      <div className="text-center">
        <h2 className="mb-2 text-lg font-bold">Your dynamic career profile</h2>
        <p className="max-w-lg font-thin">
          Professionally designed, effective resumes. Streamline your job hunt
          with ease!
        </p>
      </div>
      <Button className="my-5 hidden md:flex" onClick={onClick}>
        + New Resume
      </Button>
    </div>
  );
}

export default NoResumes;
