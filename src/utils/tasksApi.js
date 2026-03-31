import {
  TASK_CATEGORY_PERSONAL,
  TASK_CATEGORY_WORK,
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_MEDIUM,
  TASK_PRIORITY_URGENT,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_PENDING
} from "../constants/taskStatus";
import { TASKS_API_ID_PREFIX } from "../constants/api";

export const resolveApiTaskPriority = (id) => {
  const bucket = Math.abs(id) % 3;

  if (bucket === 0) {
    return TASK_PRIORITY_LOW;
  }

  if (bucket === 1) {
    return TASK_PRIORITY_MEDIUM;
  }

  return TASK_PRIORITY_URGENT;
};

export const buildApiTaskDueDate = (id) => {
  const date = new Date();
  const offsetDays = (Math.abs(id) % 14) + 1;
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
};

export const mapTodoToTask = (todo) => {
  const numericId = Number(todo.id) || 0;
  const now = new Date().toISOString();

  return {
    id: `${TASKS_API_ID_PREFIX}${numericId}`,
    title: todo.todo || "Untitled task",
    description: `Imported from API task #${numericId}.`,
    status: todo.completed ? TASK_STATUS_COMPLETED : TASK_STATUS_PENDING,
    category: (Number(todo.userId) || 0) % 2 === 0 ? TASK_CATEGORY_WORK : TASK_CATEGORY_PERSONAL,
    priority: resolveApiTaskPriority(numericId),
    dueDate: buildApiTaskDueDate(numericId),
    createdAt: now,
    updatedAt: now
  };
};

export const parseApiTaskId = (taskId) => {
  if (typeof taskId !== "string" || !taskId.startsWith(TASKS_API_ID_PREFIX)) {
    return null;
  }

  const numericId = Number(taskId.slice(TASKS_API_ID_PREFIX.length));
  return Number.isFinite(numericId) ? numericId : null;
};

export const isApiTaskId = (taskId) => parseApiTaskId(taskId) !== null;
