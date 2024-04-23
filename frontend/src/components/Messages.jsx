import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import s from "./sidebar.module.css"; // Import Sidebar-specific styles
import { Link } from "react-router-dom";

const Messages = () => {
  const [messages, setmessages] = useState([]);
  const { adminauth, setadminauth } = useContext(Context);

  const server = import.meta.env.VITE_REACT_APP_HOST;

  useEffect(() => {
    const fetchmsg = async () => {
      try {
        const token = localStorage.getItem("admintoken");
        const res = await axios.get(`${server}/api/v1/message/getmsg`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res.data.messages);
        setmessages(res.data.messages);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchmsg();
  }, []);

  if (!adminauth) {
    return <Navigate to={"/admin/login"} />;
  }
  

  return (
    <>
      

      <section className={`${s.page} ${s.messages}`}>
        <h1>MESSAGES</h1>
        <div className={s.banner}>
          {messages && messages.length > 0 ? (
            messages.map((element, index) => {
              return (
                <div className={s.card} key={index}>
                  <div className={s.details}>
                    <p>
                      First name: <span>{element.firstname}</span>
                    </p>
                    <p>
                      email: <span>{element.email}</span>
                    </p>
                    <p>
                      phone: <span>{element.phone}</span>
                    </p>
                    <p>
                      Message: <span>{element.message}</span>
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <h1>no messages</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Messages;
