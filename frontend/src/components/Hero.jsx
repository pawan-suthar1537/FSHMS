const Hero = ({ title, url,vector,paragrapg }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
        {
          paragrapg
        }
         
        </p>
      </div>
      <div className="banner">
        <img src={url} alt="hero" className="animated-image" />
        <span>
          <img src={vector} alt="hero" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
