import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-900 text-white p-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        🤖 AI Workflow
      </h1>

      <nav className="space-y-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg p-2 ${
              isActive ? "bg-cyan-600" : "hover:bg-slate-800"
            }`
          }
        >
          📊 Dashboard
        </NavLink>

        <NavLink
          to="/workflows"
          className={({ isActive }) =>
            `block rounded-lg p-2 ${
              isActive ? "bg-cyan-600" : "hover:bg-slate-800"
            }`
          }
        >
          ⚡ Workflows
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `block rounded-lg p-2 ${
              isActive ? "bg-cyan-600" : "hover:bg-slate-800"
            }`
          }
        >
          📜 History
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block rounded-lg p-2 ${
              isActive ? "bg-cyan-600" : "hover:bg-slate-800"
            }`
          }
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block rounded-lg p-2 ${
              isActive ? "bg-cyan-600" : "hover:bg-slate-800"
            }`
          }
        >
          ⚙ Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;