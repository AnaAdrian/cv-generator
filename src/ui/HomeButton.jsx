import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <MdClose
      className="text-gray-400 transition-all hover:text-blue-600"
      size="26px"
      onClick={() => navigate("/")}
    />
  );
}

export default HomeButton;
