import { useNavigate } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md"; // Import an icon
import Button from "../ui/Button"; // Assuming you have a Button component

function PageNotFound() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1); // Navigate back

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <MdErrorOutline size="5rem" className="text-red-500" /> {/* Icon */}
      <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
      <p className="mb-4">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button variant="back" onClick={goBack}>
        Back
      </Button>{" "}
      {/* Back Button */}
    </div>
  );
}

export default PageNotFound;
