// /app/api/status/route.js

import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const users = [
  { id: 1, username: 'user1', password: '$2a$10$5O8uqU0oNSL6FHZhr3l.BO..LgfhzJw9P4GbZXwLj1dOa3VRmjRjW' }, // hashed password: 'password123'
  { id: 2, username: 'user2', password: '$2a$10$XzXx7g2V.xPZG3kWn6z1WONOdFqP7pOmcSCbKK5BOdl7eT.m8RQ2O' }, // hashed password: 'password456'
];

export async function POST(req) {
  const { username, password } = await req.json();

  // Finde den User in der "Datenbank"
  const user = users.find((u) => u.username === username);
  
  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
  }

  // Überprüfe das Passwort
  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
    return new Response(JSON.stringify({ error: 'Invalid username or password' }), { status: 401 });
  }

  // Generiere das JWT-Token
  const payload = { userId: user.id, username: user.username };
  const token = jwt.encode(payload, SECRET_KEY);

  return new Response(JSON.stringify({ token }), { status: 200 });
}
