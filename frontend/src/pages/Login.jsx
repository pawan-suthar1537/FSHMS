import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const { isauth, setisauth } = useContext(Context);

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/api/v1/user/login`,
        { email, password, role: "patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("patienttoken", response.data.token);
      localStorage.setItem("patienttoken", response.data.token);
      toast.success(response.data.message);
      setisauth(true);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };


  if (isauth) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container form-component login-form">
      <h2>Sign In</h2>
      
      <p>
      Welcome Back! Please sign in to your account
      </p>
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
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>not register?</p>
          <Link
            to={"/register"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Sign Up
          </Link>
        </div>
        <div
          className=""
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <button type="submit" style={{ cursor: "pointer" }}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
