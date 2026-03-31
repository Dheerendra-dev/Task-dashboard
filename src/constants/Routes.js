import {
  TASK_MODE_ALL,
  TASK_MODE_COMPLETED,
  TASK_MODE_PERSONAL,
  TASK_MODE_URGENT,
  TASK_MODE_WORK
} from "./taskView";

export const DEFAULT_TASK_ROUTE = "/tasks";

export const TASK_ROUTES = [
  { path: DEFAULT_TASK_ROUTE, mode: TASK_MODE_ALL, icon: "assignment", label: "All Tasks", end: true },
  {
    path: "/tasks/completed",
    mode: TASK_MODE_COMPLETED,
    icon: "check_circle",
    label: "Completed"
  },
  { path: "/tasks/urgent", mode: TASK_MODE_URGENT, icon: "priority_high", label: "Urgent" },
  { path: "/tasks/personal", mode: TASK_MODE_PERSONAL, icon: "person", label: "Personal" },
  { path: "/tasks/work", mode: TASK_MODE_WORK, icon: "work", label: "Work" }
];
