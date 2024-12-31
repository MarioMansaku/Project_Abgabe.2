// /app/api/status/route.js

import jwt from 'jwt-simple';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const users = [
  { id: 1, username: 'test', password: 'test' },
  { id: 2, username: 'admin', password: 'p' }
];

export async function POST(req) {
  // Hole den Benutzernamen und das Passwort aus dem Request-Body
  const { username, password } = await req.json();

  // Finde den Benutzer anhand des Benutzernamens
  const user = users.find((u) => u.username === username);

  // Wenn der Benutzer nicht gefunden wird
  if (!user) {
    console.log('User not found:', username); // Debugging
    return new Response(JSON.stringify({ error: 'Invalid username' }), { status: 401 });
  }

  // Debugging: Zeige das Passwort und den gespeicherten Hash an
  console.log('Password entered:', password); // Klartext Passwort aus dem Request
  console.log('Stored hash:     ', user.password); // Gespeichertes gehashtes Passwort aus der "Datenbank"

  // Überprüfe das Passwort
  const isPasswordValid = users.find((u) => u.password === password);

  // Wenn das Passwort nicht übereinstimmt
  if (!isPasswordValid) {
    console.log('Invalid password'); // Debugging
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  // JWT-Token erzeugen
  const payload = { userId: user.id, username: user.username };
  const token = jwt.encode(payload, SECRET_KEY);

  // Gebe das Token zurück
  return new Response(JSON.stringify({ token }), { status: 200 });
}
