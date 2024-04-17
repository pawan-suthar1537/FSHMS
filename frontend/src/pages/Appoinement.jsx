import AppointmentForm from "../components/AppointmentForm";
import Hero from "../components/Hero";

const Appoinement = () => {
  return (
    <>
      <div style={{ marginTop: "68px" }}>
        <Hero title={"Schedule Your Appointment with Ease"} url={"./signin.png"} paragrapg={"AppointMed simplifies connecting with the healthcare professional you need.  Browse our network of qualified doctors by department and specialty.  Once you've found the right fit, use our convenient appointment form to choose your preferred date and time.  The form allows you to  briefly share any relevant information with the doctor's office, ensuring a smooth and efficient appointment experience"} />
      </div>
      <AppointmentForm />
    </>
  );
};

export default Appoinement;
