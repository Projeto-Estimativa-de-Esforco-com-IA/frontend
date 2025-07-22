import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";
import PrivateRoute from "./components/PrivateRoute";
import Toast from "./components/ui/Toast";
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
import { Spinner } from "./components/ui/Modal";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function App() {
  const { isAuthenticated, setSessionExpiredCallback } = useAuthStore();
  const navigate = useNavigate();
  const [globalLoading, setGlobalLoading] = useState(false);

  // Permitir controle global do loading
  useEffect(() => {
    window.setGlobalLoading = setGlobalLoading;
    return () => { delete window.setGlobalLoading; };
  }, []);

  useEffect(() => {
    setSessionExpiredCallback(() => () => {
      toast.error("Sua sessão expirou. Faça login novamente.");
      navigate("/login");
    });
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Toast />
      {globalLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <Spinner />
        </div>
      )}
      {isAuthenticated ? (
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
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </>
  );
}
