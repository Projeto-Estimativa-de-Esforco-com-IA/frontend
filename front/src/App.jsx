import { Routes, Route, Navigate } from "react-router-dom";
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

export default function App() {
  const { isAuthenticated } = useAuthStore();

  return (
    <>
      <Toast />
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
