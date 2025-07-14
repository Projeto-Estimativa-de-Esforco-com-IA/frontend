import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useAuthStore } from "../stores/authStore";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      if (isRegister) {
        // Simulação de registro
        toast.success("Conta criada com sucesso!");
        setIsRegister(false);
        reset();
      } else {
        const result = await login(data.email, data.password);
        if (result.success) {
          toast.success("Login realizado com sucesso!");
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        } else {
          toast.error(result.error || "Erro no login");
        }
      }
    } catch (error) {
      toast.error("Erro inesperado");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegister ? "Criar Conta" : "Entrar"}
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isRegister && (
            <Input
              label="Nome"
              {...register("name")}
              error={errors.name?.message}
              placeholder="Seu nome completo"
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
            loading={isLoading}
            disabled={isLoading}
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