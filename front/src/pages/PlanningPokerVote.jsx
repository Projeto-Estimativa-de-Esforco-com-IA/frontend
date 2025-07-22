import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { voteTask, getVotes } from "../api";
import { useAuthStore } from "../stores/authStore";
import { showToast } from "../components/ui/Toast";

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
  const [justificativa, setJustificativa] = useState("");
  const [nome, setNome] = useState("");
  const [role, setRole] = useState(roles[0].value);
  const [votou, setVotou] = useState(false);
  const [allVotos, setAllVotos] = useState([]); // [{user, value, justificativa, task, ...}]
  const [taskId, setTaskId] = useState("");
  const [chat, setChat] = useState([]); // [{nome, msg, ts}]
  const [msg, setMsg] = useState("");
  const [novaRodada, setNovaRodada] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingVotos, setLoadingVotos] = useState(false);
  const chatRef = useRef(null);
  const navigate = useNavigate();
  const { access } = useAuthStore();
  const getState = useAuthStore.getState;
  const setState = useAuthStore.setState;

  // Buscar votos reais do backend
  useEffect(() => {
    async function fetchVotes() {
      setLoadingVotos(true);
      try {
        const votos = await getVotes(sessionId, access, getState, setState);
        setAllVotos(votos);
      } catch {
        setError("Erro ao buscar votos");
      } finally {
        setLoadingVotos(false);
      }
    }
    fetchVotes();
  }, [sessionId, votou, novaRodada, access]);

  // Scroll automático do chat
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  async function handleVote(card) {
    if (!justificativa.trim()) {
      setError("Justificativa obrigatória!");
      showToast.error("Justificativa obrigatória!");
      return;
    }
    if (!taskId) {
      setError("Informe o ID da tarefa!");
      showToast.error("Informe o ID da tarefa!");
      return;
    }
    setError(null);
    window.setGlobalLoading(true);
    try {
      await voteTask({ session_id: Number(sessionId), task_id: Number(taskId), value: card, justificativa }, access, getState, setState);
      setVoto(card);
      setVotou(true);
      showToast.success("Voto registrado com sucesso!");
    } catch (err) {
      setError("Erro ao registrar voto");
      showToast.error(err?.message || "Erro ao registrar voto");
    } finally {
      window.setGlobalLoading(false);
    }
  }

  function handleReset() {
    setVoto(null);
    setVotou(false);
    setJustificativa("");
  }

  function handleNovaRodada() {
    setVoto(null);
    setVotou(false);
    setJustificativa("");
    setNovaRodada(false);
  }

  function handleSendMsg(e) {
    e.preventDefault();
    if (!msg.trim()) return;
    setChat(c => [...c, { nome: nome || "Anônimo", msg, ts: new Date().toLocaleTimeString() }]);
    setMsg("");
  }

  // Filtrar votos da tarefa atual
  const votosDaTarefa = allVotos.filter(v => String(v.task) === String(taskId));
  // Lógica dos extremos
  const votosNumericos = votosDaTarefa.filter(v => !isNaN(Number(v.value)) && v.value !== "?" && v.value !== "∞");
  let min = null, max = null;
  if (votosNumericos.length > 0) {
    min = votosNumericos.reduce((a, b) => Number(a.value) < Number(b.value) ? a : b);
    max = votosNumericos.reduce((a, b) => Number(a.value) > Number(b.value) ? a : b);
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen max-w-4xl mx-auto">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
      <h1 className="text-3xl font-extrabold text-blue-700 drop-shadow-sm mb-4">Sessão #{sessionId}</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-blue-700">Seu nome</label>
          <input
            className="border px-3 py-2 rounded-xl shadow-sm w-full"
            value={nome}
            onChange={e => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-blue-700">Seu papel</label>
          <select
            className="border px-3 py-2 rounded-xl shadow-sm w-full"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            {roles.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold text-blue-700">ID da Tarefa</label>
          <input
            className="border px-3 py-2 rounded-xl shadow-sm w-full"
            value={taskId}
            onChange={e => setTaskId(e.target.value)}
            placeholder="Digite o ID da tarefa"
          />
        </div>
      </div>
      <label className="block mb-1 font-semibold text-blue-700">Justificativa do voto</label>
      <textarea
        className="border px-3 py-2 rounded-xl shadow-sm w-full mb-4"
        value={justificativa}
        onChange={e => setJustificativa(e.target.value)}
        placeholder="Explique seu voto"
        rows={2}
      />
      <h2 className="text-lg font-bold mb-4 text-blue-700">Escolha sua carta:</h2>
      <div className="flex flex-wrap gap-4 mb-8">
        {cards.map(card => (
          <button
            key={card}
            className={`w-16 h-24 rounded-2xl shadow text-2xl font-bold flex items-center justify-center border-2 transition-all
              ${voto === card ? "bg-blue-600 text-white border-blue-700 scale-110" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"}
            `}
            disabled={!nome || !role || !justificativa.trim() || votou || loading}
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
        <div className="p-4 bg-green-100 text-green-800 rounded-xl shadow mb-4 text-center font-semibold">
          Voto registrado! Aguarde o resultado da sessão.
        </div>
      )}
      {/* Exibição dos votos e justificativas após todos votarem */}
      {loadingVotos ? (
        <div className="text-center my-6">Carregando votos...</div>
      ) : votosDaTarefa.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-2 text-blue-700">Votos e Justificativas</h2>
          <table className="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="text-left p-3">Usuário</th>
                <th className="text-left p-3">Voto</th>
                <th className="text-left p-3">Justificativa</th>
              </tr>
            </thead>
            <tbody>
              {votosDaTarefa.map((v, idx) => (
                <tr key={idx} className={`border-t ${min && v.user === min.user ? "bg-yellow-100" : ""} ${max && v.user === max.user ? "bg-red-100" : ""}`}>
                  <td className="p-3 font-bold">{v.user}</td>
                  <td className="p-3 font-bold">{v.value}</td>
                  <td className="p-3">{v.justificativa}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Destaque para extremos */}
          {min && max && min.user !== max.user && (
            <div className="mt-4 p-4 bg-orange-100 rounded-xl shadow">
              <div className="font-bold mb-2">Justificativas dos extremos:</div>
              <div><span className="font-bold">Menor voto ({min.value}):</span> {min.user} — {min.justificativa}</div>
              <div><span className="font-bold">Maior voto ({max.value}):</span> {max.user} — {max.justificativa}</div>
            </div>
          )}
          <button
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition font-semibold"
            onClick={() => setNovaRodada(true)}
          >
            Nova rodada de votação</button>
        </div>
      )}
      {/* Nova rodada */}
      {novaRodada && (
        <div className="mt-4 p-4 bg-blue-50 rounded-xl shadow">
          <div className="mb-2">Iniciando nova rodada. Todos podem votar novamente.</div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition font-semibold" onClick={handleNovaRodada}>OK</button>
        </div>
      )}
      {/* Chat */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-2 text-blue-700">Chat da Sessão</h2>
        <div ref={chatRef} className="bg-white rounded-2xl shadow-lg p-4 h-56 overflow-y-auto mb-2 border border-blue-100">
          {chat.length === 0 && <div className="text-gray-400">Nenhuma mensagem ainda.</div>}
          {chat.map((c, idx) => (
            <div key={idx} className="mb-1"><span className="font-bold">{c.nome}</span> <span className="text-xs text-gray-500">[{c.ts}]</span>: {c.msg}</div>
          ))}
        </div>
        <form className="flex gap-2" onSubmit={handleSendMsg}>
          <input
            className="border px-3 py-2 rounded-xl shadow-sm flex-1"
            value={msg}
            onChange={e => setMsg(e.target.value)}
            placeholder="Digite uma mensagem..."
          />
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-700 transition font-semibold">Enviar</button>
        </form>
      </div>
      <div className="text-gray-500 text-sm mt-8 text-center">* Votos e justificativas são exibidos em tempo real a partir do backend.</div>
    </div>
  );
} 