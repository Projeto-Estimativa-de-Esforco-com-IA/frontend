import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Equipes() {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", membros: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchEquipes();
  }, []);

  async function fetchEquipes() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/users/`);
      const data = await res.json();
      setEquipes(data);
    } catch (err) {
      setError("Erro ao carregar equipes");
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
      const membrosArray = form.membros.split(",").map(m => m.trim());
      if (editId) {
        await fetch(`${API_URL}/users/${editId}/edit/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: form.nome, membros: membrosArray }),
        });
      } else {
        await fetch(`${API_URL}/users/add/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome: form.nome, membros: membrosArray }),
        });
      }
      setForm({ nome: "", membros: "" });
      setShowForm(false);
      setEditId(null);
      fetchEquipes();
    } catch (err) {
      setError("Erro ao salvar equipe");
    }
  }

  function handleEdit(equipe) {
    setForm({ nome: equipe.nome, membros: equipe.membros ? equipe.membros.join(", ") : "" });
    setEditId(equipe.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta equipe?")) {
      try {
        await fetch(`${API_URL}/users/${id}/delete/`, { method: "DELETE" });
        fetchEquipes();
      } catch (err) {
        setError("Erro ao excluir equipe");
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Equipes</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowForm(true)}
        >
          Nova Equipe
        </button>
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div>Carregando equipes...</div>
      ) : (
        <>
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nome da Equipe</label>
                <input
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Membros (separar por vírgula)</label>
                <input
                  name="membros"
                  value={form.membros}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar</button>
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowForm(false)}>Cancelar</button>
              </div>
            </form>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {equipes.map((equipe) => (
              <div key={equipe.id} className="bg-white p-4 rounded shadow border relative">
                <h2 className="font-bold text-lg mb-1">{equipe.nome}</h2>
                <div className="text-gray-700 text-sm mb-2">Membros:</div>
                <ul className="list-disc list-inside text-gray-800 text-sm mb-2">
                  {equipe.membros && equipe.membros.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(equipe)} className="text-blue-600 hover:underline text-sm">Editar</button>
                  <button onClick={() => handleDelete(equipe.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 