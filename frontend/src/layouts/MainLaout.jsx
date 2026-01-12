import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
function MainLaout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default MainLaout;
