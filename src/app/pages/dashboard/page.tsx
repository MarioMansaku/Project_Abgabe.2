'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jwt-simple';

interface User {
  username: string;
}

export const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      router.push('/pages/login'); // Redirect to login if no token found
    } else {
      try {
        const SECRET_KEY = process.env.JWT_SECRET_KEY;

        if(!SECRET_KEY) {
          throw new Error('JWT_SECRET_KEY is not defined in enviroment variables');
        }
        
        const decoded = jwt.decode(token, SECRET_KEY); // Decode JWT to get user info
        setUser(decoded);
      } catch (error) {
        router.push('login');
        console.error(error);
      }
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>This is a protected page.</p>
    </div>
  );
};

export default Dashboard;
