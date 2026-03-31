import { STATUS_SUMMARY_CARD_CONFIG } from "../constants/taskView";

const StatusSummary = ({ summary }) => {
  return (
    <section className="flex items-center gap-4 md:gap-7">
      {STATUS_SUMMARY_CARD_CONFIG.map(({ label, className, key }, index) => (
        <div className="flex items-center gap-4 md:gap-7" key={label}>
          <article className="text-center">
            <span className={`block text-2xl font-bold ${className}`}>{summary[key]}</span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              {label}
            </span>
          </article>
          {index < STATUS_SUMMARY_CARD_CONFIG.length - 1 && <div className="h-8 w-px bg-slate-300/40" />}
        </div>
      ))}
    </section>
  );
};

export default StatusSummary;
