import { useState } from "react";

export default function Projetos() {
  const [projetos, setProjetos] = useState([
    { id: 1, nome: "Sistema de Vendas", descricao: "Controle de vendas e estoque", categoria: "Comercial" },
    { id: 2, nome: "App Mobile", descricao: "Aplicativo para clientes", categoria: "Mobile" },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", descricao: "", categoria: "" });
  const [editId, setEditId] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editId) {
      setProjetos(projetos.map(p => p.id === editId ? { ...p, ...form } : p));
    } else {
      setProjetos([
        ...projetos,
        { id: Date.now(), ...form },
      ]);
    }
    setForm({ nome: "", descricao: "", categoria: "" });
    setShowForm(false);
    setEditId(null);
  }

  function handleEdit(proj) {
    setForm({ nome: proj.nome, descricao: proj.descricao, categoria: proj.categoria });
    setEditId(proj.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este projeto?")) {
      setProjetos(projetos.filter(p => p.id !== id));
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projetos</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ nome: "", descricao: "", categoria: "" }); }}
        >
          Novo Projeto
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Descrição</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Categoria</label>
            <input
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editId ? "Salvar Alterações" : "Salvar"}</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditId(null); setForm({ nome: "", descricao: "", categoria: "" }); }}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projetos.map((proj) => (
          <div key={proj.id} className="bg-white p-4 rounded shadow border relative">
            <h2 className="font-bold text-lg mb-1">{proj.nome}</h2>
            <p className="text-gray-700 mb-2">{proj.descricao}</p>
            <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs mb-2">{proj.categoria}</span>
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