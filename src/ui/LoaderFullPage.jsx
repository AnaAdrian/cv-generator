import Loader from "./Loader"; // Import your existing Loader component

function LoaderFullPage({ size, color }) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-white">
      <Loader size={size} color={color} />
    </div>
  );
}

LoaderFullPage.defaultProps = {
  size: "md",
  color: "primary",
};

export default LoaderFullPage;
