import {
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_PENDING
} from "./taskStatus";

export const TASK_MODE_ALL = "all";
export const TASK_MODE_COMPLETED = "completed";
export const TASK_MODE_URGENT = "urgent";
export const TASK_MODE_PERSONAL = "personal";
export const TASK_MODE_WORK = "work";

export const TASK_LAYOUT_GRID = "grid";
export const TASK_LAYOUT_LIST = "list";

export const TASK_SORT_ASC = "asc";
export const TASK_SORT_DESC = "desc";

export const DEFAULT_TASK_SORT_ORDER = TASK_SORT_ASC;
export const DEFAULT_TASK_LAYOUT = TASK_LAYOUT_GRID;

export const TASK_PAGE_CONFIG = {
  [TASK_MODE_ALL]: {
    title: "All Tasks",
    subtitle: "Manage your tasks with filter, sorting, and quick actions."
  },
  [TASK_MODE_COMPLETED]: {
    title: "Completed Tasks",
    subtitle: "Review all finished tasks with architectural clarity."
  },
  [TASK_MODE_URGENT]: {
    title: "Urgent Tasks",
    subtitle: "Focus on high-priority and near-deadline items."
  },
  [TASK_MODE_PERSONAL]: {
    title: "Personal Tasks",
    subtitle: "Track your personal tasks in one focused view."
  },
  [TASK_MODE_WORK]: {
    title: "Work Tasks",
    subtitle: "Coordinate active work commitments and delivery items."
  }
};

export const TASK_SORT_OPTIONS = [
  { value: TASK_SORT_ASC, label: "Earliest first" },
  { value: TASK_SORT_DESC, label: "Latest first" }
];

export const TASK_EMPTY_STATE_MESSAGE = "No tasks found for the selected view.";

export const STATUS_SUMMARY_CARD_CONFIG = [
  { label: "Total", key: "total", className: "text-slate-900" },
  { label: TASK_STATUS_PENDING, key: TASK_STATUS_PENDING, className: "text-amber-700" },
  {
    label: TASK_STATUS_IN_PROGRESS,
    key: TASK_STATUS_IN_PROGRESS,
    className: "text-blue-700"
  },
  {
    label: TASK_STATUS_COMPLETED,
    key: TASK_STATUS_COMPLETED,
    className: "text-emerald-700"
  }
];

export const DASHBOARD_SPOTLIGHT_STAT_CONFIG = [
  {
    label: "Execution Pace",
    key: TASK_STATUS_IN_PROGRESS,
    suffix: " active",
    icon: "network_intelligence",
    iconTone: "bg-sky-100 text-sky-700"
  },
  {
    label: "Pending Queue",
    key: TASK_STATUS_PENDING,
    suffix: " tasks",
    icon: "pending_actions",
    iconTone: "bg-amber-100 text-amber-700"
  },
  {
    label: "Completion Rate",
    key: null,
    suffix: "%",
    icon: "target",
    iconTone: "bg-emerald-100 text-emerald-700"
  }
];
