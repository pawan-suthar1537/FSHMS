import { useContext, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, Navigate, useNavigate } from "react-router-dom";
import s from  "./sidebar.module.css"; // Import Sidebar-specific styles


const adminlogin = () => {
  const { adminauth, setadminauth } = useContext(Context);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const server = import.meta.env.VITE_REACT_APP_HOST;

  const navigate = useNavigate();


  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        { email, password, role: "admin" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("patienttoken", response.data.token);
      // save admin token 
      localStorage.setItem("admintoken", response.data.token);
      toast.success(response.data.message);
      setadminauth(true);
      navigate("/dashboard");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };


  if (adminauth) {
    return <Navigate to={"/dashboard"} />;
  }


  return (
    <div className={`${s.container} ${s["form-component"]}`}>
      <img src="/logo.png" className={s.logo} alt="Logo" />
      <h1 className={s["form-title"]}>Welcome admin</h1>
      <form onSubmit={handlelogin}>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="password"
        />
        <div className={s["form-button-container"]}>
          <button style={{cursor:"pointer"}} type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default adminlogin