import { TASK_ROUTES } from "../constants/Routes";
import SideNavLink from "./SideNavLink";
import Button from "./ui/Button";


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
