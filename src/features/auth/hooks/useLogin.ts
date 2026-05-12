import { useState } from 'react';

interface LoginCredentials {
  email?: string;
  password?: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async ({ email, password }: LoginCredentials) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas o error en el servidor');
      }

      const data = await response.json();
      console.log('¡Inicio de sesión exitoso!', data);
      // NOTA: Aquí podrías guardar el token recibido, ej: localStorage.setItem('token', data.token);
    } catch (err) {
      setError('Ocurrió un error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};