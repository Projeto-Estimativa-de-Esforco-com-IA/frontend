import { useEffect, useState } from "react";
import { getTasks, addTask, editTask, deleteTask, getProjects } from "../api";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [selectedProjeto, setSelectedProjeto] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ 
    titulo: "", 
    descricao: "", 
    projeto: "", 
    prioridade: "Média",
    status: "Pendente",
    responsavel: ""
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchProjetos();
  }, []);

  useEffect(() => {
    if (selectedProjeto) {
      fetchTarefas(selectedProjeto);
    } else {
      setTarefas([]);
    }
  }, [selectedProjeto]);

  async function fetchProjetos() {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjects();
      setProjetos(data);
      if (data.length > 0) setSelectedProjeto(data[0].id);
    } catch (err) {
      setError("Erro ao carregar projetos");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTarefas(projectId) {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(projectId);
      setTarefas(data);
    } catch (err) {
      setError("Erro ao carregar tarefas");
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
        await editTask(editId, form);
      } else {
        await addTask(selectedProjeto, { ...form, projeto: selectedProjeto });
      }
      setForm({ 
        titulo: "", 
        descricao: "", 
        projeto: "", 
        prioridade: "Média",
        status: "Pendente",
        responsavel: ""
      });
      setShowForm(false);
      setEditId(null);
      fetchTarefas(selectedProjeto);
    } catch (err) {
      setError("Erro ao salvar tarefa");
    }
  }

  function handleEdit(tarefa) {
    setForm({ 
      titulo: tarefa.titulo, 
      descricao: tarefa.descricao, 
      projeto: tarefa.projeto,
      prioridade: tarefa.prioridade,
      status: tarefa.status,
      responsavel: tarefa.responsavel
    });
    setEditId(tarefa.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await deleteTask(id);
        fetchTarefas(selectedProjeto);
      } catch (err) {
        setError("Erro ao excluir tarefa");
      }
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "Concluída": return "bg-green-100 text-green-800";
      case "Em andamento": return "bg-blue-100 text-blue-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Bloqueada": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  function getPrioridadeColor(prioridade) {
    switch (prioridade) {
      case "Alta": return "bg-red-100 text-red-800";
      case "Média": return "bg-yellow-100 text-yellow-800";
      case "Baixa": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tarefas</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { 
            setShowForm(true); 
            setEditId(null); 
            setForm({ 
              titulo: "", 
              descricao: "", 
              projeto: "", 
              prioridade: "Média",
              status: "Pendente",
              responsavel: ""
            }); 
          }}
        >
          Nova Tarefa
        </button>
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Projeto</label>
        <select
          className="border px-3 py-2 rounded"
          value={selectedProjeto}
          onChange={e => setSelectedProjeto(e.target.value)}
        >
          {projetos.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div>Carregando tarefas...</div>
      ) : (
        <>
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Título</label>
                  <input
                    name="titulo"
                    value={form.titulo}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-1 font-medium">Descrição</label>
                  <textarea
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Responsável</label>
                  <input
                    name="responsavel"
                    value={form.responsavel}
                    onChange={handleChange}
                    required
                    className="w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Prioridade</label>
                  <select
                    name="prioridade"
                    value={form.prioridade}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded"
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Bloqueada">Bloqueada</option>
                    <option value="Concluída">Concluída</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editId ? "Salvar Alterações" : "Salvar"}
                </button>
                <button 
                  type="button" 
                  className="bg-gray-300 px-4 py-2 rounded" 
                  onClick={() => { 
                    setShowForm(false); 
                    setEditId(null); 
                    setForm({ 
                      titulo: "", 
                      descricao: "", 
                      projeto: "", 
                      prioridade: "Média",
                      status: "Pendente",
                      responsavel: ""
                    }); 
                  }}
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
                  <h2 className="font-bold text-lg">{tarefa.titulo}</h2>
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit(tarefa)} className="text-blue-600 hover:underline text-sm">Editar</button>
                    <button onClick={() => handleDelete(tarefa.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
                  </div>
                </div>
                <p className="text-gray-700 mb-3 text-sm">{tarefa.descricao}</p>
                <div className="flex gap-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs ${getPrioridadeColor(tarefa.prioridade)}`}>{tarefa.prioridade}</span>
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(tarefa.status)}`}>{tarefa.status}</span>
                </div>
                <div className="text-xs text-gray-500">Responsável: {tarefa.responsavel}</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 