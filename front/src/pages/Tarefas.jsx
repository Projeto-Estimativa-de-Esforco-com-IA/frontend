import { useState } from "react";

export default function Tarefas() {
  const [tarefas, setTarefas] = useState([
    { 
      id: 1, 
      titulo: "Implementar login", 
      descricao: "Criar sistema de autenticação", 
      projeto: "Sistema de Vendas",
      prioridade: "Alta",
      status: "Em andamento",
      responsavel: "João Silva"
    },
    { 
      id: 2, 
      titulo: "Design da interface", 
      descricao: "Criar mockups das telas", 
      projeto: "App Mobile",
      prioridade: "Média",
      status: "Pendente",
      responsavel: "Maria Santos"
    },
  ]);
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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Funções de manipulação de tarefas (prontas para integração futura com backend)
  // Troque o conteúdo dessas funções por chamadas à API futuramente
  async function fetchTarefas() {
    // Exemplo: const response = await fetch('/api/tarefas');
    // setTarefas(await response.json());
    // Por enquanto, não faz nada pois usamos mock local
  }

  async function createTarefa(novaTarefa) {
    // Exemplo: await fetch('/api/tarefas', { method: 'POST', body: JSON.stringify(novaTarefa) })
    setTarefas(prev => [...prev, { id: Date.now(), ...novaTarefa }]);
  }

  async function updateTarefa(id, dados) {
    // Exemplo: await fetch(`/api/tarefas/${id}`, { method: 'PUT', body: JSON.stringify(dados) })
    setTarefas(prev => prev.map(t => t.id === id ? { ...t, ...dados } : t));
  }

  async function deleteTarefa(id) {
    // Exemplo: await fetch(`/api/tarefas/${id}`, { method: 'DELETE' })
    setTarefas(prev => prev.filter(t => t.id !== id));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      updateTarefa(editId, form);
    } else {
      createTarefa(form);
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

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      deleteTarefa(id);
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
              <label className="block mb-1 font-medium">Projeto</label>
              <input
                name="projeto"
                value={form.projeto}
                onChange={handleChange}
                required
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Projeto:</span>
                <span className="text-gray-600">{tarefa.projeto}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Responsável:</span>
                <span className="text-gray-600">{tarefa.responsavel}</span>
              </div>
              <div className="flex gap-2">
                <span className={`inline-block px-2 py-1 rounded text-xs ${getStatusColor(tarefa.status)}`}>
                  {tarefa.status}
                </span>
                <span className={`inline-block px-2 py-1 rounded text-xs ${getPrioridadeColor(tarefa.prioridade)}`}>
                  {tarefa.prioridade}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 