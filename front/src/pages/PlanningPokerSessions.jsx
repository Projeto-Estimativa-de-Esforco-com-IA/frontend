import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startSession, deleteSession } from "../api";

export default function PlanningPokerSessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", owner: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchSessions();
  }, []);

  async function fetchSessions() {
    setLoading(true);
    setError(null);
    try {
      // Não há endpoint GET para listar sessões, então manteremos o mock local ou adaptar conforme backend
      setSessions([]); // Ajuste se backend fornecer endpoint GET
    } catch (err) {
      setError("Erro ao carregar sessões");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await startSession(form);
      setForm({ name: "", owner: "" });
      setShowForm(false);
      fetchSessions();
    } catch (err) {
      setError("Erro ao criar sessão");
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta sessão?")) {
      try {
        await deleteSession(id);
        fetchSessions();
      } catch (err) {
        setError("Erro ao excluir sessão");
      }
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
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div>Carregando sessões...</div>
      ) : (
        <>
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nome da Sessão</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Dono da Sessão</label>
                <input
                  name="owner"
                  value={form.owner}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Criar</button>
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white p-4 rounded shadow border flex flex-col justify-between relative">
                <div>
                  <h2 className="font-bold text-lg mb-1">{session.name}</h2>
                  <div className="text-gray-700 text-sm mb-2">Dono: {session.owner}</div>
                  <span className={`inline-block px-2 py-1 rounded text-xs mb-2 ${session.status === "Aberta" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>{session.status}</span>
                </div>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleDelete(session.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
                </div>
                <button
                  className="mt-4 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  disabled={session.status !== "Aberta"}
                  onClick={() => navigate(`/planning/${session.id}`)}
                >
                  {session.status === "Aberta" ? "Entrar" : "Sessão Fechada"}
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 