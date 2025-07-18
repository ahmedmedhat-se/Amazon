import { Outlet } from "react-router-dom";
import Navbar from "../main/Navbar.jsx";
import Footer from "../main/Footer.jsx";

function MainLayout() {
  return (
    <>
        <Navbar />
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout;