import { NavLink } from "react-router-dom";
import { TASK_ROUTES } from "../constants/Routes";
import Button from "./ui/Button";

const SideNavLink = ({ to, icon, children, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-all duration-200 ${isActive
          ? "bg-white font-bold text-blue-700 shadow-sm"
          : "text-slate-600 hover:translate-x-1 hover:bg-slate-100"
        }`
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span>{children}</span>
    </NavLink>
  );
};

const Sidebar = ({ onCreateProject }) => {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col gap-2 bg-slate-50 p-4  lg:flex">
      <div className="mb-6 mt-4 px-2">
        <h2 className="text-lg font-bold text-slate-900">Workspace</h2>
        <p className="text-xs text-slate-500">Premium Edition</p>
      </div>

      <div className="flex grow flex-col gap-1">
        {TASK_ROUTES.map(({ path, icon, end, label }) => (
          <SideNavLink key={path} to={path} icon={icon} end={end}>
            {label}
          </SideNavLink>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-1 pb-4">
        <Button
          variant="cta"
          className="mb-4 w-full py-2.5 text-sm font-semibold"
          onClick={onCreateProject}
        >
          Create Task
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
