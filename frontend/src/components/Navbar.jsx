import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../main";
import { toast } from "react-toastify";
import {GiHamburgerMenu} from "react-icons/gi"

const Navbar = () => {
  const [show, setshow] = useState(false);
  const { isauth, setisauth } = useContext(Context);
  const navigate = useNavigate();

  const handlelogout = async () => {
    try {
      localStorage.removeItem("patienttoken");
      setisauth(false);
      toast.success("Logout Successfull");
    } catch (error) {
      console.log(error);
    }
  };

  const gotologin = () => {
    navigate("/login");
  };

  return (
    <nav className="container">
      <div className="logo">Zeecare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>HOME</Link>
          <Link to={"/appointment"}>APPOINTMENT</Link>
          <Link to={"about"}>ABOUTUS</Link>
        </div>
      

      {isauth ? (
        <button className="logoutBtn btn" onClick={handlelogout}>
          LOGOUT
        </button>
      ) : (
        <button className="logoutBtn btn" onClick={gotologin}>
          LOGIN
        </button>
      )}
      </div>
      <div className="hamburger" onClick={()=>setshow(!show)} >
        <GiHamburgerMenu/>

      </div>
    </nav>
  );
};

export default Navbar;
