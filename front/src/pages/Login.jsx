import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { login as apiLogin, register as apiRegister } from "../api";
import { showToast } from "../components/ui/Toast";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha obrigatória"),
});

const registerSchema = z.object({
  username: z.string().min(2, "Nome de usuário deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    window.setGlobalLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await apiRegister({ username: data.username, email: data.email, password: data.password });
        showToast.success("Conta criada com sucesso!");
        setIsRegister(false);
        reset();
      } else {
        const res = await apiLogin({ email: data.email, password: data.password });
        // Salvar usuário autenticado (exemplo: localStorage)
        localStorage.setItem("user", JSON.stringify(res.user || { email: data.email }));
        showToast.success("Login realizado com sucesso!");
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || "Erro inesperado");
      showToast.error(err.message || "Erro inesperado");
    } finally {
      window.setGlobalLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>
        {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg shadow text-center font-medium">{error}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <Input
              label="Nome de usuário"
              {...register("username")}
              error={errors.username?.message}
              placeholder="Seu nome de usuário"
            />
          )}
          <Input
            label="E-mail"
            type="email"
            {...register("email")}
            error={errors.email?.message}
            placeholder="seu@email.com"
          />
          <Input
            label="Senha"
            type="password"
            {...register("password")}
            error={errors.password?.message}
            placeholder="Sua senha"
          />
          {isRegister && (
            <Input
              label="Confirmar Senha"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
              placeholder="Confirme sua senha"
            />
          )}
          <Button
            type="submit"
            className="w-full"
            // loading global
            disabled={false}
          >
            {isRegister ? "Registrar" : "Entrar"}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => {
              setIsRegister(!isRegister);
              reset();
              setError(null);
            }}
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