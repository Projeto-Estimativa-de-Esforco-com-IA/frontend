import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { voteTask } from "../api";

const cards = ["0", "1/2", "1", "2", "3", "5", "8", "13", "21", "?", "∞"];
const roles = [
  { value: "programador", label: "Programador" },
  { value: "product_owner", label: "Product Owner" },
  { value: "scrum_master", label: "Scrum Master" },
  { value: "gerente", label: "Gerente" },
];

export default function PlanningPokerVote() {
  const { sessionId } = useParams();
  const [voto, setVoto] = useState(null);
  const [nome, setNome] = useState("");
  const [role, setRole] = useState(roles[0].value);
  const [votou, setVotou] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [allVotos, setAllVotos] = useState([]); // [{nome, role, voto}]
  const navigate = useNavigate();

  async function handleVote(card) {
    setLoading(true);
    setError(null);
    try {
      await voteTask({ sessionId, nome, role, voto: card });
      setVoto(card);
      setVotou(true);
      // Em produção, buscar votos do backend após votar
    } catch (err) {
      setError("Erro ao registrar voto");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setVoto(null);
    setVotou(false);
    // Em produção, remover voto do backend se necessário
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
      <h1 className="text-2xl font-bold mb-2">Sessão #{sessionId}</h1>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Seu nome</label>
          <input
            className="border px-3 py-2 rounded w-full max-w-xs"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Seu papel</label>
          <select
            className="border px-3 py-2 rounded w-full max-w-xs"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-4">Escolha sua carta:</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {cards.map(card => (
          <button
            key={card}
            className={`w-16 h-24 rounded shadow text-2xl font-bold flex items-center justify-center border-2 transition-all
              ${voto === card ? "bg-blue-600 text-white border-blue-700 scale-110" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"}
            `}
            disabled={!nome || !role || votou || loading}
            onClick={() => handleVote(card)}
          >
            {card}
          </button>
        ))}
      </div>
      {voto && (
        <div className="mb-4">
          <div className="text-lg">Seu voto: <span className="font-bold">{voto}</span></div>
          <button className="mt-2 text-sm text-blue-600 hover:underline" onClick={handleReset}>Trocar voto</button>
        </div>
      )}
      {votou && (
        <div className="p-4 bg-green-100 text-green-800 rounded shadow mb-4">
          Voto registrado! Aguarde o resultado da sessão.
        </div>
      )}
      {/* Painel de votos em tempo real para gerente - depende de backend ou websocket */}
      {role === "gerente" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Votos dos membros (não implementado)</h2>
          <div className="text-gray-500 text-sm">* Exibição de votos em tempo real depende de backend/websocket.</div>
        </div>
      )}
      <div className="text-gray-500 text-sm mt-8">* Esta é uma versão integrada ao backend. Exibição de votos em tempo real depende de implementação adicional.</div>
    </div>
  );
} 