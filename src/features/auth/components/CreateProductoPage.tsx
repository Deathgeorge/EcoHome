import { useState, useEffect } from 'react';
import { MenuPage } from './MenuPage';

export const CreateProductoPage = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [stockQuantity, setStockQuantity] = useState<number | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    try {
      const response = await fetch('/api/v1/products', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          stockQuantity: Number(stockQuantity)
        })
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto.');
      }

      setSuccess(true);
      // Limpiamos el formulario
      setName('');
      setPrice('');
      setStockQuantity('');
      
    } catch (err) {
      setError('Ocurrió un error al intentar crear el producto.');
      console.error('Error creating product:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MenuPage />
      <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', background: '#f8f9fa' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', marginTop: 0 }}>Crear Nuevo Producto</h2>
        
        {error && <p style={{ color: '#dc3545', fontWeight: 'bold', textAlign: 'center' }}>{error}</p>}
        {success && <p style={{ color: '#28a745', fontWeight: 'bold', textAlign: 'center' }}>¡Producto creado exitosamente!</p>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Nombre del Producto</label>
            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} placeholder="Ej. Papel reciclable" />
          </div>

          <div>
            <label htmlFor="price" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Precio</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))} required step="0.01" min="0" style={inputStyle} placeholder="Ej. 10.99" />
          </div>

          <div>
            <label htmlFor="stockQuantity" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Cantidad en Stock</label>
            <input type="number" id="stockQuantity" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value === '' ? '' : Number(e.target.value))} required min="0" style={inputStyle} placeholder="Ej. 90" />
          </div>

          <button type="submit" disabled={isLoading} style={{ marginTop: '1rem', padding: '1rem', background: isLoading ? '#6c757d' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>
            {isLoading ? 'Creando...' : 'Crear Producto'}
          </button>
        </form>
      </div>
    </>
  );
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box' as const
};