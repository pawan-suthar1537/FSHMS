import { useState } from "react";
import axios from "axios";
import {toast} from 'react-toastify'

const MessageForm = () => {
  const server = import.meta.env.VITE_REACT_APP_HOST;

  const [firstname, setfirstname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [message, setmessage] = useState("");

  const handlemessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${server}/api/v1/message/send`,
        { phone, email, message, firstname },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(res=>{
        toast.success(res.data.message)
        setfirstname("")
        setemail("")
        setphone("")
        setmessage("")
      });
    } catch (error) {
      
      
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="container form-component message-form">
      <h2>Send us a Message</h2>
      <form onSubmit={handlemessage}>
        <div>
          <input
            type="text"
            placeholder="name"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="number"
            placeholder="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </div>
        <textarea
          rows={7}
          placeholder="Message"
          value={message}
          onChange={(e) => setmessage(e.target.value)}
        ></textarea>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            style={{
              cursor: "pointer",
            }}
            type="submit"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
