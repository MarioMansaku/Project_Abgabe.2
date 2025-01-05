import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState } from "react";
// @ts-expect-error "Fehler Slick"
import Slider from "react-slick";
import './Carousel.css';

export const Carousel = () => {
  const [modalOpen, setModalOpen] = useState(false);  // Zustand für das Modal
  const [modalContent, setModalContent] = useState(''); // Zustand für die Modal-Inhalte

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: true,
  };

  const openModal = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div onClick={() => openModal('Mehr Details über Alpha')}>
          <h3>Alpha</h3>
          <img src="https://i.ibb.co/VHr3s01/Alpha.png" alt="Slide 1" style={{ width: '100%' }} />
        </div>
        <div onClick={() => openModal('Mehr Details über Beta')}>
          <h3>Beta</h3>
          <img src="https://i.ibb.co/y67qW95/Beta.png" alt="Slide 2" style={{ width: '100%' }} />
        </div>
        <div onClick={() => openModal('Mehr Details über Gamma')}>
          <h3>Gamma</h3>
          <img src="https://i.ibb.co/9pz0HCb/Gamma.png" alt="Slide 3" style={{ width: '100%' }} />
        </div>
        <div onClick={() => openModal('Mehr Details über Delta')}>
          <h3>Delta</h3>
          <img src="https://i.ibb.co/hmynPQz/Delta.png" alt="Slide 4" style={{ width: '100%' }} />
        </div>
        <div onClick={() => openModal('Mehr Details über Epsilon')}>
          <h3>Epsilon</h3>
          <img src="https://i.ibb.co/xMDBC09/Epsilon.png" alt="Slide 5" style={{ width: '100%' }} />
        </div>
        <div onClick={() => openModal('Mehr Details über Phi')}>
          <h3>Phi</h3>
          <img src="https://i.ibb.co/W0hVrvf/Phi.png" alt="Slide 6" style={{ width: '100%' }} />
        </div>
      </Slider>

      {/* Modal anzeigen, wenn modalOpen true ist */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal} className="modal-close-button">X</button>
            <h2>Buch Details</h2>
            <p>{modalContent}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
