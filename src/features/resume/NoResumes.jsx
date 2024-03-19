import { useState } from "react";

function NoResumes() {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <img
        className="w-60"
        src="/avatar.jpg"
        alt="avatar"
        onLoad={handleImageLoad}
      />
      <div className={`text-center ${!imageLoaded && "hidden"}`}>
        <h2 className="mb-2 text-lg font-bold">Your dynamic career profile</h2>
        <p className="max-w-lg font-thin">
          Professionally designed, effective resumes. Streamline your job hunt
          with ease!
        </p>
      </div>
    </>
  );
}

export default NoResumes;
