import { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import s from  "./sidebar.module.css"; // Import Sidebar-specific styles

const Sidebar = () => {
  const [show, setshow] = useState(true);
  const { adminauth, setadminauth } = useContext(Context);

  const navigate = useNavigate();
  const location = useLocation(); // Get location


  const gotoHome = () => {
    navigate("/dashboard");
    setshow(!show);
  };
  const gotodoctors = () => {
    navigate("/doctors");
    setshow(!show);
  };
  const gotomessages = () => {
    navigate("/messages");
    setshow(!show);
  };
  const gotoadddoctor = () => {
    navigate("/admin/adddoctor");
    setshow(!show);
  };
  // const gotoadminlogin = () => {
  //   navigate("/admin/login");
  //   setshow(!show);
  // };

  const handlelogout = async () => {
    try {
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) {
        throw new Error("Token not found");
      }
      localStorage.removeItem("admintoken");
      setadminauth(false);

      toast.success("Logout Successfull");
      navigate("/admin/login");
    } catch (error) {
      console.log(error);
    }
  };


  const shouldShowSidebar =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/messages");



  return (
    <>
      <nav
        style={!shouldShowSidebar ? { display: "none" } : { display: "flex" }} // Update style condition
        className={show ? `${s.show} ${s.sidebar}` : s.sidebar}
      >
        <div className={s.links}>
          <TiHome onClick={gotoHome} />
          <AiFillMessage onClick={gotomessages} />
          <FaUserDoctor onClick={gotodoctors} />
          <IoPersonAddSharp onClick={gotoadddoctor} />
          <RiLogoutBoxFill onClick={handlelogout} />
        </div>
      </nav>
      <div
        className={s.wrapper}
        style={!shouldShowSidebar ? { display: "none" } : { display: "flex" }} // Update style condition
      >
        <GiHamburgerMenu className={s.hamburger} onClick={() => setshow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
