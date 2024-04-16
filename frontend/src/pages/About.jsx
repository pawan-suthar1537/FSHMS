import Biography from "../components/Biography";
import Hero from "../components/Hero";

const About = () => {
  return (
    <>
      <Hero
        title={"learn more abot us"}
        url={"./about.png"}
        style={{ overflow: "hidden" }}
      />
      <Biography img={"./whoweare.png"} />
    </>
  );
};

export default About;
