const Hero = ({ title, url,vector }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos,
          quas id! At hic mollitia officiis iure labore, deleniti in dicta
          officia porro blanditiis facere vero laudantium quidem sunt aperiam
          ipsum minus, molestias ducimus. Est, amet aliquam exercitationem vero
          velit tempora repudiandae provident ipsa aut corporis, rerum at quam
         
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
