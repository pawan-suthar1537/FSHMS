import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import s from "./sidebar.module.css"; // Import Sidebar-specific styles

const Doctors = () => {
  const [doctor, setdoctor] = useState([]);
  const { adminauth } = useContext(Context);

  const server = import.meta.env.VITE_REACT_APP_HOST;

  useEffect(() => {
    const fetchdoc = async () => {
      try {
        const res = await axios.get(`${server}/api/v1/user/doctors`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res.data.doctors);
        setdoctor(res.data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchdoc();
  }, []);

  if (!adminauth) {
    return <Navigate to={"/admin/login"} />;
  }

  return (
    <>
      <section className={`${s.page} ${s.doctors}`}>
        <h1>Doctors</h1>
        <div className={s.banner}></div>
        {doctor && doctor.length > 0 ? (
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}
          >
            {doctor.map((ele, index) => {
              return (
                <div
                  key={index}
                  className={s.card}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <img
                    style={{ height: "100px", width: "100px", borderRadius: "50%" }}
                    src={ele.docprofile}
                    alt="doctor"
                    loading="lazy"
                  />

                  <div className={s.details} style={{marginTop: "10px"}}>
                    <p>{`${ele.firstname} ${ele.lastname}`}</p>
                    <p>
                      Email: <span>{ele.email}</span>{" "}
                    </p>
                    <p>
                      Phone: <span>{ele.phone}</span>{" "}
                    </p>
                    <p>
                      Nic: <span>{ele.nic}</span>{" "}
                    </p>
                    <p>
                      DOB: <span>{ele.dob}</span>{" "}
                    </p>
                    <p>
                      Gender: <span>{ele.gender}</span>{" "}
                    </p>
                    <p>
                      docdepartment: <span>{ele.docdepartment}</span>{" "}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>No Doctors</h1>
        )}
      </section>
    </>
  );
};

export default Doctors;
