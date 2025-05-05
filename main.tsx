import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReminderService } from './services/reminderService'

// Inicia o serviço de lembretes
const reminderService = ReminderService.getInstance();
reminderService.startReminderService();

createRoot(document.getElementById("root")!).render(<App />);
