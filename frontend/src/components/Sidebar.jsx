import { useContext, useState } from "react";
import { Context } from "../main";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import s from  "./sidebar.module.css"; // Import Sidebar-specific styles

const Sidebar = () => {
  const [show, setshow] = useState(true);
  const { adminauth, setadminauth } = useContext(Context);

  const navigate = useNavigate();

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav
        style={!adminauth ? { display: "none" } : { display: "flex" }}
        className={show ? `${s.show} ${s.sidebar}` : s.sidebar}
      >
        <div className={s.links}>
          <TiHome onClick={gotoHome}  />
          <AiFillMessage onClick={gotomessages} />
          <FaUserDoctor onClick={gotodoctors} />
          <IoPersonAddSharp onClick={gotoadddoctor} />
          <RiLogoutBoxFill onClick={handlelogout} />
        </div>
      </nav>
      <div className={s.wrapper} style={!adminauth ? { display: "none" } : { display: "flex" }}>
        <GiHamburgerMenu className={s.hamburger} onClick={() => setshow(!show)} />
      </div>
    </>
  );
};

export default Sidebar;
