import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects, startSession } from "../api";
import { useAuthStore } from "../stores/authStore";
import { showToast } from "../components/ui/Toast";

export default function PlanningPokerSessions() {
  const [sessions, setSessions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ project: "", team: "", tasks: "" });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { access } = useAuthStore();
  const getState = useAuthStore.getState;
  const setState = useAuthStore.setState;

  useEffect(() => {
    async function fetchProjects() {
      window.setGlobalLoading(true);
      try {
        const data = await getProjects(access, getState, setState);
        setProjects(data);
        if (data.length > 0) setForm(f => ({ ...f, project: data[0].id }));
      } catch (err) {
        setError("Erro ao carregar projetos");
        showToast.error(err?.message || "Erro ao carregar projetos");
      } finally {
        window.setGlobalLoading(false);
      }
    }
    fetchProjects();
  }, [access]);

  useEffect(() => {
    const stored = localStorage.getItem("sessions");
    if (stored) setSessions(JSON.parse(stored));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    window.setGlobalLoading(true);
    setError(null);
    try {
      // tasks: string de ids separados por vírgula
      const session = await startSession({
        project: form.project,
        team: form.team || 1, // ajuste conforme necessário
        tasks: form.tasks.split(",").map(t => Number(t.trim())).filter(Boolean)
      }, access, getState, setState);
      setSessions(prev => [...prev, session]);
      localStorage.setItem("sessions", JSON.stringify([...sessions, session]));
      setShowForm(false);
      setForm({ project: projects[0]?.id || "", team: "", tasks: "" });
      showToast.success("Sessão criada com sucesso!");
    } catch (err) {
      setError("Erro ao criar sessão");
      showToast.error(err?.message || "Erro ao criar sessão");
    } finally {
      window.setGlobalLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Planning Poker - Sessões</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Nova Sessão
        </button>
      </div>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
      {/* loading global */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Projeto</label>
            <select
              name="project"
              value={form.project}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            >
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Equipe (ID)</label>
            <input
              name="team"
              value={form.team}
              onChange={handleChange}
              placeholder="ID da equipe"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">IDs das Tarefas (separados por vírgula)</label>
            <input
              name="tasks"
              value={form.tasks}
              onChange={handleChange}
              placeholder="Ex: 1,2,3"
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>Criar</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white p-4 rounded shadow border flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg mb-1">Sessão #{session.id}</h2>
              <div className="text-gray-700 text-sm mb-2">Projeto: {projects.find(p => p.id === session.project)?.name || session.project}</div>
              <span className={`inline-block px-2 py-1 rounded text-xs mb-2 bg-green-100 text-green-800`}>Aberta</span>
            </div>
            <button
              className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => navigate(`/planning/${session.id}`)}
            >
              Entrar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 