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
    const token = sessionStorage.getItem('authToken');
    if (!token) {
      router.push('/pages/login'); // Redirect to login if no token found
    } else {
      const SECRET_KEY = process.env.NEXT_PUBLIC_JWT_SECRET_KEY; // Umgebungsvariable für client

      if (!SECRET_KEY) {
        router.push('/pages/login'); // Weiterleitung bei fehlendem SECRET_KEY
        return;
      }

      // JWT-Token dekodieren, um Benutzerdaten zu extrahieren
      const decoded = jwt.decode(token, SECRET_KEY);
      setUser(decoded);
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

};

export default Dashboard;
