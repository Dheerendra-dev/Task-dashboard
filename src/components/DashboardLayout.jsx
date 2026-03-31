import { formatFullDate } from "../utils/date";
import {
  buildDashboardSpotlightStats,
  buildSafeTaskSummary
} from "../utils/taskSummary";
import Sidebar from "./Sidebar";
import StatusSummary from "./StatusSummary";

const DashboardLayout = ({ summary, onCreateProject, children }) => {
  const safeSummary = buildSafeTaskSummary(summary);
  const spotlightStats = buildDashboardSpotlightStats(safeSummary);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar onCreateProject={onCreateProject} />
      <main className="min-h-screen  lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-6 md:px-8 md:pt-8">
          <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                  <span className="material-symbols-outlined text-base">bolt</span>
                  Sprint Overview
                </span>
                <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900">
                  Delivery Dashboard
                </h1>
                <p className="max-w-2xl text-sm text-slate-600 md:text-base">
                  A clean operational view to plan, track, and ship work with confidence.
                </p>
                <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.11em] text-slate-400">
                  {formatFullDate()}
                </p>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <StatusSummary summary={safeSummary} />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {spotlightStats.map(({ label, iconTone, icon, value }) => (
                <article key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {label}
                    </span>
                    <span
                      className={`material-symbols-outlined rounded-md p-1 text-base ${iconTone}`}
                    >
                      {icon}
                    </span>
                  </div>
                  <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>
                </article>
              ))}
            </div>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
