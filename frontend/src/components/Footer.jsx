import { Link } from "react-router-dom";
import { FaPhone, FaLocationArrow } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00am - 12:00pm",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "9:00am - 12:00pm",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "9:00am - 12:00pm",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00am - 12:00pm",
    },
    {
      id: 5,
      day: "Friday",
      time: "9:00am - 12:00pm",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00am - 12:00pm",
    },
  ];

  return (
    <>
      <footer className="container">
        <hr />
        <div className="content">
          <div>
          <div style={{
            fontSize: "2.1rem",
            fontWeight: "bold",

          }} className="logo">Zeecare</div>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Hours</h4>
            {hours.map((element) => {
              return (
                <li key={element.id}>
                  <span>{element.day}</span>

                  <span>{element.time}</span>
                </li>
              );
            })}
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone/>
              
              <a href="tel:+91 9876543210">+91 9876543210</a>
            </div>
            
            <div>
              <MdEmail />
              <a href="mailto:info@example.com">info@example.com</a>
            </div>

            <div>
              <FaLocationArrow/>
              <span>Bikaner,Rajasthan</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
