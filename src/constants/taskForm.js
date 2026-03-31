import {
  TASK_CATEGORY_WORK,
  TASK_PRIORITY_MEDIUM,
  TASK_STATUS_PENDING
} from "./taskStatus";

export const DEFAULT_TASK_FORM_VALUES = {
  title: "",
  description: "",
  status: TASK_STATUS_PENDING,
  category: TASK_CATEGORY_WORK,
  priority: TASK_PRIORITY_MEDIUM,
  dueDate: ""
};
