import { Book } from '@/app/pages/types/types';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Typography,
} from '@mui/material';
import React from 'react';

interface BookItemProps {
    book: Book;
    onClick: () => void;
}

const BookItem: React.FC<BookItemProps> = ({ book, onClick }) => {
    return (
        <Card sx={{ maxWidth: 345, marginBottom: 2 }} onClick={onClick}>
            {' '}
            {/* onClick an Card gebunden */}
            <CardMedia
                component="img"
                height="140"
                image="https://via.placeholder.com/150"
                alt={book.titel.titel}
            />
            <CardContent>
                <Typography variant="h6">{book.titel.titel}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                    {book.titel.untertitel}
                </Typography>
                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{ marginTop: 1 }}
                >
                    Preis: €{book.preis.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Bewertung: {book.rating} / 5
                </Typography>

                {book.schlagwoerter && (
                    <Box sx={{ marginTop: 1 }}>
                        {book.schlagwoerter.map((tag, index) => (
                            <Chip
                                key={index}
                                label={tag}
                                sx={{ marginRight: 1 }}
                            />
                        ))}
                    </Box>
                )}

                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button
                        variant="outlined"
                        size="small"
                        color="primary"
                        href={book.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Homepage
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default BookItem;
