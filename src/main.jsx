import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './assets/App.css'
import AuthProvider from './component/AuthProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
)
