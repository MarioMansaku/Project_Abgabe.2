import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from 'axios'; // Importiere axios für die API-Anfragen
import { Book } from '@/app/pages/types/types'; // Importiere das Book-Interface
import './Carousel.css';

export const Carousel = () => {
  const [books, setBooks] = useState<Book[]>([]); // Zustand für die Bücher
  const [modalOpen, setModalOpen] = useState(false); // Zustand für das Modal
  const [modalContent, setModalContent] = useState(''); // Zustand für die Modal-Inhalte
  const [modalTitle, setModalTitle] = useState(''); // Zustand für den Modal-Titel
  const [loading, setLoading] = useState(false); // Zustand für den Ladezustand
  const [error, setError] = useState<string | null>(null); // Zustand für Fehler

  // Hauptbilder für jedes Buch (diese kommen NICHT aus der Datenbank)
  const bookImages = {
    Alpha: "https://i.ibb.co/VHr3s01/Alpha.png",
    Beta: "https://i.ibb.co/y67qW95/Beta.png",
    Gamma: "https://i.ibb.co/9pz0HCb/Gamma.png",
    Delta: "https://i.ibb.co/hmynPQz/Delta.png",
    Epsilon: "https://i.ibb.co/xMDBC09/Epsilon.png",
    Phi: "https://i.ibb.co/W0hVrvf/Phi.png",
  };

  // Initialisiere das Karussell und hole die Buchdaten
  useEffect(() => {
    fetchBooks(); // Buchdaten beim Laden der Komponente abrufen
  }, []);

  // API-Aufruf, um Bücher abzurufen
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await axios.get('https://localhost:3000/rest', {
        headers: {
          Accept: 'application/hal+json',
        },
      });
      const data = res.data;
      setBooks(data._embedded.buecher); // Die Bücher aus der Antwort setzen
    } catch (error) {
      console.error('Fehler beim Abrufen der Bücher:', error);
      setError('Fehler beim Abrufen der Bücher.');
    } finally {
      setLoading(false);
    }
  };

  // API-Aufruf, um Details für ein Buch abzurufen
  const fetchBookDetails = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(id); // id ist die URL für das Buch, die in "_links.self.href" enthalten ist
      const bookDetails = response.data;
      setModalTitle(bookDetails.titel.titel); // Titel des Buches setzen
      setModalContent(
        `Untertitel: ${bookDetails.titel.untertitel}\nArt: ${bookDetails.art}\nPreis: €${bookDetails.preis}\nRating: ${bookDetails.rating}/5\nRabatt: ${bookDetails.rabatt}%\nLieferbar: ${bookDetails.lieferbar ? 'Ja' : 'Nein'}\nDatum: ${bookDetails.datum}\nHomepage: ${bookDetails.homepage}\nSchlagwörter: ${bookDetails.schlagwoerter?.join(', ')}`
      );
    } catch (error) {
      setError('Fehler beim Abrufen der Buchdetails.');
    } finally {
      setLoading(false);
    }
  };

  // Funktion zum Öffnen des Modals und Laden der Details
  const openModal = (book: Book) => {
    fetchBookDetails(book._links.self.href); // Buchdetails über den Link (self.href) abrufen
    setModalOpen(true);
  };

  // Funktion zum Schließen des Modals
  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
    setModalTitle(''); // Modal-Titel zurücksetzen
  };

  // Karussell-Einstellungen
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

  // Wenn die Bücher geladen werden
  if (loading) {
    return <p>Loading...</p>;
  }

  // Wenn ein Fehler beim Laden der Bücher auftritt
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.isbn} onClick={() => openModal(book)}>
            <h3>{book.titel.titel}</h3>
            {/* Bild aus der bookImages Map entsprechend dem Titel */}
            <img src={bookImages[book.titel.titel] || ""} alt={book.titel.titel} style={{ width: '100%' }} />
          </div>
        ))}
      </Slider>

      {/* Modal anzeigen, wenn modalOpen true ist */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}> {/* Klick außerhalb des Modals schließt es */}
          <div className="modal" onClick={(e) => e.stopPropagation()}> {/* Verhindert das Schließen bei Klick innerhalb des Modals */}
            <h2>{modalTitle}</h2> {/* Hier wird der Titel des Buches angezeigt */}
            {/* Wenn der Ladezustand aktiv ist */}
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
