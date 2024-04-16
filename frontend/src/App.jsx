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

const App = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const { isauth, setisauth, setuser } = useContext(Context);
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const res = axios.get(`${server}/api/v1/user/patient/me`, {
          withCredentials: true,
        });
        setisauth(true);
        setuser(res.data.user);
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
        <ToastContainer position="top-right" />
      </Router>
    </>
  );
};

export default App;
