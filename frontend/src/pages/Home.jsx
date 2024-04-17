import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero title={"Your Streamlined Healthcare Connection"} url={"./hero.png"} vector={"./Vector.png"} paragrapg={"Take control of your healthcare journey with AppointMed! Our user-friendly platform simplifies connecting with qualified doctors. Find the right specialist by department and book appointments with ease, all in one place. AppointMed empowers healthcare providers with efficient appointment management tools, making your practice run smoother."} />
      <Biography img={"./about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
