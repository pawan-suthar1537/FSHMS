import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Departments from "../components/Departments";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero title={"Welcome to free fund Medical"} url={"./hero.png"} vector={"./Vector.png"} />
      <Biography img={"./about.png"} />
      <Departments />
      <MessageForm />
    </>
  );
};

export default Home;
