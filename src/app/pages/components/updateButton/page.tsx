'use client';
import React, { useState, useEffect } from "react";
import { WriteServiceBuch } from '@/api/write-buch.service';
import { AppBar, Toolbar, Button, Typography, Box, Container } from "@mui/material";
import { useRouter } from 'next/navigation';
import { getBuch } from '@/api/read-buch.service';
import { type } from '../../../../api/api';

const UpdateButton: React.FC<{ id: string }> = ({ id }) => {
  const [buch, setBuch] = useState<any | null>(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [accessDenied, setAccessDenied] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        setAccessDenied(true);
        setTimeout(() => {
            router.push('/pages/login');
        }, 3000);
    } else {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        if (decoded.username !== 'admin') {                
            setAccessDenied(true);
            setTimeout(() => {
                router.push('/');
            }, 3000);
        }
    }

    const fetchBook = async () => {
      try {
        setLoading(true);
        const bookData = await getBuch('isbn', id); 
        setBuch(bookData);
      } catch (error) {
        setError('Buch konnte nicht geladen werden.');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setBuch((prevBuch) => ({
      ...prevBuch,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    const service = new WriteServiceBuch();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      if (buch) {
        await service.putBuch(buch, id); 
        setSuccess(true);
        setStatus("Update erfolgreich!");
      } else {
        setError("Buch-Daten sind nicht vorhanden.");
      }
    } catch (err: any) {
      setError(err.message || "Während der Aktualisierung ist ein Fehler aufgetreten.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || !buch) {
    return <Typography>Loading...</Typography>;
  }

  const fields: (keyof typeof buch)[] = [
    "isbn",
    "rating",
    "art",
    "preis",
    "rabatt",
    "lieferbar",
    "datum",
    "homepage",
    "schlagwoerter",
    "titel",
];

  const navigateToGallery = () => {
    router.push('/pages/gallery');
  };

  const navigateToFrontpage = () => {
    router.push('/');
  };

  if (accessDenied) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: '50px' }}>
        <Typography variant="h4" color="error">
          Access Denied
        </Typography>
        <Typography variant="body1" color="textSecondary">
          You do not have sufficient permissions to access this page. You will be redirected shortly.
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Redirecting in 3 seconds...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: 'relative', overflow: 'hidden' }}>
      <AppBar position="static" color="default" sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar>
          <img
            alt="Block"
            src="https://c.animaapp.com/CBoGUkLi/img/block.svg"
            style={{ marginTop: '-7.75px', marginBottom: '-7.75px' }}
            onClick={navigateToFrontpage}
          />
        </Toolbar>
      </AppBar>
      <Container>
        <div>
          <h2>Admin Input Table</h2>

          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", border: "1px solid #ccc" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4" }}>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Field Name</th>
                <th style={{ padding: "10px", textAlign: "left", border: "1px solid #ddd" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field) => (
                <tr key={field}>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>{field}</td>
                  <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <input
                      type="text"
                      placeholder={`Enter ${field}`}
                      value={buch[field] || ""}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      style={{
                        width: "98%",
                        padding: "8px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        fontSize: "16px",
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Button
            variant="contained"
            style={{ marginTop: 20, marginRight: 20 }}
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </Button>
          {success && <Typography color="primary">Update erfolgreich!</Typography>}
          {error && <Typography color="error">{error}</Typography>}

          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: 20, marginRight: 20 }}
            onClick={navigateToGallery}
          >
            Gallery
          </Button>

          <p>{status}</p>
        </div>
      </Container>
    </Box>
  );
};

export default UpdateButton;
