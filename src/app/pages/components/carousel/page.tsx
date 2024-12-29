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
    slidesToShow: 1,
    slidesToScroll: 1
  };
  
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
          <h3>Alpha</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 1" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Beta</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 2" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Gamma</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 3" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Delta</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 4" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Epsilon</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 5" style={{ width: '100%' }} />
        </div>
        <div>
          <h3>Phi</h3>
          <img src="https://via.placeholder.com/800x400?text=Slide+1" alt="Slide 6" style={{ width: '100%' }} />
        </div>
      </Slider>
    </div>
  );
}

export default Carousel;