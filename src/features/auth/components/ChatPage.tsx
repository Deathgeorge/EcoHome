import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { MenuPage } from './MenuPage';

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'other';
  senderName?: string;
}

export const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);

  // Recuperamos la info del usuario almacenada tras el login para mostrar su nombre
  const tokenStr = localStorage.getItem('token');
  const myName = localStorage.getItem('name') || 'Tú';
  const myUserId = localStorage.getItem('userId');

  useEffect(() => {
    // 1. Validar autenticación
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/'; 
      return;
    }

    // 2. Conectar al socket
    const newSocket = io("http://localhost:8095", {
      query: {
        token: token // Enviamos el token en la conexión inicial (Recomendado por Socket.io)
      }
    });
    setSocket(newSocket);

    // 3. Obtener el historial de chat (últimos 10 mensajes)
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/v1/chats/latest', {
          method: 'GET',
          headers: {  
            'Authorization': `Bearer ${token}`, // Enviamos el token para autenticar la petición
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const data = await response.json();
          const historyMessages = data.map((msg: any) => ({
            id: msg.id || crypto.randomUUID(),
            content: msg.content,
            sender: String(msg.userId) === myUserId ? 'me' : 'other',
            senderName: msg.senderName || (String(msg.userId) === myUserId ? myName : 'Otro Usuario')
          }));
          setMessages(historyMessages);
        }
      } catch (error) {
        console.error('Error al cargar el historial:', error);
      }
    };
    fetchHistory();

    // 4. Escuchar nuevos mensajes desde el servidor
    newSocket.on("nuevo_mensaje", (data: { content: string; senderName?: string; userId?: string | number }) => {
      // Si el mensaje proviene de nuestro propio usuario (broadcast del servidor), lo ignoramos
      // porque ya lo agregamos a la vista localmente en el handleSubmit
      if (data.userId && String(data.userId) === myUserId) {
        return;
      }

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), content: data.content, sender: 'other', senderName: data.senderName || 'Otro Usuario' }
      ]);
    });

    // Limpiar la conexión al desmontar el componente
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || !socket) return;

    // Enviar el mensaje por el socket
    socket.emit("enviar_mensaje", { content: inputValue, token: tokenStr, userId: myUserId, senderName: myName });

    // Agregarlo inmediatamente a nuestra vista local
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), content: inputValue, sender: 'me', senderName: myName }
    ]);
    setInputValue('');
  };

  return (
    <>
      <MenuPage />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
        <header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Chat de EcoHome</h2>
        </header>
      
      <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f8f9fa' }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888' }}>No hay mensajes en esta conversación.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} style={{ alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start', maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
              <span style={{ fontSize: '0.75rem', color: '#666', marginBottom: '4px', padding: '0 4px' }}>
                {msg.senderName}
              </span>
              <div style={{ background: msg.sender === 'me' ? '#007bff' : '#e2e3e5', color: msg.sender === 'me' ? 'white' : 'black', padding: '0.5rem 1rem', borderRadius: '15px', wordWrap: 'break-word' }}>
                {msg.content}
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe tu mensaje..."
          style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button type="submit" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', background: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Enviar
        </button>
      </form>
    </div>
    </>
  );
};