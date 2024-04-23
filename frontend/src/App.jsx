import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Appoinement from "./pages/Appoinement";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import axios from "axios";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import AdminLogin from "./components/AdminLogin";
import AddnewDoctor from "./components/AddnewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";

const App = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const { isauth, setisauth, setuser, setadminauth, setadmin, admin } =
    useContext(Context);

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem("patienttoken");
      if (!token) {
        setisauth(false);
        setuser({});
        return;
      }

      try {
        const res = await axios.get(`${server}/api/v1/user/patient/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setisauth(true);
        console.log("patientdetailsafterloginbytoken", res.data.data);
        setuser(res.data.data);
      } catch (error) {
        console.log(error.message);
        setisauth(false);
        setuser({});
      }
    };

    const fetchAdmin = async () => {
      const admintoken = localStorage.getItem("admintoken");
      if (!admintoken) return;

      try {
        const adminres = await axios.get(`${server}/api/v1/user/admin/me`, {
          headers: {
            Authorization: `Bearer ${admintoken}`,
          },
          withCredentials: true,
        });
        setadminauth(true);
        console.log("admindetailsafterloginbytoken", adminres.data.data);
        setadmin(adminres.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAdmin();
    fetchPatient();
  }, []);

  const isDashboardRoute =
    location.pathname.includes("/dashboard") ||
    location.pathname.includes("/admin");

  return (
    <>
      <Router>
        {/* Conditionally render Navbar */}
        {!isDashboardRoute && <Navbar />}

        <Routes>
          {/* User routes */}
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appoinement />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Admin route */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/adddoctor" element={<AddnewDoctor />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/doctors" element={<Doctors />} />
        </Routes>

        {/* Conditionally render Footer */}
        {!isDashboardRoute && <Footer />}

        <ToastContainer position="top-right" />
      </Router>
    </>
  );
};

export default App;
