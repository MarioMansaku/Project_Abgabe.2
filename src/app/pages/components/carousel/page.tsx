import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
// @ts-expect-error "Fehler Slick"
import Slider from "react-slick";

export const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: true
  };
  
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>Alpha</h3>
          <img src="https://i.ibb.co/VHr3s01/Alpha.png" alt="Slide 1" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Beta</h3>
          <img src="https://i.ibb.co/y67qW95/Beta.png" alt="Slide 2" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Gamma</h3>
          <img src="https://i.ibb.co/9pz0HCb/Gamma.png" alt="Slide 3" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Delta</h3>
          <img src="https://i.ibb.co/hmynPQz/Delta.png" alt="Slide 4" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Epsilon</h3>
          <img src="https://i.ibb.co/xMDBC09/Epsilon.png" alt="Slide 5" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Phi</h3>
          <img src="https://i.ibb.co/W0hVrvf/Phi.png" alt="Slide 6" style={{ width: '100%' }} />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;