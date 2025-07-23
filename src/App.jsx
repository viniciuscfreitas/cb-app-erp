import AppLayout from './components/ui/AppLayout';
import ClientsPage from './components/clients/ClientsPage';
import DashboardPage from './components/dashboard/DashboardPage';
import CalendarPage from './components/agendamentos/CalendarPage';
import EstoquePage from './components/estoque/EstoquePage';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PetsPage from './components/pets/PetsPage';
import { PetShopProvider } from './contexts/PetShopContext.jsx';
import { EstoqueProvider } from './contexts/EstoqueContext.jsx';

function App() {
  return (
    <PetShopProvider>
      <EstoqueProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout active="Dashboard"><DashboardPage /></AppLayout>} />
            <Route path="/dashboard" element={<AppLayout active="Dashboard"><DashboardPage /></AppLayout>} />
            <Route path="/clientes" element={<AppLayout active="Clientes"><ClientsPage /></AppLayout>} />
            <Route path="/pets" element={<AppLayout active="Pets"><PetsPage /></AppLayout>} />
            <Route path="/agendamentos" element={<AppLayout active="Agenda"><CalendarPage /></AppLayout>} />
            <Route path="/estoque" element={<AppLayout active="Estoque"><EstoquePage /></AppLayout>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </EstoqueProvider>
    </PetShopProvider>
  );
}

export default App;
