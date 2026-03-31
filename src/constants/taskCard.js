import {
  TASK_PRIORITY_LOW,
  TASK_PRIORITY_URGENT,
  TASK_STATUS_COMPLETED,
  TASK_STATUS_IN_PROGRESS
} from "./taskStatus";

export const TASK_TITLE_MAX_LENGTH = 70;
export const TASK_DESCRIPTION_MAX_LENGTH = 160;
export const TASK_DESCRIPTION_FALLBACK = "No description provided.";

const INCOMPLETE_STATUS_META = {
  icon: "calendar_today",
  iconTone: "text-slate-500",
  datePrefix: "Due",
  dateTone: "text-slate-500",
  dateHighlight: "",
  titleClass: "text-slate-900",
  bodyClass: "text-slate-600"
};

export const TASK_STATUS_META = {
  [TASK_STATUS_COMPLETED]: {
    badge: "bg-emerald-100 text-emerald-700",
    icon: "check_circle",
    iconTone: "text-emerald-600",
    datePrefix: "Done",
    dateTone: "text-emerald-700",
    dateHighlight: "rounded-md px-2.5 py-1",
    titleClass: "line-through text-slate-500",
    bodyClass: "text-slate-400"
  },
  [TASK_STATUS_IN_PROGRESS]: {
    badge: "bg-blue-100 text-blue-700",
    ...INCOMPLETE_STATUS_META
  },
  default: {
    badge: "bg-amber-100 text-amber-700",
    ...INCOMPLETE_STATUS_META
  }
};

export const TASK_PRIORITY_TONE = {
  [TASK_PRIORITY_URGENT]: "bg-rose-100 text-rose-700",
  [TASK_PRIORITY_LOW]: "bg-emerald-100 text-emerald-700",
  default: "bg-slate-200 text-slate-700"
};
