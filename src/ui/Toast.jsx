import toast from "react-hot-toast";
import { MdCheckCircle, MdError, MdClose } from "react-icons/md";

// eslint-disable-next-line
export const showToast = (message, type = "success") => {
  const Icon = type === "error" ? MdError : MdCheckCircle;
  const iconColor = type === "error" ? "text-red-500" : "text-green-500";
  const ringColor = type === "error" ? "ring-red-500" : "ring-green-500";

  toast.custom(
    (t) => (
      <div
        className={`flex  max-w-md rounded-lg bg-white shadow-md ring-1 ${ringColor} ring-opacity-10 ${t.visible ? "animate-fadeIn" : "animate-fadeOut"}`}
      >
        {/* Icon and message container */}
        <div className="flex items-center gap-1.5 px-5 py-4">
          <Icon className={`${iconColor}`} size={24} />
          <span className="flex-1 text-black">{message}</span>{" "}
        </div>

        {/* Close button and border */}
        <button
          className={`flex items-center rounded-r-lg border-l border-gray-200 p-2 text-gray-500 focus:ring-2 ${type === "error" ? "focus:ring-red-500" : "focus:ring-green-500"}`}
          onClick={() => toast.dismiss(t.id)}
        >
          <MdClose size={20} />
        </button>
      </div>
    ),
    { id: "my-app-toast" },
  );
};
