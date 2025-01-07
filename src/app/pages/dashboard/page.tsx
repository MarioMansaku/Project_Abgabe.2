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
      router.push('/pages/login');
    } else {
      const SECRET_KEY = process.env.JWT_SECRET_KEY;

      if (!SECRET_KEY) {
        router.push('/pages/login');
        return;
      }

      const decoded = jwt.decode(token, SECRET_KEY);
      setUser(decoded);
    }
  }, [router]);

  if (!user) return <div>Loading...</div>;

};

export default Dashboard;
