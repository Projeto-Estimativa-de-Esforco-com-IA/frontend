import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projetos from "./pages/Projetos";
import Equipes from "./pages/Equipes";
import Tarefas from "./pages/Tarefas";
import PlanningPokerSessions from "./pages/PlanningPokerSessions";
import PlanningPokerVote from "./pages/PlanningPokerVote";
import './App.css'

export default function App() {
  // Simulação de autenticação (trocar por contexto futuramente)
  const [isAuth] = useState(true); // Trocar para false para testar login

  return (
    isAuth ? (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gray-50">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/projetos" element={<Projetos />} />
              <Route path="/equipes" element={<Equipes />} />
              <Route path="/tarefas" element={<Tarefas />} />
              <Route path="/planning" element={<PlanningPokerSessions />} />
              <Route path="/planning/:sessionId" element={<PlanningPokerVote />} />
              {/* Outras rotas aqui */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    ) : (
      <Routes>
        <Route path="/*" element={<Login />} />
      </Routes>
    )
  );
}
