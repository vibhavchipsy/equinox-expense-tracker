'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then((u) => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  return { user, loading };
};
