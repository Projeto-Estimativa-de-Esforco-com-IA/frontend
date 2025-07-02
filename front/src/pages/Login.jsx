import { useState } from "react";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>
        <form className="space-y-4">
          {isRegister && (
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            {isRegister ? "Registrar" : "Entrar"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline"
            onClick={() => setIsRegister((v) => !v)}
          >
            {isRegister
              ? "Já tem conta? Entrar"
              : "Não tem conta? Registrar-se"}
          </button>
        </div>
      </div>
    </div>
  );
} 