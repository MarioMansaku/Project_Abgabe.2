import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';

const SECRET_KEY = process.env.JWT_SECRET_KEY; // store this in an environment variable

// Sample hardcoded users (you should query from a real database in production)
const users = [
  { id: 1, username: 'test', password: 'test' }, // hashed password: 'password123'
  { id: 2, username: 'admin', password: 'p' }, // hashed password: 'password456'
];

const status = async (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Find user in database (here we're using a static array)
    const user = users.find((u) => u.username === username);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const payload = { userId: user.id, username: user.username };
    const token = jwt.encode(payload, SECRET_KEY);

    // Return the token to the client
    res.status(200).json({ token });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default status;