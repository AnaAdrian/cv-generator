import toast, { Toaster } from "react-hot-toast";

export default function CustomToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 2000,
        },
        error: {
          duration: 3500,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  );
}

// eslint-disable-next-line
export const showToast = (message, type = "success") => {
  // Dismiss all existing toasts
  toast.dismiss();

  // Show the toast based on type
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    console.error("Invalid toast type", type);
  }
};
