import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      SlideToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      SlideToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      SlideToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      SlideToSlide: 1,
    },
  };
  return (
    <div className="container departments">
      <h2>Departments</h2>
      <Carousel
        responsive={responsive}
        autoPlay={true}
        autoPlaySpeed={1200}
        loop={true}

        // removeArrowOnDeviceType={["tablet"]}
      >
        {departmentsArray.map((depart, index) => {
          return (
            <div key={index} className="card">
              <div className="depart-name">{depart.name}</div>
              <img src={depart.imageUrl} alt="Department" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Departments;
