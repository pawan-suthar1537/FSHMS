const Biography = ({ img }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={img} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who we are</h3>
        <p>
        AppointMed is driven by a team of healthcare enthusiasts and technology experts. We saw firsthand the challenges patients and providers faced in scheduling appointments, and we knew there had to be a better way.  Fueled by this passion, we developed AppointMed to bridge the gap between patients and doctors, creating a smoother and more efficient healthcare experience for everyone
        </p>
        
      </div>
    </div>
  );
};

export default Biography;
