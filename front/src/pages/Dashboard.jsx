import { useAuthStore } from '../stores/authStore';
import { changePassword, updateProfile } from '../api';
import { useState } from 'react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({ first_name: user?.first_name || '', last_name: user?.last_name || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ old_password: '', new_password: '' });
  const [msg, setMsg] = useState('');

  async function handleProfile(e) {
    e.preventDefault();
    try {
      await updateProfile(profile);
      setMsg('Perfil atualizado com sucesso!');
    } catch (err) {
      setMsg('Erro ao atualizar perfil: ' + err.message);
    }
  }

  async function handlePassword(e) {
    e.preventDefault();
    try {
      await changePassword(passwords);
      setMsg('Senha alterada com sucesso!');
      setPasswords({ old_password: '', new_password: '' });
    } catch (err) {
      setMsg('Erro ao alterar senha: ' + err.message);
    }
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      {/* Cabeçalho da seção */}
      <section className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Bem-vindo à Ferramenta Ágil de Estimativa de Esforço com IA
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Centralize o processo de estimativa de esforço em projetos ágeis, organize equipes e tarefas, 
          e utilize inteligência artificial para previsões mais precisas. 
          Use o menu lateral para navegar entre os módulos.
        </p>
        {msg && <div className="p-2 bg-blue-100 text-blue-800 rounded">{msg}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <form onSubmit={handleProfile} className="bg-white p-4 rounded shadow space-y-2">
            <h2 className="font-bold text-lg mb-2">Editar Perfil</h2>
            <input className="border px-3 py-2 rounded w-full" placeholder="Primeiro nome" value={profile.first_name} onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))} />
            <input className="border px-3 py-2 rounded w-full" placeholder="Sobrenome" value={profile.last_name} onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))} />
            <input className="border px-3 py-2 rounded w-full" placeholder="E-mail" value={profile.email} onChange={e => setProfile(p => ({ ...p, email: e.target.value }))} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Salvar Perfil</button>
          </form>
          <form onSubmit={handlePassword} className="bg-white p-4 rounded shadow space-y-2">
            <h2 className="font-bold text-lg mb-2">Alterar Senha</h2>
            <input className="border px-3 py-2 rounded w-full" type="password" placeholder="Senha atual" value={passwords.old_password} onChange={e => setPasswords(p => ({ ...p, old_password: e.target.value }))} />
            <input className="border px-3 py-2 rounded w-full" type="password" placeholder="Nova senha" value={passwords.new_password} onChange={e => setPasswords(p => ({ ...p, new_password: e.target.value }))} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Alterar Senha</button>
          </form>
        </div>
        {/* Cards de destaque */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Projetos</h2>
            <p className="text-sm text-gray-600 mt-2">
              Gerencie seus projetos ágeis com facilidade e visibilidade.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Tarefas</h2>
            <p className="text-sm text-gray-600 mt-2">
              Crie, edite e acompanhe tarefas com estimativas inteligentes.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-blue-600">Equipe</h2>
            <p className="text-sm text-gray-600 mt-2">
              Organize sua equipe e acompanhe o desempenho colaborativo.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
