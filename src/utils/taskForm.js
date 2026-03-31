import { DEFAULT_TASK_FORM_VALUES } from "../constants/taskForm";
import {
  TASK_PRIORITY_URGENT,
  TASK_STATUS_COMPLETED
} from "../constants/taskStatus";
import { ONE_DAY_IN_MS, getTodayStartTimestamp, toStartOfDayTimestamp } from "./date";

export const buildTaskFormInitialState = (task) => {
  if (!task) {
    return { ...DEFAULT_TASK_FORM_VALUES };
  }

  const { title, description, status, category, priority, dueDate } = task;

  return {
    title,
    description,
    status,
    category: category || DEFAULT_TASK_FORM_VALUES.category,
    priority: priority || DEFAULT_TASK_FORM_VALUES.priority,
    dueDate
  };
};
export const normalizeOptions = (options) => {
  return options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );
};

export const isUrgentTask = (task) => {
  if (task.status === TASK_STATUS_COMPLETED) return false;
  if (task.priority === TASK_PRIORITY_URGENT) return true;

  const due = toStartOfDayTimestamp(task.dueDate);
  const today = getTodayStartTimestamp();
  const daysUntilDue = Math.floor((due - today) / ONE_DAY_IN_MS);
  return daysUntilDue <= 1;
};
