import {
  TASK_DESCRIPTION_FALLBACK,
  TASK_DESCRIPTION_MAX_LENGTH,
  TASK_PRIORITY_TONE,
  TASK_STATUS_META,
  TASK_TITLE_MAX_LENGTH
} from "../constants/taskCard";
import { formatShortDate } from "./date";
import { truncateText } from "./text";

export const getTaskStatusMeta = (status) => {
  return TASK_STATUS_META[status] || TASK_STATUS_META.default;
};

export const getTaskPriorityTone = (priority) => {
  return TASK_PRIORITY_TONE[priority] || TASK_PRIORITY_TONE.default;
};

export const getDisplayTaskTitle = (title) => {
  return truncateText(title, TASK_TITLE_MAX_LENGTH);
};

export const getDisplayTaskDescription = (description) => {
  return truncateText(description || TASK_DESCRIPTION_FALLBACK, TASK_DESCRIPTION_MAX_LENGTH);
};

export const formatTaskDate = (dateValue) => {
  return formatShortDate(dateValue);
};
