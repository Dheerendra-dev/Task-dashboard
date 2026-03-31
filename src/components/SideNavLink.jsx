import { NavLink } from "react-router-dom";

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

export default SideNavLink