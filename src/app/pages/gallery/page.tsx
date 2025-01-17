'use client';

import { Book } from '@/app/pages/types/types';
import BookItem from '@/components/BookItem';
import SearchButton from '@/components/searchButton';
import {
    AppBar,
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Toolbar,
    Typography,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '../components/carousel/Carousel.css';

export const Gallery = () => {
    const router = useRouter();
    const [username, setUsername] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
    const [, setFilterCriteria] = useState({ criteria: 'isbn', value: '' });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<Book | null>(null);

    useEffect(() => {
        fetchBooks();

        if (typeof window !== 'undefined') {
            const token = sessionStorage.getItem('authToken');
            if (token) {
                const decoded = JSON.parse(atob(token.split('.')[1]));

                const username = decoded.preferred_username || 'Unknown User';

                const roles =
                    decoded.resource_access &&
                    decoded.resource_access['nest-client']
                        ? decoded.resource_access['nest-client'].roles
                        : [];
                const role = roles.includes('admin') ? 'admin' : 'user';

                setUsername(username);
                setIsAdmin(role === 'admin');
            }
        }
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`https://localhost:3000/rest`, {
                headers: { Accept: 'application/hal+json' },
            });
            const data = await res.data;
            setBooks(data._embedded.buecher);
            setFilteredBooks(data._embedded.buecher);
        } catch (error) {
            console.error(error);
            setErrorMessage(
                'Fehler beim Laden der Bücher. Bitte versuchen Sie es später erneut.',
            );
        }
    };

    const handleDeleteClick = (book: Book) => {
        setBookToDelete(book);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (bookToDelete) {
            await deleteBook(String(bookToDelete.id));
            setConfirmDeleteOpen(false);
        }
    };

    const handleDeleteCancel = () => {
        setConfirmDeleteOpen(false);
        setBookToDelete(null);
    };

    const ConfirmDeleteDialog = ({ open, onClose, onConfirm }) => {
        return (
            <Dialog open={open} onClose={onClose}>
                <DialogTitle>Bestätigung</DialogTitle>
                <DialogContent>
                    Sind Sie sicher, dass Sie dieses Buch löschen möchten?
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={onConfirm} color="secondary">
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    const deleteBook = async (id: string) => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            setErrorMessage(
                'Authentifizierung erforderlich, um ein Buch zu löschen.',
            );
            return;
        }

        try {
            await axios.delete(`https://localhost:3000/rest/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchBooks();
        } catch (error) {
            console.error('Fehler beim Löschen des Buchs:', error);
            setErrorMessage(
                'Fehler beim Löschen des Buchs. Bitte versuchen Sie es erneut.',
            );
        }
    };

    const filterBooks = (criteria: string, value: string) => {
        if (!value) {
            setFilteredBooks(books);
            setErrorMessage(null);
        } else {
            const filtered = books.filter((book) => {
                if (criteria === 'titel') {
                    return book.titel.titel
                        .toLowerCase()
                        .includes(value.toLowerCase());
                } else {
                    return book[criteria]
                        ?.toString()
                        .toLowerCase()
                        .includes(value.toLowerCase());
                }
            });

            if (filtered.length === 0) {
                setErrorMessage(
                    'Keine Bücher gefunden, die den Suchkriterien entsprechen.',
                );
            } else {
                setErrorMessage(null);
            }
            setFilteredBooks(filtered);
        }
    };

    const handleSearchResults = (criteria: string, value: string) => {
        setFilterCriteria({ criteria, value });
        filterBooks(criteria, value);
    };

    const navigateToLogin = () => router.push('/pages/login');
    const navigateToFrontpage = () => router.push('/');
    const navigateToAdd = () => router.push('/pages/components/addButton');
    const navigateToUpdate = () =>
        router.push('/pages/components/updateButton');

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        setUsername(null);
        setIsAdmin(false);
        router.push('/pages/login');
    };

    const openModal = (book: Book) => {
        setSelectedBook(book);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedBook(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                height: 'relative',
                backgroundColor: 'background.default',
            }}
        >
            <AppBar
                position="static"
                color="default"
                sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
                <Toolbar>
                    <img
                        alt="Block"
                        src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
                        style={{
                            marginTop: '-7.75px',
                            marginBottom: '-7.75px',
                        }}
                        onClick={navigateToFrontpage}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    {username ? (
                        <>
                            <Button
                                variant="contained"
                                color="inherit"
                                sx={{ marginRight: 2 }}
                            >
                                Logged in as: {username}
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ marginRight: 2 }}
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            color="inherit"
                            sx={{ marginRight: 2 }}
                            onClick={navigateToLogin}
                        >
                            Sign in
                        </Button>
                    )}
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    height: '255px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1507842217343-583bb7270b66)',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    padding: 4,
                    gap: 2,
                }}
            >
                <Typography
                    variant="h1"
                    color="#151547"
                    sx={{
                        textAlign: 'center',
                        color: 'white',
                        WebkitTextStroke: '1px black',
                        textStroke: '1px black',
                    }}
                >
                    Gallery
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {isAdmin && (
                        <>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={navigateToAdd}
                            >
                                Add
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={navigateToUpdate}
                            >
                                Update
                            </Button>
                        </>
                    )}
                </Box>
            </Box>

            <Container>
                <SearchButton onSearchResults={handleSearchResults} />
            </Container>

            <Container>
                <Typography variant="h4" sx={{ my: 4 }}>
                    Dynamic Gallery
                </Typography>
                {errorMessage && (
                    <Typography color="error" variant="h6" sx={{ my: 2 }}>
                        {errorMessage}
                    </Typography>
                )}

                <Grid container spacing={3}>
                    {filteredBooks.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.isbn}>
                            <BookItem
                                book={book}
                                onClick={() => openModal(book)}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {modalOpen && selectedBook && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <Typography variant="h6">
                            {selectedBook.titel.titel}
                        </Typography>
                        <Typography variant="body1">
                            Untertitel: {selectedBook.titel.untertitel}
                        </Typography>
                        <Typography variant="body1">
                            ID: {selectedBook.id}
                        </Typography>
                        <Typography variant="body1">
                            Art: {selectedBook.art}
                        </Typography>
                        <Typography variant="body1">
                            Preis: €{selectedBook.preis}
                        </Typography>
                        <Typography variant="body1">
                            Rating: {selectedBook.rating}/5
                        </Typography>
                        <Typography variant="body1">
                            Rabatt: {selectedBook.rabatt}%
                        </Typography>
                        <Typography variant="body1">
                            Lieferbar: {selectedBook.lieferbar ? 'Ja' : 'Nein'}
                        </Typography>
                        <Typography variant="body1">
                            Datum: {selectedBook.datum}
                        </Typography>
                        <Typography variant="body1">
                            Homepage: {selectedBook.homepage}
                        </Typography>
                        <Typography variant="body1">
                            Schlagwörter:{' '}
                            {selectedBook.schlagwoerter?.join(', ')}
                        </Typography>

                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mt: 2,
                            }}
                        >
                            <Button onClick={handleCloseModal} color="primary">
                                Schließen
                            </Button>
                            {isAdmin && selectedBook && selectedBook.id && (
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() =>
                                        handleDeleteClick(selectedBook)
                                    }
                                >
                                    Delete
                                </Button>
                            )}
                        </Box>
                    </div>
                </div>
            )}
            <ConfirmDeleteDialog
                open={confirmDeleteOpen}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </Box>
    );
};

export default Gallery;
