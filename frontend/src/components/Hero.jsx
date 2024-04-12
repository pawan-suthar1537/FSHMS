const Hero = ({ title, url }) => {
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
          maxime illum culpa ad, magni quia libero vitae perspiciatis! Officia
          similique delectus vitae deleniti veritatis esse adipisci at sequi,
          debitis culpa porro quam modi iste dicta error reiciendis explicabo
          atque sit amet quas excepturi dolor eaque! Nesciunt, culpa? Deserunt
          voluptatibus, qui blanditiis aliquam dolor cumque ipsum soluta
          dignissimos ducimus voluptatem reprehenderit dolorem?
        </p>
      </div>
      <div className="banner">
        <img src={url} alt="hero" className="animated-image" />
        <span>
          <img src="./Vector.png" alt="hero" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
