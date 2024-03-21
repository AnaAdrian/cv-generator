import { useNavigate } from "react-router-dom";

import { MdMarkEmailRead } from "react-icons/md";
import Button from "../../ui/Button";

function ActionSuccessMessage({ title, text, onCloseModal, navigateTo }) {
  const navigate = useNavigate();

  function handleModalClose() {
    onCloseModal();
    navigateTo && navigate(navigateTo, { replace: true });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 text-center">
      <MdMarkEmailRead className="text-6xl text-slate-700" />
      <h2 className="text-xl font-bold text-gray-800 md:text-2xl">{title}</h2>
      <p className="max-w-lg text-sm font-thin text-gray-600 md:text-base">
        {text}
      </p>
      <Button
        variant="back"
        className="mt-3 text-base "
        onClick={handleModalClose}
      >
        Got it
      </Button>
    </div>
  );
}

export default ActionSuccessMessage;
