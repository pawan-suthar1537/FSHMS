import Biography from "../components/Biography";
import Hero from "../components/Hero";

const About = () => {
  return (
    <>
      <div style={{marginTop:"20px"}} >
      <Hero
        title={"learn more abot us"}
        paragrapg={"At AppointMed, we believe everyone deserves convenient and efficient access to healthcare. We're a team of passionate individuals dedicated to streamlining the appointment booking process for both patients and healthcare providers. Our user-friendly platform empowers patients to find qualified doctors, manage appointments with ease, and take control of their healthcare journey.  For healthcare professionals, AppointMed simplifies practice management by offering efficient scheduling tools and centralized patient information.  We're committed to continuous innovation to make healthcare connections seamless and stress-free"}
        url={"./about.png"}
        style={{ overflow: "hidden" }}
      />
      </div>
      <Biography img={"./whoweare.png"} />
    </>
  );
};

export default About;
