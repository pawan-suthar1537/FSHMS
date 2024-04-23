import { useContext, useState } from "react";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import s from "./sidebar.module.css"; // Import Sidebar-specific styles

const AddnewDoctor = () => {
  const { adminauth, setadminauth } = useContext(Context);

  const server = import.meta.env.VITE_REACT_APP_HOST;

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [gender, setgender] = useState("");
  const [dob, setdob] = useState("");
  const [nic, setnic] = useState("");
  const [docdepartment, setdocdepartment] = useState("");
  const [docprofile, setdocprofile] = useState("");
  const [docprofilepreview, setdocprofilepreview] = useState("");

  const navigate = useNavigate();

  const DepartMentarrya = [
    "cardio",
    "bone",
    "neurology",
    "dermatology",
    "orthopedics",
    "gynaecology",
    "gastroenterology",
    "urology",
    "endocrinology",
  ];

  const handlepic = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setdocprofilepreview(reader.result);
      setdocprofile(file);
    };
  };

  const handleadddoctor = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admintoken");
      const formdata = new FormData();
      formdata.append("firstname", firstname);
      formdata.append("lastname", lastname);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("dob", dob);
      formdata.append("nic", nic);
      formdata.append("gender", gender);
      formdata.append("password", password);
      formdata.append("docprofile", docprofile);
      formdata.append("docdepartment", docdepartment);

      const response = await axios.post(
        `${server}/api/v1/user/doctor/add`,
        formdata,
        {
          withCredentials: true,

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("patienttoken", response.data.token);
      // localStorage.setItem("patienttoken", response.data.token);
      toast.success(response.data.message);
      // setadminauth(true);
      navigate("/doctors");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);
    }
  };

  if (!adminauth) {
    navigate("/admin/login");
  }

  return (
    <section className={s.page}>
      <div className={`container form-component ${s["add-doctor-form"]}`}>
        <h2 className="form-title">Add New Doctor</h2>

        <form onSubmit={handleadddoctor}>
          <div className={s["first-wrapper"]}>
            <img
              src={docprofilepreview ? `${docprofilepreview}` : "./broken.png"}
            />
          </div>
          <input type="file" onChange={handlepic} />
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
            <select value={gender} onChange={(e) => setgender(e.target.value)}>
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

            <div>
              <select
                value={docdepartment}
                onChange={(e) => setdocdepartment(e.target.value)}
              >
                <option value="">select department</option>
                {DepartMentarrya.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            className=""
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <button type="submit" style={{ cursor: "pointer" }}>
              ADD DOCTOR
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddnewDoctor;
