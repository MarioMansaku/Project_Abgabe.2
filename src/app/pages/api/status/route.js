// /app/api/status/route.js

import jwt from 'jwt-simple';

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const users = [
  { id: 1, username: 'test', password: 'test' },
  { id: 2, username: 'admin', password: 'p' },
  { id: 2, username: 'user', password: 'user' }
];

export async function POST(req) {
  const { username, password } = await req.json();

  const user = users.find((u) => u.username === username);

  if (!user) {
    console.log('User not found:', username);
    return new Response(JSON.stringify({ error: 'Invalid username' }), { status: 401 });
  }

  console.log('Password entered:', password);
  console.log('Stored hash:     ', user.password);

  const isPasswordValid = users.find((u) => u.password === password);

  if (!isPasswordValid) {
    console.log('Invalid password');
    return new Response(JSON.stringify({ error: 'Invalid password' }), { status: 401 });
  }

  const payload = { userId: user.id, username: user.username };
  const token = jwt.encode(payload, SECRET_KEY);

  return new Response(JSON.stringify({ token }), { status: 200 });
}
