import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
  const [allVotos, setAllVotos] = useState([]); // [{nome, role, voto}]
  const navigate = useNavigate();

  // Simulação de votos em tempo real (mock)
  useEffect(() => {
    if (role === "gerente") {
      // Simula votos chegando de outros membros
      const nomesMock = [
        { nome: "Ana", role: "programador" },
        { nome: "Carlos", role: "scrum_master" },
        { nome: "Beatriz", role: "product_owner" },
      ];
      let votosSimulados = [];
      let idx = 0;
      const interval = setInterval(() => {
        if (idx < nomesMock.length) {
          votosSimulados = [
            ...votosSimulados,
            {
              nome: nomesMock[idx].nome,
              role: nomesMock[idx].role,
              voto: cards[Math.floor(Math.random() * cards.length)],
            },
          ];
          setAllVotos((prev) => [...prev, votosSimulados[votosSimulados.length - 1]]);
          idx++;
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [role]);

  // Adiciona o voto do usuário à lista geral
  useEffect(() => {
    if (votou && nome && role) {
      setAllVotos((prev) => {
        // Evita duplicidade
        if (prev.some((v) => v.nome === nome && v.role === role)) return prev;
        return [...prev, { nome, role, voto }];
      });
    }
  }, [votou, nome, role, voto]);

  function handleVote(card) {
    setVoto(card);
    setVotou(true);
  }

  function handleReset() {
    setVoto(null);
    setVotou(false);
    // Remove o voto do usuário da lista geral
    setAllVotos((prev) => prev.filter((v) => v.nome !== nome || v.role !== role));
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
      <h1 className="text-2xl font-bold mb-2">Sessão #{sessionId}</h1>
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
            disabled={!nome || !role || votou}
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
      {/* Painel de votos em tempo real para gerente */}
      {role === "gerente" && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Votos dos membros (tempo real)</h2>
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="text-left p-2">Nome</th>
                <th className="text-left p-2">Papel</th>
                <th className="text-left p-2">Voto</th>
              </tr>
            </thead>
            <tbody>
              {allVotos.map((v, idx) => (
                <tr key={idx} className="border-t">
                  <td className="p-2">{v.nome}</td>
                  <td className="p-2">{roles.find(r => r.value === v.role)?.label || v.role}</td>
                  <td className="p-2 font-bold">{v.voto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="text-gray-500 text-sm mt-8">* Esta é uma simulação local. Em produção, os votos seriam enviados e recebidos em tempo real via backend/WebSocket.</div>
    </div>
  );
} 