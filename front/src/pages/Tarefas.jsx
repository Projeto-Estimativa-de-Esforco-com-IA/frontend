import { useState, useEffect } from "react";
import { getProjects, getTasks, addTask, editTask, deleteTask } from "../api";
import { useAuthStore } from "../stores/authStore";
import { showToast } from "../components/ui/Toast";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", project: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { access } = useAuthStore();
  const getState = useAuthStore.getState;
  const setState = useAuthStore.setState;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getProjects(access, getState, setState);
        setProjetos(data);
        if (data.length > 0) setSelectedProject(data[0].id);
      } catch {
        setError("Erro ao carregar projetos");
      }
    }
    fetchProjects();
  }, [access]);

  useEffect(() => {
    if (!selectedProject) return;
    async function fetchTarefas() {
      window.setGlobalLoading(true);
      setError(null);
      try {
        const data = await getTasks(selectedProject, access, getState, setState);
        setTarefas(data);
      } catch (err) {
        setError("Erro ao carregar tarefas");
        showToast.error(err?.message || "Erro ao carregar tarefas");
      } finally {
        window.setGlobalLoading(false);
      }
    }
    fetchTarefas();
  }, [selectedProject, access]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    window.setGlobalLoading(true);
    setError(null);
    try {
      if (editId) {
        await editTask(editId, form, access, getState, setState);
        showToast.success("Tarefa atualizada com sucesso!");
      } else {
        await addTask(selectedProject, { ...form, project: selectedProject }, access, getState, setState);
        showToast.success("Tarefa criada com sucesso!");
      }
      setTarefas(await getTasks(selectedProject, access, getState, setState));
      setShowForm(false);
      setEditId(null);
      setForm({ title: "", description: "", project: selectedProject });
    } catch (err) {
      setError("Erro ao salvar tarefa");
      showToast.error(err?.message || "Erro ao salvar tarefa");
    } finally {
      window.setGlobalLoading(false);
    }
  }

  function handleEdit(tarefa) {
    setForm({ title: tarefa.title, description: tarefa.description, project: tarefa.project });
    setEditId(tarefa.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      window.setGlobalLoading(true);
      setError(null);
      try {
        await deleteTask(id, access, getState, setState);
        setTarefas(await getTasks(selectedProject, access, getState, setState));
        showToast.success("Tarefa excluída com sucesso!");
      } catch (err) {
        setError("Erro ao deletar tarefa");
        showToast.error(err?.message || "Erro ao deletar tarefa");
      } finally {
        window.setGlobalLoading(false);
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ title: "", description: "", project: selectedProject }); }}
          disabled={!selectedProject}
        >
          Nova Tarefa
        </button>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Projeto</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={selectedProject}
          onChange={e => setSelectedProject(e.target.value)}
        >
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
      {/* loading global */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Título</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 font-medium">Descrição</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{editId ? "Salvar Alterações" : "Salvar"}</button>
            <button 
              type="button" 
              className="bg-gray-300 px-4 py-2 rounded" 
              onClick={() => { setShowForm(false); setEditId(null); setForm({ title: "", description: "", project: selectedProject }); }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className="bg-white p-4 rounded shadow border relative">
            <div className="flex justify-between items-start mb-2">
              <h2 className="font-bold text-lg">{tarefa.title}</h2>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(tarefa)} className="text-blue-600 hover:underline text-sm">Editar</button>
                <button onClick={() => handleDelete(tarefa.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
              </div>
            </div>
            <p className="text-gray-700 mb-3 text-sm">{tarefa.description}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Projeto:</span>
                <span className="text-gray-600">{projetos.find(p => p.id === tarefa.project)?.name || tarefa.project}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 