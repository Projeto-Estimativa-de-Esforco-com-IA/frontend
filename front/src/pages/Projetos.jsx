import { useState, useEffect } from "react";
import { getProjects, addProject, editProject, deleteProject } from "../api";
import { useAuthStore } from "../stores/authStore";
import { showToast } from "../components/ui/Toast";

export default function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { access } = useAuthStore();
  const getState = useAuthStore.getState;
  const setState = useAuthStore.setState;

  useEffect(() => {
    async function fetchData() {
      window.setGlobalLoading(true);
      setError(null);
      try {
        const data = await getProjects(access, getState, setState);
        setProjetos(data);
      } catch (err) {
        setError("Erro ao carregar projetos");
        showToast.error(err?.message || "Erro ao carregar projetos");
      } finally {
        window.setGlobalLoading(false);
      }
    }
    fetchData();
  }, [access]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    window.setGlobalLoading(true);
    setError(null);
    try {
      if (editId) {
        await editProject(editId, form, access, getState, setState);
        showToast.success("Projeto atualizado com sucesso!");
      } else {
        await addProject(form, access, getState, setState);
        showToast.success("Projeto criado com sucesso!");
      }
      const data = await getProjects(access, getState, setState);
      setProjetos(data);
      setShowForm(false);
      setEditId(null);
      setForm({ name: "", description: "", category: "" });
    } catch (err) {
      setError("Erro ao salvar projeto");
      showToast.error(err?.message || "Erro ao salvar projeto");
    } finally {
      window.setGlobalLoading(false);
    }
  }

  function handleEdit(proj) {
    setForm({ name: proj.name, description: proj.description, category: proj.category });
    setEditId(proj.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      window.setGlobalLoading(true);
      setError(null);
      try {
        await deleteProject(id, access, getState, setState);
        setProjetos(await getProjects(access, getState, setState));
        showToast.success("Projeto excluído com sucesso!");
      } catch (err) {
        setError("Erro ao deletar projeto");
        showToast.error(err?.message || "Erro ao deletar projeto");
      } finally {
        window.setGlobalLoading(false);
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
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
      {/* loading global */}
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
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{editId ? "Salvar Alterações" : "Salvar"}</button>
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
    </div>
  );
} 