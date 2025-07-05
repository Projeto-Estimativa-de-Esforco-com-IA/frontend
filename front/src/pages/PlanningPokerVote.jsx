import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const cards = ["0", "1/2", "1", "2", "3", "5", "8", "13", "21", "?", "∞"];

export default function PlanningPokerVote() {
  const { sessionId } = useParams();
  const [voto, setVoto] = useState(null);
  const [nome, setNome] = useState("");
  const [votou, setVotou] = useState(false);
  const navigate = useNavigate();

  function handleVote(card) {
    setVoto(card);
    setVotou(true);
  }

  function handleReset() {
    setVoto(null);
    setVotou(false);
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <button className="mb-4 text-blue-600 hover:underline" onClick={() => navigate(-1)}>&larr; Voltar</button>
      <h1 className="text-2xl font-bold mb-2">Sessão #{sessionId}</h1>
      <div className="mb-6">
        <label className="block mb-1 font-medium">Seu nome</label>
        <input
          className="border px-3 py-2 rounded w-full max-w-xs"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Digite seu nome"
        />
      </div>
      <h2 className="text-lg font-semibold mb-4">Escolha sua carta:</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {cards.map(card => (
          <button
            key={card}
            className={`w-16 h-24 rounded shadow text-2xl font-bold flex items-center justify-center border-2 transition-all
              ${voto === card ? "bg-blue-600 text-white border-blue-700 scale-110" : "bg-white text-blue-700 border-blue-300 hover:bg-blue-100"}
            `}
            disabled={!nome || votou}
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
      <div className="text-gray-500 text-sm mt-8">* Esta é uma simulação local. Em produção, os votos seriam enviados para o backend e exibidos ao final da rodada.</div>
    </div>
  );
} 