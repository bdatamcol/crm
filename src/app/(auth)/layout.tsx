'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (!data.session) {
        router.push('/login'); // Redirigir si no hay sesión
      } else {
        setLoading(false); // Ya hay sesión activa, muestra children
      }
    };

    verifySession();
  }, [router]);

  if (loading) return <p>Cargando...</p>;

  return <>{children}</>;
}
