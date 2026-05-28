import { useEffect, useState } from 'react';
import { MenuPage } from '../../auth/components/MenuPage';

interface Product {
  idProduct: number;
  name: string;
  price: number;
  stockQuantity: number;
  createdBy: {
    idUser: number;
    name: string;
  };
}

export const ListProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        window.location.href = '/';
        return;
      }

      try {
        const response = await fetch('/api/v1/products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener los productos del servidor.');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Ocurrió un error al cargar los productos.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <MenuPage />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Lista de Productos</h2>
          <a href="/crear-producto" style={{ padding: '0.5rem 1rem', background: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            + Nuevo Producto
          </a>
        </header>

        {isLoading && <p>Cargando productos...</p>}
        
        {error && <p style={{ color: '#dc3545', fontWeight: 'bold' }}>{error}</p>}

        {!isLoading && !error && products.length === 0 && (
          <p style={{ textAlign: 'center', color: '#666', padding: '2rem', border: '1px dashed #ccc', borderRadius: '8px' }}>
            No hay productos disponibles.
          </p>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {products.map((product) => (
              <div key={product.idProduct} style={{ border: '1px solid #e2e3e5', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', backgroundColor: 'white' }}>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{product.name}</h3>
                <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#28a745' }}>${product.price}</p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#555' }}>Cantidad: {product.stockQuantity}</p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>Creado por: {product.createdBy?.name || 'Desconocido'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};