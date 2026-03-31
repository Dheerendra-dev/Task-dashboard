import {
  TASK_CATEGORIES,
  TASK_CATEGORY_WORK,
  TASK_PRIORITIES,
  TASK_PRIORITY_MEDIUM,
  TASK_STATUSES,
  TASK_STATUS_PENDING
} from "../constants/taskStatus";

export const sanitizeTaskInput = (taskData = {}) => {
  const { title, description, status, category, priority, dueDate } = taskData;

  return {
    title: typeof title === "string" ? title.trim() : "",
    description: typeof description === "string" ? description.trim() : "",
    status: TASK_STATUSES.includes(status) ? status : TASK_STATUS_PENDING,
    category: TASK_CATEGORIES.includes(category) ? category : TASK_CATEGORY_WORK,
    priority: TASK_PRIORITIES.includes(priority) ? priority : TASK_PRIORITY_MEDIUM,
    dueDate: typeof dueDate === "string" ? dueDate : ""
  };
};

export const buildTaskRecord = (taskData, id) => {
  const now = new Date().toISOString();

  return {
    id,
    ...sanitizeTaskInput(taskData),
    createdAt: now,
    updatedAt: now
  };
};

export const normalizeTask = (task) => {
  if (!task || typeof task !== "object") {
    return null;
  }

  const { id, title, description, dueDate, createdAt, updatedAt, status, category, priority } = task;

  if (
    typeof id !== "string" ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof dueDate !== "string"
  ) {
    return null;
  }

  const normalizedCreatedAt =
    typeof createdAt === "string" ? createdAt : new Date().toISOString();
  const normalizedUpdatedAt = typeof updatedAt === "string" ? updatedAt : normalizedCreatedAt;

  return {
    ...task,
    status: TASK_STATUSES.includes(status) ? status : TASK_STATUS_PENDING,
    category: TASK_CATEGORIES.includes(category) ? category : TASK_CATEGORY_WORK,
    priority: TASK_PRIORITIES.includes(priority) ? priority : TASK_PRIORITY_MEDIUM,
    createdAt: normalizedCreatedAt,
    updatedAt: normalizedUpdatedAt
  };
};

export const isValidTask = (task) => {
  if (!task) {
    return false;
  }

  const { id, title, description, status, category, priority, dueDate } = task;

  return (
    typeof id === "string" &&
    typeof title === "string" &&
    typeof description === "string" &&
    TASK_STATUSES.includes(status) &&
    TASK_CATEGORIES.includes(category) &&
    TASK_PRIORITIES.includes(priority) &&
    typeof dueDate === "string"
  );
};
