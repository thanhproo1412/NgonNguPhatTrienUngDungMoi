'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useRedirectIfLoggedIn() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // chưa login thì không redirect

    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.status === 'success') {
          router.replace('/'); // đã login → về homepage
        }
      } catch (err) {
        console.error('Error checking auth', err);
      }
    };

    checkAuth();
  }, [router]);
}
