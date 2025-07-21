import { useEffect, useState } from "react";
import { API_URL } from "../api";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjetos();
  }, []);

  async function fetchProjetos() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/projects/`);
      const data = await res.json();
      setProjetos(data);
    } catch (err) {
      setError("Erro ao carregar projetos");
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
      if (editId) {
        await fetch(`${API_URL}/projects/${editId}/edit/`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(`${API_URL}/projects/add/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      setForm({ name: "", description: "", category: "" });
      setShowForm(false);
      setEditId(null);
      fetchProjetos();
    } catch (err) {
      setError("Erro ao salvar projeto");
    }
  }

  function handleEdit(proj) {
    setForm({ name: proj.name, description: proj.description, category: proj.category });
    setEditId(proj.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      try {
        await fetch(`${API_URL}/projects/${id}/delete/`, { method: "DELETE" });
        fetchProjetos();
      } catch (err) {
        setError("Erro ao excluir projeto");
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", description: "", category: "" }); }}
        >
          Novo Projeto
        </button>
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      {loading ? (
        <div>Carregando projetos...</div>
      ) : (
        <>
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
              <div className="mb-4">
                <label className="block mb-1 font-medium">Nome</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Descrição</label>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">Categoria</label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? "Salvar Alterações" : "Salvar"}</button>
                <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditId(null); setForm({ name: "", description: "", category: "" }); }}>Cancelar</button>
              </div>
            </form>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projetos.map((proj) => (
              <div key={proj.id} className="bg-white p-4 rounded shadow border relative">
                <h2 className="font-bold text-lg mb-1">{proj.name}</h2>
                <p className="text-gray-700 mb-2">{proj.description}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mb-2">{proj.category}</span>
                <div className="absolute top-2 right-2 flex gap-2">
                  <button onClick={() => handleEdit(proj)} className="text-blue-600 hover:underline text-sm">Editar</button>
                  <button onClick={() => handleDelete(proj.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 