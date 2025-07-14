import { useAuthStore } from "../stores/authStore";
import Button from "./ui/Button";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-blue-600 text-white px-6 py-4 flex items-center justify-between shadow">
      <span className="font-bold text-xl">Agile Estimativa IA</span>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <UserCircleIcon className="h-6 w-6" />
          <span className="text-sm">{user?.name || 'Usuário'}</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className="text-white border-white hover:bg-white hover:text-blue-600"
        >
          Sair
        </Button>
      </div>
    </header>
  );
} 