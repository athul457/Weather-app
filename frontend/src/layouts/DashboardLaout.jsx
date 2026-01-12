import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import DashboardNavbar from "../components/layout/DashboardNavbar";

function DashboardLaout() {
  return (
    <div className="flex">
      <Sidebar />

      {/* Push content right by sidebar width */}
      <div className="w-[1300px] ml-64  min-h-screen bg-gray-100 p-6">
        <DashboardNavbar />
        <Outlet />
      </div>
    </div>
  );
}
export default DashboardLaout;
