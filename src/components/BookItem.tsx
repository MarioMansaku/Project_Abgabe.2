import React from 'react';
import { Card, CardContent, Typography, CardMedia, Box, Chip, Button } from '@mui/material';
import { Book } from "@/app/pages/types/types";

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://via.placeholder.com/150" // You can replace this with a real image URL
        alt={book.titel.titel}
      />
      <CardContent>
        <Typography variant="h6">{book.titel.titel}</Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {book.titel.untertitel}
        </Typography>
        <Typography variant="body2" color="text.primary" sx={{ marginTop: 1 }}>
          Preis: €{book.preis.toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bewertung: {book.rating} / 5
        </Typography>

        {book.schlagwoerter && (
          <Box sx={{ marginTop: 1 }}>
            {book.schlagwoerter.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ marginRight: 1 }} />
            ))}
          </Box>
        )}

        <Box sx={{ marginTop: 2, display: 'flex', justifyContent: 'space-between' }}>
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