import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

// StrictMode is intentionally omitted so console render evidence is not doubled in development.
createRoot(document.getElementById('root')).render(<App />);
