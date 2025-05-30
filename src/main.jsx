import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Check for dark mode preference
const darkModePreference = localStorage.getItem('darkMode') === 'true' || 
  window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply dark mode class to html element if needed
if (darkModePreference) {
  document.documentElement.classList.add('dark');
}

// Apply theme color if saved
const savedTheme = localStorage.getItem('accentColor');
if (savedTheme) {
  document.documentElement.classList.add(`theme-${savedTheme}`);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
