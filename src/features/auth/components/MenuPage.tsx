import React from 'react';

export const MenuPage = () => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name') || 'Usuario';

  // Si no hay token (no está logueado), no renderizamos el menú
  if (!token) return null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#28a745',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h2 style={{ margin: 0, paddingRight: '1rem' }}>EcoHome</h2>
        <a href="/productos" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Productos</a>
        <a href="/crear-producto" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Crear Producto</a>
        <a href="/chat" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>Chat</a>
      </div>

      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <span>Hola, {name}</span>
        <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};