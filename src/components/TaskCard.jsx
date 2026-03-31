import Button from "./ui/Button";
import { TASK_DESCRIPTION_FALLBACK } from "../constants/taskCard";
import {
  getDisplayTaskDescription,
  getDisplayTaskTitle,
  getTaskPriorityTone,
  getTaskStatusMeta,
  formatTaskDate
} from "../utils/taskDisplay";
import { TASK_LAYOUT_LIST } from "../constants/taskView";
import { TASK_STATUS_COMPLETED } from "../constants/taskStatus";

const TaskCard = ({ task, layout, onEdit, onDelete }) => {
  const meta = getTaskStatusMeta(task.status);
  const displayTitle = getDisplayTaskTitle(task.title);
  const displayDescription = getDisplayTaskDescription(task.description);
  const wrapperClass =
    layout === TASK_LAYOUT_LIST
      ? "flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      : "";

  return (
    <article
      className={`ambient-shadow group h-full rounded-xl border border-slate-100 bg-white p-6 ${task.status === TASK_STATUS_COMPLETED ? "opacity-80" : ""
        } ${wrapperClass}`}
    >
      <div className={`flex h-full min-w-0 flex-col ${layout === TASK_LAYOUT_LIST ? "md:flex-1" : ""}`}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${meta.badge}`}
          >
            {task.status}
          </span>
          <div className="flex gap-1 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
            <Button
              className="material-symbols-outlined rounded-full p-1 text-xl text-slate-400 transition hover:text-blue-700"
              onClick={() => onEdit(task)}
              aria-label={`Edit ${task.title}`}
            >
              edit
            </Button>
            <Button
              className="material-symbols-outlined rounded-full p-1 text-xl text-slate-400 transition hover:text-red-600"
              onClick={() => onDelete(task.id)}
              aria-label={`Delete ${task.title}`}
            >
              delete
            </Button>
          </div>
        </div>

        <h3
          className={`mb-2 text-lg font-extrabold tracking-tight ${meta.titleClass}`}
          title={task.title}
        >
          {displayTitle}
        </h3>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-sky-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700">
            {task.category}
          </span>
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${getTaskPriorityTone(
              task.priority
            )}`}
          >
            {task.priority}
          </span>
        </div>

        <p
          className={`mb-6 flex-1 text-sm ${meta.bodyClass}`}
          title={task.description || TASK_DESCRIPTION_FALLBACK}
        >
          {displayDescription}
        </p>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div
            className={`inline-flex items-center gap-2 text-xs font-semibold tracking-tight ${meta.dateTone} ${meta.dateHighlight}`}
          >
            <span className={`material-symbols-outlined text-lg ${meta.iconTone}`}>{meta.icon}</span>
            <span>
              {meta.datePrefix} {formatTaskDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TaskCard;
