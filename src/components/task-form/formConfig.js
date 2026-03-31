import { TASK_CATEGORIES, TASK_PRIORITIES, TASK_STATUSES } from "../../constants/taskStatus";

export const FIELD_LABEL_CLASS = "block text-sm font-bold text-slate-800";
export const INPUT_BASE_CLASS =
  "w-full rounded-md border-b-2 border-transparent bg-slate-100 px-4 py-3 text-slate-900 placeholder:text-slate-400/80 transition-all focus:outline-none";
export const SELECT_BUTTON_CLASS = "rounded-md bg-slate-100 py-3 text-slate-900";
export const ERROR_TEXT_CLASS = "mt-1 flex items-center gap-1 text-xs font-medium text-red-600";

export const SELECT_FIELDS = [
  { id: "task-status", name: "status", label: "Status", options: TASK_STATUSES },
  { id: "task-category", name: "category", label: "Category", options: TASK_CATEGORIES },
  { id: "task-priority", name: "priority", label: "Priority", options: TASK_PRIORITIES }
];
