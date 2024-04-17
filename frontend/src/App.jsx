import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const App = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const { isauth, setisauth, setuser } = useContext(Context);

  // console.log("app.js 22", token)

  useEffect(() => {
    const fetchuser = async () => {
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
            console.log("patientdetailsafterloginbytoken",res.data.data);
            setuser(res.data.data);
        } catch (error) {
            console.log(error.message);
            setisauth(false);
            setuser({});
        }
    };
    fetchuser();
}, [isauth]);


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appoinement />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer/>
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
};

export default App;
