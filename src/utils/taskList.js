import {
  STATUS_ALL,
  TASK_CATEGORY_PERSONAL,
  TASK_CATEGORY_WORK,
  TASK_STATUSES,
  TASK_STATUS_COMPLETED
} from "../constants/taskStatus";
import {
  TASK_MODE_COMPLETED,
  TASK_MODE_PERSONAL,
  TASK_MODE_URGENT,
  TASK_MODE_WORK,
  TASK_SORT_ASC
} from "../constants/taskView";
import { toStartOfDayTimestamp } from "./date";
import { isUrgentTask } from "./taskForm";

export const getDueDateSorter = (sortOrder) => {
  return ({ dueDate: firstDueDate }, { dueDate: secondDueDate }) => {
    const aTime = toStartOfDayTimestamp(firstDueDate);
    const bTime = toStartOfDayTimestamp(secondDueDate);

    return sortOrder === TASK_SORT_ASC ? aTime - bTime : bTime - aTime;
  };
};

export const matchesTaskMode = (task, mode) => {
  switch (mode) {
    case TASK_MODE_COMPLETED:
      return task.status === TASK_STATUS_COMPLETED;
    case TASK_MODE_URGENT:
      return isUrgentTask(task);
    case TASK_MODE_PERSONAL:
      return task.category === TASK_CATEGORY_PERSONAL;
    case TASK_MODE_WORK:
      return task.category === TASK_CATEGORY_WORK;
    default:
      return true;
  }
};

export const shouldShowTaskInFilter = ({ task, mode, filterStatus }) => {
  const shouldFilterByStatus = mode !== TASK_MODE_COMPLETED && filterStatus !== STATUS_ALL;

  if (!matchesTaskMode(task, mode)) {
    return false;
  }

  if (!shouldFilterByStatus) {
    return true;
  }

  return task.status === filterStatus;
};

export const buildStatusFilterOptions = () => {
  return [
    { value: STATUS_ALL, label: STATUS_ALL },
    ...TASK_STATUSES.map((status) => ({ value: status, label: status }))
  ];
};
