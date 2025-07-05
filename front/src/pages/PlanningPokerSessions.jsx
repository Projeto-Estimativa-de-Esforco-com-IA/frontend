import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PlanningPokerSessions() {
  const [sessions, setSessions] = useState([
    { id: 1, name: "Sprint 1 - API", owner: "João", status: "Aberta" },
    { id: 2, name: "Sprint 2 - Mobile", owner: "Maria", status: "Fechada" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", owner: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSessions([
      ...sessions,
      { id: Date.now(), name: form.name, owner: form.owner, status: "Aberta" },
    ]);
    setForm({ name: "", owner: "" });
    setShowForm(false);
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
          <div key={session.id} className="bg-white p-4 rounded shadow border flex flex-col justify-between">
            <div>
              <h2 className="font-bold text-lg mb-1">{session.name}</h2>
              <div className="text-gray-700 text-sm mb-2">Dono: {session.owner}</div>
              <span className={`inline-block px-2 py-1 rounded text-xs mb-2 ${session.status === "Aberta" ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-700"}`}>{session.status}</span>
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
    </div>
  );
} 