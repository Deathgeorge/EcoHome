import { LoginForm } from './features/auth/components'
import { ChatPage } from './features/auth/components'
import './App.css'

function App() {
  const path = window.location.pathname;

  if (path === '/chat') {
    return <ChatPage />;
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
      <LoginForm />
    </main>
  )
}

export default App
