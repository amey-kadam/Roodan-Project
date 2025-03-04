import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove any default margins/paddings that might restrict width
document.body.style.margin = '0';
document.body.style.padding = '0';
document.body.style.width = '100vw';
document.body.style.overflowX = 'hidden';
createRoot(document.getElementById("root")!).render(<App />);
