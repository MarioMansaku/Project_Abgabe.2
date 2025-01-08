import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
// @ts-expect-error "Fehler Slick"
import Slider from "react-slick";
import axios from 'axios';
import { Book } from '@/app/pages/types/types';
import './Carousel.css';

export const Carousel = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookImages = {
    Alpha: "https://i.ibb.co/VHr3s01/Alpha.png",
    Beta: "https://i.ibb.co/y67qW95/Beta.png",
    Gamma: "https://i.ibb.co/9pz0HCb/Gamma.png",
    Delta: "https://i.ibb.co/hmynPQz/Delta.png",
    Epsilon: "https://i.ibb.co/xMDBC09/Epsilon.png",
    Phi: "https://i.ibb.co/W0hVrvf/Phi.png",
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://localhost:3000/rest', {
        headers: {
          Accept: 'application/hal+json',
        },
      });
      const data = res.data;
      setBooks(data._embedded.buecher);
    } catch (error) {
      console.error('Fehler beim Abrufen der Bücher:', error);
      setError('Fehler beim Abrufen der Bücher.');
    } finally {
      setLoading(false);
    }
  };

  const fetchBookDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(id);
      const bookDetails = response.data;
      setModalTitle(bookDetails.titel.titel);
      setModalContent(
        `Untertitel: ${bookDetails.titel.untertitel}\nID: ${bookDetails.id}\nArt: ${bookDetails.art}\nPreis: €${bookDetails.preis}\nRating: ${bookDetails.rating}/5\nRabatt: ${bookDetails.rabatt}%\nLieferbar: ${bookDetails.lieferbar ? 'Ja' : 'Nein'}\nDatum: ${bookDetails.datum}\nHomepage: ${bookDetails.homepage}\nSchlagwörter: ${bookDetails.schlagwoerter?.join(', ')}`
      );
    } catch (error) {
      console.error('Fehler beim Abrufen der Bücher:', error);
      setError('Fehler beim Abrufen der Buchdetails.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (book: Book) => {
    fetchBookDetails(book._links.self.href);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
    setModalTitle('');
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: true,
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.isbn} onClick={() => openModal(book)}>
            <h3>{book.titel.titel}</h3>
            <img src={bookImages[book.titel.titel] || ""} alt={book.titel.titel} className="carousel-image" />
          </div>
        ))}
      </Slider>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Verhindert das Schließen bei Klick innerhalb des Modals */}
            <h2>{modalTitle}</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <pre>{modalContent}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carousel;
