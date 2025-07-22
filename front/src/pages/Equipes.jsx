import { useState, useEffect } from "react";
import { getUsers, addUser, editUser, deleteUser } from "../api";
import { useAuthStore } from "../stores/authStore";
import { showToast } from "../components/ui/Toast";

export default function Equipes() {
  const [equipes, setEquipes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { access } = useAuthStore();
  const getState = useAuthStore.getState;
  const setState = useAuthStore.setState;

  useEffect(() => {
    async function fetchEquipes() {
      window.setGlobalLoading(true);
      setError(null);
      try {
        const data = await getUsers(access, getState, setState);
        setEquipes(data);
      } catch (err) {
        setError("Erro ao carregar usuários");
        showToast.error(err?.message || "Erro ao carregar usuários");
      } finally {
        window.setGlobalLoading(false);
      }
    }
    fetchEquipes();
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
        await editUser(editId, form, access, getState, setState);
        showToast.success("Usuário atualizado com sucesso!");
      } else {
        await addUser(form, access, getState, setState);
        showToast.success("Usuário criado com sucesso!");
      }
      setEquipes(await getUsers(access, getState, setState));
      setShowForm(false);
      setEditId(null);
      setForm({ username: "", email: "", password: "" });
    } catch (err) {
      setError("Erro ao salvar usuário");
      showToast.error(err?.message || "Erro ao salvar usuário");
    } finally {
      window.setGlobalLoading(false);
    }
  }

  function handleEdit(user) {
    setForm({ username: user.username, email: user.email, password: "" });
    setEditId(user.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      window.setGlobalLoading(true);
      setError(null);
      try {
        await deleteUser(id, access, getState, setState);
        setEquipes(await getUsers(access, getState, setState));
        showToast.success("Usuário excluído com sucesso!");
      } catch (err) {
        setError("Erro ao deletar usuário");
        showToast.error(err?.message || "Erro ao deletar usuário");
      } finally {
        window.setGlobalLoading(false);
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => { setShowForm(true); setEditId(null); setForm({ username: "", email: "", password: "" }); }}
        >
          Novo Usuário
        </button>
      </div>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
      {/* loading global */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6 max-w-lg">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Nome de usuário</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">E-mail</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Senha</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required={!editId}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>{editId ? "Salvar Alterações" : "Salvar"}</button>
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setShowForm(false); setEditId(null); setForm({ username: "", email: "", password: "" }); }}>Cancelar</button>
          </div>
        </form>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipes.map((user) => (
          <div key={user.id} className="bg-white p-4 rounded shadow border">
            <h2 className="font-bold text-lg mb-1">{user.username}</h2>
            <div className="text-gray-700 text-sm mb-2">E-mail: {user.email}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(user)} className="text-blue-600 hover:underline text-sm">Editar</button>
              <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:underline text-sm">Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 