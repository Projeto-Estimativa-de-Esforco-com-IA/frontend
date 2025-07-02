import { useState } from "react";

export default function Equipes() {
  const [equipes, setEquipes] = useState([
    { id: 1, nome: "Equipe Alpha", membros: ["João", "Maria"] },
    { id: 2, nome: "Equipe Beta", membros: ["Carlos", "Ana"] },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", membros: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setEquipes([
      ...equipes,
      { id: Date.now(), nome: form.nome, membros: form.membros.split(",").map(m => m.trim()) },
    ]);
    setForm({ nome: "", membros: "" });
    setShowForm(false);
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
          <div key={equipe.id} className="bg-white p-4 rounded shadow border">
            <h2 className="font-bold text-lg mb-1">{equipe.nome}</h2>
            <div className="text-gray-700 text-sm mb-2">Membros:</div>
            <ul className="list-disc list-inside text-gray-800 text-sm">
              {equipe.membros.map((m, idx) => (
                <li key={idx}>{m}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
} 