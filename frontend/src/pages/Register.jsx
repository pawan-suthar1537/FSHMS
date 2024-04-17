import { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {

  const server = import.meta.env.VITE_REACT_APP_HOST;

  const { isauth, setisauth } = useContext(Context);

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [dob, setdob] = useState("");
  const [nic, setnic] = useState("");
  const [gender, setgender] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleregister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${server}/api/v1/user/patient/register`,
        { firstname, lastname, email, phone, dob, nic, gender, password, role:"patient" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      // console.log("patienttoken", response.data.token);
      // localStorage.setItem("patienttoken", response.data.token);
      toast.success(response.data.message);
      setisauth(true);
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  if (isauth) {
    navigate("/");
  }

  return (
    <div className="container form-component register-form">
      <h2>Sign Up</h2>
      <p>Please Sign Up To Continue</p>
      
      <form onSubmit={handleregister}>
        <div>
        <input
          type="text"
          placeholder="Enter First Name"
          value={firstname}
          onChange={(e) => setfirstname(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Last Name"
          value={lastname}
          onChange={(e) => setlastname(e.target.value)}
        />
        </div>

        <div>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="phone"
          placeholder="Enter phone"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
        />
        </div>
        <div>
        <input
          type="number"
          placeholder="Enter NIC"
          value={nic}
          onChange={(e) => setnic(e.target.value)}
        />
        <input
          type="date"
          placeholder="Enter DOB"
          value={dob}
          onChange={(e) => setdob(e.target.value)}
        />
        </div>
        <div>
        <select value={gender} onChange={(e)=>setgender(e.target.value)}>
          <option value="">select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        </div>
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Already register?</p>
          <Link
            to={"/login"}
            style={{ textDecoration: "none", alignItems: "center" }}
          >
            Login now
          </Link>
        </div>
        <div
          className=""
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <button type="submit" style={{ cursor: "pointer" }}>
            Register
          </button>
        </div>
        
        
      </form>
    </div>
  );
};

export default Register;
