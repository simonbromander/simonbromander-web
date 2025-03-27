import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './lib/analytics' // Import analytics to initialize

createRoot(document.getElementById("root")!).render(<App />);
