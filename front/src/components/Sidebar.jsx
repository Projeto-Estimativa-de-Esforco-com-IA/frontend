import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/projetos", label: "Projetos" },
  { to: "/tarefas", label: "Tarefas" },
  { to: "/equipes", label: "Equipes" },
  { to: "/planning", label: "Planning Poker" },
];

export default function Sidebar() {
  return (
    <aside className="bg-gray-800 text-white w-56 min-h-screen p-6 flex flex-col">
      <nav className="flex flex-col gap-2 flex-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `block px-3 py-2 rounded hover:bg-gray-700 transition ${isActive ? "bg-blue-600" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 