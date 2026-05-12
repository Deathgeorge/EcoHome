import { useState } from 'react';
import { useLogin } from '../hooks';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    await login({ email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Iniciar Sesión</h2>
      
      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="ejemplo@correo.com"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Tu contraseña"
        />
      </div>

      {error && <p className="error-message" style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

      <button type="submit" className="submit-button" disabled={isLoading}>
        {isLoading ? 'Ingresando...' : 'Ingresar'}
      </button>
    </form>
  );
};