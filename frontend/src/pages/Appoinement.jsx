import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

const Appoinement = () => {
  return (
    <>
      <div style={{ marginTop: "68px" }}>
        <Hero title={"sechdule your appoinemnt"} url={"./signin.png"} />
      </div>
      <AppointmentForm />
    </>
  );
};

export default Appoinement;
