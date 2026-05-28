import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginForm, ChatPage } from './features/auth/components'
import { ListProductPage } from './features/auth/components/ListProductPage'
import { CreateProductoPage } from './features/auth/components/CreateProductoPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal (Login) conservando tu contenedor main centrado */}
        <Route path="/" element={<main style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}><LoginForm /></main>} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/productos" element={<ListProductPage />} />
        <Route path="/crear-producto" element={<CreateProductoPage />} />
      </Routes>
    </Router>
  )
}

export default App
