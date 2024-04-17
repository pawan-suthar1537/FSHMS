import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [dob, setdob] = useState("");
  const [nic, setnic] = useState("");
  const [gender, setgender] = useState("");
  const [appointment_date, setappointment_date] = useState("");
  const [department, setdepartment] = useState("");
  const [doctor_firstname, setdoctor_firstname] = useState("");
  const [doctor_lastname, setdoctor_lastname] = useState("");
  const [address, setaddress] = useState("");
  const [isvisited, setisvisited] = useState("");
  const [doctor, setdoctor] = useState([]);

  const navigate = useNavigate()

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

  useEffect(() => {
    

    const fetchdoc = async () => {
      const { data } = await axios.get(`${server}/api/v1/user/doctors`, {
        withCredentials: true,
      });
      setdoctor(data.doctors);
    };
    fetchdoc();
  }, []);

  const handleappointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("patienttoken");
      const hasvisitedbool = Boolean(isvisited);
      const res = await  axios.post(`${server}/api/v1/appointment/makeappoinement`,{
        firstname,
        lastname,
        email,
        phone,
        dob,
        nic,
        gender,
        appointment_date,
        department,
        doctor_firstname,
        doctor_lastname,
        address,
        isvisited:hasvisitedbool,
      },{
        withCredentials:true,
        headers:{
          Authorization:`Bearer ${token}`,
          "Content-Type":"application/json"
        } 
      })
      console.log(res.data);
    
    // Show a toast message for success
    toast.success(res.data.message);
      navigate("/");
      
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment Form</h2>

        <form onSubmit={handleappointment}>
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
              type="date"
              placeholder="appointment date"
              value={appointment_date}
              onChange={(e) => setappointment_date(e.target.value)}
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => {
                setdepartment(e.target.value);
                setdoctor_firstname("");
                setdoctor_lastname("");
              }}
            >
              {DepartMentarrya.map((department, index) => (
                <option value={department} key={index}>
                  {department}
                </option>
              ))}
            </select>
            <select
              value={`${doctor_firstname} ${doctor_lastname}`}
              onChange={(e) => {
                const [firstname, lastname] = e.target.value.split(" ");
                setdoctor_firstname(firstname);
                setdoctor_lastname(lastname);
              }}
              disabled={!department}
            >
              <option value="">Select Doctor</option>
              {doctor
                .filter((doctor) => doctor.docdepartment === department)
                .map((doctor, index) => {
                  return (
                    <option
                      value={`${doctor.firstname} ${doctor.lastname}`}
                      key={index}
                    >
                      {doctor.firstname} {doctor.lastname}
                    </option>
                  );
                })}
            </select>
          </div>
          <textarea
            placeholder="address"
            rows={10}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />

          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Have you visited before ?</p>
            {/* <Link
              to={"/login"}
              style={{ textDecoration: "none", alignItems: "center" }}
            >
              Login now
            </Link> */}
            <input
              type="checkbox"
              checked={isvisited}
              onChange={(e) => setisvisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <div
            className=""
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <button type="submit" style={{ cursor: "pointer" }}>
              Get an Appointment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
