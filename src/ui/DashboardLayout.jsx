function DashboardLayout({ children }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-6xl">{children}</div>
    </div>
  );
}

export default DashboardLayout;
