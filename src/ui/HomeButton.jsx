import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <button className="" onClick={() => navigate("/")}>
      <MdClose className="text-gray-600 hover:text-blue-600" size="24px" />
    </button>
  );
}

export default HomeButton;
